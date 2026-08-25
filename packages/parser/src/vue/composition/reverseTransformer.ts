import { replacer, replaceRef } from '../replacer';
import type { ReverseSymbolTable } from './reverseSymbolTable';

/**
 * Composition API → DSL 反向转换器
 *
 * 这是 @vtj/coder transformer.ts 的精确反操作。
 * 将 <script setup> 中的顶层标识符形态转为 DSL 中的 this.xxx 形态。
 *
 * 转换顺序很关键，需要避免重复替换：
 * 1. ref/computed 标识符：xxx[.value] → this.xxx.value
 * 2. 归一化 __instance.proxy.$forceUpdate.xxx → __instance.proxy.xxx
 * 3. 成员访问形式的全局 API：__i18n.t → this.$t, ElMessageBox.confirm → this.$confirm
 * 4. props.xxx → this.xxx；裸 prop → this.xxx
 *    （必须在全局 API 变量之前执行，避免 props 与 $props 冲突）
 * 5. 全局 API 变量：router → this.$router
 * 6. __state → this.state
 * 7. reactives：obj → this.obj
 * 8. methods/composables/injects/dataSources：name → this.name
 */
/**
 * 安全的替换函数：跳过字符串字面量中的内容，但处理模板字符串的表达式插值
 */
function safeReplace(code: string, regex: RegExp, replacement: string): string {
  let result = '';
  let lastIndex = 0;

  // 匹配字符串字面量（单引号、双引号、模板字符串）
  const stringRegex = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g;
  let stringMatch;

  while ((stringMatch = stringRegex.exec(code)) !== null) {
    // 处理字符串之前的代码
    const beforeString = code.slice(lastIndex, stringMatch.index);
    result += beforeString.replace(regex, replacement);

    // 处理字符串本身
    const matchedString = stringMatch[0];

    // 判断是否为模板字符串
    if (matchedString.startsWith('`')) {
      // 模板字符串：需要处理 ${...} 中的表达式
      result += processTemplateString(matchedString, regex, replacement);
    } else {
      // 普通字符串（单引号/双引号）：不替换
      result += matchedString;
    }

    lastIndex = stringMatch.index + stringMatch[0].length;
  }

  // 处理最后一部分
  result += code.slice(lastIndex).replace(regex, replacement);

  return result;
}

/**
 * 处理模板字符串：只替换 ${...} 表达式中的内容
 */
function processTemplateString(
  template: string,
  regex: RegExp,
  replacement: string
): string {
  let result = '';
  let pos = 0;

  // 匹配 ${...} 表达式
  const interpRegex = /\$\{([^}]*)\}/g;
  let match;

  while ((match = interpRegex.exec(template)) !== null) {
    // 添加 ${ 之前的部分（不替换）
    result += template.slice(pos, match.index);

    // 替换表达式部分
    const expression = match[1];
    const replacedExpr = expression.replace(regex, replacement);
    result += '${' + replacedExpr + '}';

    pos = match.index + match[0].length;
  }

  // 添加最后的部分
  result += template.slice(pos);

  return result;
}

export function reverseTransformExpression(
  code: string,
  symbols: ReverseSymbolTable
): string {
  if (!code) return code;
  let result = code;

  const allRefsAndComputed = [...symbols.refs, ...symbols.computed];

  // 1. ref/computed 标识符 → this.xxx.value
  // AST 转换会保留对象属性名，并正确展开简写属性。
  for (const name of allRefsAndComputed) {
    result = replaceRef(result, name);
  }

  // 2. 归一化 __instance.proxy.$forceUpdate.xxx → __instance.proxy.xxx
  //    用户可能通过 $forceUpdate 间接访问实例属性，
  //    将其归一化为标准路径，以便后续成员映射正确匹配
  result = safeReplace(
    result,
    /__instance\.proxy\.\$forceUpdate\./g,
    '__instance.proxy.'
  );

  // 3. 成员访问形式的全局 API
  // __i18n.t → this.$t, ElMessageBox.confirm → this.$confirm 等
  for (const [objName, props] of Object.entries(
    symbols.reverseMemberApiMap || {}
  )) {
    for (const [propName, apiName] of Object.entries(props)) {
      const regex = new RegExp(
        `\\b${escapeRegex(objName)}\\.${escapeRegex(propName)}\\b`,
        'g'
      );
      result = safeReplace(result, regex, `this.${apiName}`);
    }
  }

  // 4. __props.xxx → this.xxx
  // 必须在全局 API 变量（下一轮）之前执行，以免 __props 被 $props 映射污染
  for (const name of symbols.props) {
    result = replaceMemberAccess(result, '__props', name, `this.${name}`);
  }
  // 裸 prop 名 → this.prop（模板中直接使用 prop 名的情况）
  for (const name of symbols.props) {
    result = replacer(result, name, `this.${name}`);
  }

  // 5. 全局 API 变量 → this.$xxx
  for (const [varName, apiName] of Object.entries(symbols.reverseApiMap)) {
    result = replacer(result, varName, `this.${apiName}`);
  }

  // 6. state reactive 整体：__state → this.state
  if (symbols.hasState) {
    result = replacer(result, '__state', 'this.state');
  }

  // 7. 其他 reactives：obj → this.obj
  for (const name of symbols.reactives) {
    result = replacer(result, name, `this.${name}`);
  }

  // 8. methods
  for (const name of symbols.methods) {
    result = replacer(result, name, `this.${name}`);
  }

  // 9. composables 变量名（含解构字段）
  for (const name of symbols.composables) {
    result = replacer(result, name, `this.${name}`);
  }

  // 10. injects
  for (const name of symbols.injects) {
    result = replacer(result, name, `this.${name}`);
  }

  // 11. dataSources
  for (const name of symbols.dataSources) {
    result = replacer(result, name, `this.${name}`);
  }

  // 兜底：修复 this.this. 双重替换
  result = result.replace(/this\.this\./g, 'this.');

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 替换 obj.key → target
 * 例如 props.title → this.title
 */
function replaceMemberAccess(
  content: string,
  obj: string,
  key: string,
  target: string
): string {
  const regex = new RegExp(
    `\\b${escapeRegex(obj)}\\.${escapeRegex(key)}\\b`,
    'g'
  );
  return safeReplace(content, regex, target);
}
