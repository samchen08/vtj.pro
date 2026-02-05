import {
  type JSExpression,
  type JSFunction,
  type PlatformType,
  type DataSourceSchema
} from '@vtj/core';
import { upperFirstCamelCase, unBase64 } from '@vtj/base';
export interface ExpressionOptions {
  platform: PlatformType;
  context: Record<string, Set<string>>;
  computed: string[];
  libs: Record<string, string>;
  members: string[];
}

/**
 * 检查标识符是否在函数参数位置
 * 包括：function(key)、 (key) =>、 key =>、 (a, key, b) => 等
 * 不包括：函数调用参数如 obj.method(key) 中的 key
 */
function isInFunctionParameter(
  content: string,
  matchPos: number,
  key: string,
  beforeMatch: string
): boolean {
  // 1. 传统函数参数：function(key) 中的 key
  const traditionalFuncMatch = beforeMatch.match(/function\s*\(\s*$/);
  if (traditionalFuncMatch) {
    return true;
  }

  // 2. 箭头函数参数检测
  // 获取 key 之后的内容
  const afterKey = content.slice(matchPos + key.length);
  const afterKeyTrimmed = afterKey.trim();

  // 2.1 检查是否为箭头函数参数：key => 或 (key) => 或 (a, key) =>
  // 如果后面紧跟 =>，则是箭头函数参数
  if (afterKeyTrimmed.startsWith('=>')) {
    return true;
  }

  // 2.2 检查是否在括号参数列表中，但需要排除函数调用
  // 如果前面有 '(' 或 ','，且后面有 ')' 或 ','，则可能在参数列表中
  const hasOpenParenBefore =
    beforeMatch.endsWith('(') || beforeMatch.match(/\(\s*$/);
  const hasCommaBefore =
    beforeMatch.endsWith(',') || beforeMatch.match(/,\s*$/);

  if (hasOpenParenBefore || hasCommaBefore) {
    // 首先检查是否在函数调用中（前面有标识符但不是 function 或 class）
    // 对于逗号情况，需要找到匹配的开括号
    let openParenIndex = -1;
    let identifier = '';

    if (hasOpenParenBefore) {
      openParenIndex = beforeMatch.length - 1;
    } else if (hasCommaBefore) {
      // 向前扫描找到匹配的开括号
      let parenDepth = 0;
      let inString = false;
      let stringChar = '';

      for (let i = beforeMatch.length - 1; i >= 0; i--) {
        const char = beforeMatch[i];

        // 字符串处理（简化）
        if (inString && char === stringChar) {
          inString = false;
          stringChar = '';
        } else if (
          !inString &&
          (char === "'" || char === '"' || char === '`')
        ) {
          inString = true;
          stringChar = char;
          continue;
        }

        if (!inString) {
          if (char === ')') {
            parenDepth++;
          } else if (char === '(') {
            if (parenDepth === 0) {
              openParenIndex = i;
              break;
            }
            parenDepth--;
          }
        }
      }
    }

    // 如果找到了开括号，检查括号前面是否有标识符
    if (openParenIndex >= 0) {
      let j = openParenIndex - 1;
      while (j >= 0 && /\s/.test(beforeMatch.charAt(j))) {
        j--;
      }

      if (j >= 0) {
        // 收集标识符
        let identifierEnd = j;
        while (j >= 0 && /[a-zA-Z0-9_$]/.test(beforeMatch.charAt(j))) {
          j--;
        }
        identifier = beforeMatch.slice(j + 1, identifierEnd + 1);

        // 如果标识符存在且不是 'function' 或 'class'，则可能是函数调用
        if (identifier && identifier !== 'function' && identifier !== 'class') {
          // 还需要检查不是箭头函数：检查箭头函数特有的模式
          // 箭头函数可以是：() =>, param =>, (param) =>
          const beforeIdentifier = beforeMatch.slice(0, j + 1);

          // 检查箭头函数模式：
          // 1. 直接箭头函数：() => 或 param =>
          // 2. 前面可能有其他内容如 const fn = () =>
          if (
            !beforeIdentifier.endsWith('=>') &&
            !beforeIdentifier.match(/[a-zA-Z0-9_$]\s*=>\s*$/)
          ) {
            // 不是箭头函数，可能是函数调用，不应该视为函数参数
            return false;
          }
        }
      }
    }

    // 检查是否在有效的参数列表上下文中（即后面有 ')' 或 ',' 或 '=>'）
    // 扫描后面的字符，找到下一个 ')'、',' 或 '=>'
    let parenDepth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < afterKey.length; i++) {
      const char = afterKey[i];

      // 字符串处理（简化）
      if (!inString && (char === "'" || char === '"' || char === '`')) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        inString = false;
        stringChar = '';
      }

      if (!inString) {
        if (char === '(') {
          parenDepth++;
        } else if (char === ')') {
          if (parenDepth === 0) {
            // 找到了匹配的闭合括号，说明在参数列表中
            return true;
          }
          parenDepth--;
        } else if (char === ',' && parenDepth === 0) {
          // 在同一层参数列表中有逗号，说明是参数
          return true;
        } else if (
          char === '=' &&
          i + 1 < afterKey.length &&
          afterKey[i + 1] === '>'
        ) {
          // 箭头函数，说明在参数列表中
          return true;
        }
      }
    }
  }

  // 3. 单参数箭头函数无括号：key =>（前面没有 '(' 或单词字符）
  // 如果前面没有单词字符且后面有 '=>'
  const prevChar = matchPos > 0 ? content.charAt(matchPos - 1) : '';
  const WORD_CHARS = /[a-zA-Z0-9_$@-]/;

  if (!WORD_CHARS.test(prevChar) && afterKey.includes('=>')) {
    // 检查 '=>' 之前是否有其他非空格字符
    const arrowIndex = afterKey.indexOf('=>');
    const between = afterKey.slice(0, arrowIndex).trim();
    if (between === '' || between === ',') {
      return true;
    }
  }

  return false;
}

