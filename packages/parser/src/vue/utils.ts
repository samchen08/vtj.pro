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

function updateStringState(
  str: string,
  state: {
    inString: boolean;
    stringChar: string;
    escaped: boolean;
    inTemplateExpr: number;
  }
) {
  for (let j = 0; j < str.length; j++) {
    const char = str[j];

    if (!state.escaped) {
      // 检查是否进入或退出字符串
      if ((char === "'" || char === '"' || char === '`') && !state.inString) {
        state.inString = true;
        state.stringChar = char;
      } else if (
        state.inString &&
        char === state.stringChar &&
        state.stringChar !== '`'
      ) {
        // 普通字符串退出
        state.inString = false;
        state.stringChar = '';
      } else if (state.inString && state.stringChar === '`') {
        // 模板字符串特殊处理
        if (char === '$' && j + 1 < str.length && str[j + 1] === '{') {
          state.inTemplateExpr++;
          j++; // 跳过 '{'
        } else if (char === '}' && state.inTemplateExpr > 0) {
          state.inTemplateExpr--;
        } else if (char === '`' && state.inTemplateExpr === 0) {
          state.inString = false;
          state.stringChar = '';
        }
      }

      // 处理转义字符
      if (char === '\\') {
        state.escaped = true;
      }
    } else {
      state.escaped = false;
    }
  }
}

export function replacer(content: string, key: string, to: string) {
  // 关键字前的字符检测（移除了 \' 和 \"）
  const r2 = /(\@|\_|\-|\$|\.|\,|\w|\{\s)$/;
  // 关键字后的字符
  const r3 = /^[\w\_\-\@\$]/;

  // 手动实现搜索以避免全局正则表达式的 lastIndex 问题
  const keyPattern = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keyRegex = new RegExp(keyPattern, 'g');

  let result = '';
  let i = 0;
  const state = {
    inString: false,
    stringChar: '',
    escaped: false,
    inTemplateExpr: 0
  };

  while (i < content.length) {
    // 从当前位置开始查找下一个匹配
    const slice = content.substring(i);
    keyRegex.lastIndex = 0; // 重置 lastIndex
    const match = keyRegex.exec(slice);

    if (!match) {
      // 没有更多匹配，添加剩余内容
      result += slice;
      break;
    }

    const matchIndex = match.index;

    // 处理匹配前的部分，并更新字符串状态
    const beforeMatch = slice.substring(0, matchIndex);
    if (beforeMatch) {
      result += beforeMatch;
      updateStringState(beforeMatch, state);
    }
    i += matchIndex;

    // 检查当前位置是否在字符串内
    const isInString = state.inString && state.inTemplateExpr === 0;

    // 检查是否匹配 this.key 模式
    const start = content.substring(0, i);
    const isThisKey = start.endsWith('this.');

    if (isThisKey) {
      // 检查 this. 前面是否有单词字符（确保是独立的 this.）
      const beforeThis = start.substring(0, start.length - 5); // 去掉 "this."
      const isValidThisKey =
        !beforeThis || /[^\w_]/.test(beforeThis.charAt(beforeThis.length - 1));

      if (isValidThisKey) {
        if (isInString) {
          // 在字符串内，保留原样
          result += match[0];
        } else {
          // 不在字符串内，替换整个 this.key
          // 删除 result 末尾的 "this."，然后添加 to
          result = result.substring(0, result.length - 5); // 删除 "this."
          result += to;
        }
        i += key.length;
        continue;
      }
    }

    if (isInString) {
      // 在字符串内，保留原字符串
      result += match[0];
      i += key.length;
      continue;
    }

    // 检查前后字符
    const end = content.substring(i + key.length);

    if (r2.test(start) || r3.test(end.trim())) {
      // 不符合替换条件，保留原字符串
      result += match[0];
      i += key.length;
      continue;
    }

    // 执行替换
    result += to;
    i += key.length;
  }

  return result;
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
    content = replacer(content, key, `this.${key}`);
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
