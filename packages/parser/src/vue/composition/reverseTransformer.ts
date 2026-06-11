import { replacer } from '../replacer';
import type { ReverseSymbolTable } from './reverseSymbolTable';

/**
 * Composition API → DSL 反向转换器
 *
 * 这是 @vtj/coder transformer.ts 的精确反操作。
 * 将 <script setup> 中的顶层标识符形态转为 DSL 中的 this.xxx 形态。
 *
 * 转换顺序很关键，需要避免重复替换：
 * 1. ref/computed 的 .value 解包：xxx.value → this.xxx.value
 * 2. ref/computed 裸名：xxx → this.xxx.value
 * 3. 成员访问形式的全局 API：__i18n.t → this.$t, ElMessageBox.confirm → this.$confirm
 * 4. props.xxx → this.xxx；裸 prop → this.xxx
 *    （必须在全局 API 变量之前执行，避免 props 与 $props 冲突）
 * 5. 全局 API 变量：router → this.$router
 * 6. state → this.state
 * 7. reactives：obj → this.obj
 * 8. methods/composables/injects/dataSources：name → this.name
 */
export function reverseTransformExpression(
  code: string,
  symbols: ReverseSymbolTable
): string {
  if (!code) return code;
  let result = code;

  const allRefsAndComputed = [...symbols.refs, ...symbols.computed];

  // 1. ref/computed 的 .value 访问 → this.xxx.value
  for (const name of allRefsAndComputed) {
    result = result.replace(
      new RegExp(`\\b${escapeRegex(name)}\\.value\\b`, 'g'),
      `this.${name}.value`
    );
  }

  // 2. ref/computed 裸名 → this.xxx.value
  // 使用负向后顾避免替换 this.xxx.value 中已有的 name
  for (const name of allRefsAndComputed) {
    result = result.replace(
      new RegExp(`(?<!this\\.)\\b${escapeRegex(name)}\\b`, 'g'),
      `this.${name}.value`
    );
  }

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
      result = result.replace(regex, `this.${apiName}`);
    }
  }

  // 4. props.xxx → this.xxx
  // 必须在全局 API 变量（下一轮）之前执行，以免 props 被 $props 映射污染
  for (const name of symbols.props) {
    result = replaceMemberAccess(result, 'props', name, `this.${name}`);
  }
  // 裸 prop 名 → this.prop（模板中直接使用 prop 名的情况）
  for (const name of symbols.props) {
    result = replacer(result, name, `this.${name}`);
  }

  // 5. 全局 API 变量 → this.$xxx
  for (const [varName, apiName] of Object.entries(symbols.reverseApiMap)) {
    result = replacer(result, varName, `this.${apiName}`);
  }

  // 6. state reactive 整体：state → this.state
  if (symbols.hasState) {
    result = replacer(result, 'state', 'this.state');
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
  return content.replace(regex, target);
}