/**
 * 简化的字符串替换函数，遵循以下规则：
 * 1. 字符串中的 key 不替换（包括模板字符串普通文本，但 ${key} 中的 key 要替换）
 * 2. 对象属性访问 obj.key 不替换（. 前）
 * 3. 变量声明（const/let/var/function 后）不替换
 * 4. 对象属性名 {key: value} 或 {key} 不替换
 * 5. 前后有单词字符（a-zA-Z0-9_$@-）不替换
 * 6. 其他情况替换：赋值、函数调用、数组元素、模板表达式等
 */
export function replacer(content: string, key: string, to: string): string {
  // 快速返回：key 不存在
  if (!content.includes(key)) return content;

  const result: string[] = [];
  let pos = 0;
  const state = {
    inString: false,
    quoteChar: '',
    inTemplateExpr: 0,
    inRegex: false, // 是否在正则表达式字面量中
    regexDepth: 0 // 正则表达式括号深度（用于处理字符类）
  };
  const WORD_CHARS = /[a-zA-Z0-9_$@-]/;

  // 简化版字符串状态更新
  function updateStringState(str: string) {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (!state.inString && !state.inRegex) {
        // 不在字符串内，也不在正则表达式中
        // 检查是否进入字符串
        if (char === "'" || char === '"' || char === '`') {
          state.inString = true;
          state.quoteChar = char;
        }
        // 检查是否进入正则表达式（简化逻辑）
        else if (char === '/') {
          // 判断是否是正则表达式开始（不是除法运算符）
          // 获取前一个非空白字符
          let j = i - 1;
          while (j >= 0 && /\s/.test(str[j])) {
            j--;
          }

          if (j < 0) {
            // 表达式开头：/regex/
            state.inRegex = true;
            state.regexDepth = 0;
          } else {
            const prevChar = str[j];
            // 如果前面是这些字符，则可能是正则表达式
            const isLikelyRegex = /[=+*%!&|?:;,()[\]{}<>]/.test(prevChar);
            // 如果前面是字母数字、下划线、$或)，则可能是除法
            const isLikelyDivision = /[a-zA-Z0-9_$)]/.test(prevChar);

            // 特殊情况：- 需要特殊处理，因为可能是减法或负号
            if (prevChar === '-') {
              // 检查 - 前面是否有数字或标识符
              let k = j - 1;
              while (k >= 0 && /\s/.test(str[k])) {
                k--;
              }
              if (k >= 0 && /[a-zA-Z0-9_$)]/.test(str[k])) {
                // 前面有数字或标识符，是减法，/ 可能是除法
                state.inRegex = false;
              } else {
                // 负号，/ 可能是正则表达式
                state.inRegex = true;
                state.regexDepth = 0;
              }
            }
            // 如果前面是 =，检查是否是复合赋值运算符
            else if (prevChar === '=' && j > 0) {
              const prevPrevChar = str[j - 1];
              if (/[+\-*/%]/.test(prevPrevChar)) {
                // 复合赋值运算符：/=、+=、-=、*=、%=
                state.inRegex = false;
              } else {
                // 普通赋值，/ 可能是正则表达式
                state.inRegex = true;
                state.regexDepth = 0;
              }
            }
            // 如果前面是 / 或 *（注释开始）
            else if (prevChar === '/' || prevChar === '*') {
              state.inRegex = false;
            }
            // 如果前面是标识符，检查是否是关键字
            else if (isLikelyDivision && !isLikelyRegex) {
              // 可能是关键字或标识符
              let wordStart = j;
              while (
                wordStart > 0 &&
                /[a-zA-Z0-9_$]/.test(str[wordStart - 1])
              ) {
                wordStart--;
              }
              const word = str.slice(wordStart, j + 1);
              const keywords = [
                'if',
                'else',
                'for',
                'while',
                'do',
                'switch',
                'case',
                'return',
                'typeof',
                'instanceof',
                'void',
                'delete',
                'new',
                'in',
                'of',
                'await',
                'yield',
                'throw',
                'try',
                'catch',
                'finally'
              ];

              if (keywords.includes(word)) {
                state.inRegex = true;
                state.regexDepth = 0;
              } else {
                state.inRegex = false;
              }
            } else {
              // 默认情况下，假设是正则表达式
              state.inRegex = true;
              state.regexDepth = 0;
            }
          }
        }
      } else if (state.inString) {
        // 在字符串内
        if (char === state.quoteChar) {
          // 检查是否为模板字符串且仍在表达式中
          if (state.quoteChar === '`' && state.inTemplateExpr > 0) {
            // 仍在模板表达式中，不结束字符串
          } else {
            // 结束字符串
            state.inString = false;
            state.quoteChar = '';
            state.inTemplateExpr = 0;
          }
        } else if (state.quoteChar === '`') {
          // 模板字符串特殊处理
          if (char === '$' && i + 1 < str.length && str[i + 1] === '{') {
            state.inTemplateExpr++;
            i++; // 跳过 '{'
          } else if (char === '}' && state.inTemplateExpr > 0) {
            state.inTemplateExpr--;
          }
        }
        // 忽略转义字符，简化处理
      } else if (state.inRegex) {
        // 在正则表达式中
        // 处理字符类 [ ]
        if (char === '[') {
          state.regexDepth++;
        } else if (char === ']' && state.regexDepth > 0) {
          state.regexDepth--;
        }
        // 正则表达式结束（不在字符类中且遇到非转义的 /）
        else if (
          char === '/' &&
          state.regexDepth === 0 &&
          (i === 0 || str[i - 1] !== '\\')
        ) {
          state.inRegex = false;
          state.regexDepth = 0;
        }
      }
    }
  }

  // 检查是否为声明或不应替换的情况
  function shouldReplace(matchPos: number): boolean {
    // 1. 检查是否在正则表达式中
    if (state.inRegex) {
      return false;
    }

    // 2. 检查是否在字符串内（非模板表达式）
    if (state.inString && state.inTemplateExpr === 0) {
      // 检查是否为 RegExp 构造函数中的字符串参数
      const beforeMatch = content.slice(0, matchPos);
      // 匹配 new RegExp(" 或 new RegExp(' 或 new RegExp(`
      const isRegExpString = beforeMatch.match(/new\s+RegExp\s*\([^)]*$/);
      if (!isRegExpString) {
        return false;
      }
      // 如果是 RegExp 构造函数中的字符串，应该替换
    }

    // 3. 检查是否为展开运算符 ...key（在 {...key} 或 [...key] 或单独的 ...key 中）
    if (matchPos >= 3) {
      const beforeThree = content.slice(matchPos - 3, matchPos);
      if (beforeThree === '...') {
        // 确保前面没有第四个点（....key 不是有效的展开运算符）
        const beforeFourth = matchPos >= 4 ? content.charAt(matchPos - 4) : '';
        if (beforeFourth !== '.') {
          // 是展开运算符，应该替换
          return true;
        }
      }
    }

    // 4. 检查是否为可选链操作符 ?. 或计算属性访问
    if (matchPos > 0) {
      const prevChar = content.charAt(matchPos - 1);
      if (prevChar === '.') {
        // 检查是否是可选链操作符 ?.
        if (matchPos >= 2 && content.slice(matchPos - 2, matchPos) === '?.') {
          // 可选链操作符 ?. 后面的 key 应该替换（如 obj?.[key]）
          // 但 obj?.key 中的 key 是属性名，不应该替换
          // 需要检查后面是否有 [ 或 (
          const afterKey = content.slice(matchPos + key.length);
          const nextChar = afterKey.charAt(0);
          if (nextChar === '[' || nextChar === '(') {
            // 是计算属性或方法调用，应该替换
            return true;
          }
          // obj?.key 不应该替换
          return false;
        }
        // 普通对象属性访问，不应该替换
        return false;
      }
    }

    // 5. 检查前后是否有单词字符
    const prevChar = matchPos > 0 ? content.charAt(matchPos - 1) : '';
    const nextChar =
      matchPos + key.length < content.length
        ? content.charAt(matchPos + key.length)
        : '';

    if (WORD_CHARS.test(prevChar) || WORD_CHARS.test(nextChar)) {
      return false;
    }

    // 6. 检查是否为变量声明（const/let/var/function 后）
    const beforeMatch = content.slice(0, matchPos);
    const declarationMatch = beforeMatch.match(/(const|let|var|function)\s+$/);
    if (declarationMatch) {
      return false;
    }

    // 7. 检查是否为对象属性名（{ key: 或 { key }），排除模板表达式中的 ${
    const propertyMatch = beforeMatch.match(/\{\s*$/);
    if (propertyMatch && !beforeMatch.endsWith('${')) {
      // 检查是否为计算属性名 {[key]: value}
      if (matchPos > 0 && content.charAt(matchPos - 1) === '[') {
        // 计算属性名，应该替换
        return true;
      }
      // 普通对象属性名，不应该替换
      return false;
    }

    // 8. 检查是否为函数参数声明（包括箭头函数）
    const isFunctionParam = isInFunctionParameter(
      content,
      matchPos,
      key,
      beforeMatch
    );
    if (isFunctionParam) {
      return false;
    }

    // 9. 特殊规则：模板表达式 ${key} 中的 key 应该替换
    // 如果前面是 ${，则强制替换（已经通过前面的检查，这里明确确认）
    if (beforeMatch.endsWith('${')) {
      return true;
    }

    return true;
  }

  while (pos < content.length) {
    const matchIndex = content.indexOf(key, pos);
    if (matchIndex === -1) break;

    // 处理匹配前的内容
    const before = content.slice(pos, matchIndex);
    result.push(before);
    updateStringState(before);
    pos = matchIndex;

    // 决定是否替换
    if (shouldReplace(pos)) {
      result.push(to);
    } else {
      result.push(key);
    }

    pos += key.length;
  }

  // 添加剩余内容
  if (pos < content.length) {
    result.push(content.slice(pos));
  }

  return result.join('');
}

export function patchCode(
  content: string,
  id: string,
  options: ExpressionOptions
) {
  const {
    context = {},
    computed = [],
    libs = {},
    members = [],
    platform
  } = options || {};
  const contextKeys = Array.from(context[id || ''] || new Set());

  if (contextKeys) {
    for (const key of contextKeys) {
      content = replacer(content, key, `this.context.${key}`);
    }
  }

  for (const key of computed) {
    content = replacer(content, key, `this.${key}.value`);
    content = replacer(content, `this.${key}`, `this.${key}.value`);
    content = replacer(content, `this.${key}.value.value`, `this.${key}.value`);
  }

  for (const [key, value] of Object.entries(libs)) {
    content = replacer(content, key, `this.$libs.${value}.${key}`);
    content = replacer(content, `this.${key}`, `this.$libs.${value}.${key}`);
  }

  for (const key of members) {
    content = replacer(content, key, `this.${key}`);
  }

  if (platform === 'uniapp') {
    const uniRegex = /\suni\./g;
    content = content.replace(uniRegex, 'this.$libs.UniH5.uni.');
  }

  // 兜底
  content = content.replace(/_ctx\./g, 'this.');
  content = content.replace(/this\.this\./g, 'this.');
  return content;
}

export function getJSExpression(content: string) {
  const regex = /^\{[\w\W]*\}$/;
  const code = regex.test(content) ? `(${content})` : content;
  return {
    type: 'JSExpression',
    value: code
  } as JSExpression;
}

export function getJSFunction(content: string) {
  return {
    type: 'JSFunction',
    value: content
  } as JSFunction;
}

export const LIFE_CYCLES_LIST = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted',
  'errorCaptured',
  'renderTracked',
  'renderTriggered',
  'activated',
  'deactivated'
];

export const HTML_TAGS =
  'html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot,svg,path,circle,rect,polygon'.split(
    ','
  );

export const BUILD_IN_TAGS = 'component,slot,template'.split(',');

export const UNI_TAGS =
  'view,swiper,progress,icon,text,button,checkbox,editor,form,input,label,picker,radio,slider,switch,textarea,audio,camera,image,video,map,canvas'.split(
    ','
  );

export function isUniTags(tag: string, platform: PlatformType = 'web') {
  return platform === 'uniapp' && UNI_TAGS.includes(tag);
}

export function formatTagName(tag: string, platform: PlatformType = 'web') {
  if (
    (HTML_TAGS.includes(tag) || BUILD_IN_TAGS.includes(tag)) &&
    !isUniTags(tag, platform)
  ) {
    return tag;
  }
  return upperFirstCamelCase(tag);
}

export function isScss(source: string) {
  const regex = /style lang=\"scss\"/;
  return regex.test(source);
}

export function styleToJson(style: string) {
  const cleaned = style.replace(/\s+/g, ' ');
  return cleaned.split(';').reduce((acc: Record<string, string>, current) => {
    const [property, value] = current.split(':').map((item) => item.trim());
    if (property && value) {
      acc[property] = value;
    }
    return acc;
  }, {});
}

export function mergeClass(
  staticClass: string,
  expSource: string,
  type: 'ObjectExpression' | 'ArrayExpression'
) {
  if (type === 'ObjectExpression') {
    const staticStr = staticClass
      .split(' ')
      .map((item) => {
        return `'${item}': true`;
      })
      .join(',');
    return `(Object.assign({${staticStr}}, ${expSource}))`;
  } else if (type === 'ArrayExpression') {
    const staticStr = staticClass
      .split(' ')
      .map((item) => {
        return `'${item}'`;
      })
      .join(',');
    return `([${staticStr}].concat(${expSource}))`;
  }
}

export function extractDataSource(
  comment: string = ''
): DataSourceSchema | null {
  const match = comment.trim().match(/DataSource:\s*([^\n=]+={0,2})/);
  const base64Str = match?.[1] || '';
  try {
    return base64Str ? JSON.parse(unBase64(base64Str)) : null;
  } catch (e) {
    console.warn('extractDataSource fail', e);
    return null;
  }
}
