import type { JSExpression, JSFunction } from '@vtj/core';
import { isJSCode } from '../../utils';
import type { SymbolTable } from './symbolTable';
import { GLOBAL_API_MAP } from './globalApi';

/**
 * 转换上下文：影响 ref/computed 的 .value 解包行为
 * - script: 解包，输出 xxx.value
 * - template: 不解包，Vue 模板自动解包
 */
export type TransformContext = 'script' | 'template';

/**
 * 转换 DSL 中的 this.xxx 引用为 Composition API 顶层标识符
 *
 * 转换规则：
 * - this.$router 等 globalApi → 替换为 router 等
 * - this.refsName → script: refsName.value, template: refsName
 * - this.reactiveName → reactiveName（包含 state）
 * - this.computedName → script: computedName.value, template: computedName
 * - this.methodName → methodName
 * - this.propName (props) → script: props.propName, template: propName
 * - this.composableName → composableName
 * - this.injectName → injectName
 * - this.dataSourceName → dataSourceName
 * - 未识别的 this.xxx → 保持原样（可能是动态属性 / 测试用例）
 */
export function transformExpression(
  code: string,
  symbols: SymbolTable,
  context: TransformContext = 'script'
): string {
  if (!code) return code;
  let result = code;

  // 1. 处理全局 API：this.$router → router
  for (const [api, cfg] of Object.entries(GLOBAL_API_MAP)) {
    // 转义 $ 与正则字符
    const escaped = api.replace(/\$/g, '\\$');
    const regex = new RegExp(`this\\.${escaped}\\b`, 'g');
    result = result.replace(regex, cfg.replace);
  }

  // 2. 处理已知符号：this.xxx → 转换后的标识符
  result = result.replace(/this\.([A-Za-z_$][\w$]*)/g, (match, name) => {
    // refs / computed 需要解包（仅 script）
    if (symbols.refs.has(name) || symbols.computed.has(name)) {
      return context === 'script' ? `${name}.value` : name;
    }
    // reactives / methods / composables / injects / dataSources 直接用
    if (
      symbols.reactives.has(name) ||
      symbols.methods.has(name) ||
      symbols.composables.has(name) ||
      symbols.injects.has(name) ||
      symbols.dataSources.has(name)
    ) {
      return name;
    }
    // props
    if (symbols.props.has(name)) {
      return context === 'script' ? `props.${name}` : name;
    }
    // 未识别保留原样
    return match;
  });

  return result;
}

/**
 * 转换 JSExpression / JSFunction，返回纯字符串
 */
export function transformCode(
  code: JSExpression | JSFunction | undefined,
  symbols: SymbolTable,
  context: TransformContext = 'script'
): string {
  if (!code) return '';
  if (!isJSCode(code)) return '';
  return transformExpression(code.value || '', symbols, context);
}

/**
 * 仅替换 this 前缀，不依赖符号表（兜底转换）
 * 用于无法识别的场景：直接去掉 this. 前缀
 */
export function stripThisPrefix(code: string): string {
  return code.replace(/this\./g, '');
}

/**
 * 移除外层括号包装：( fn ) → fn
 * 与 utils.ts 的 replaceFunctionTag 类似但更宽松
 */
export function unwrapFunction(code: string): string {
  let handler = code.trim().replace(/;$/, '');
  const bracketRegex = /^\((\(|async|function)/;
  if (bracketRegex.test(handler)) {
    handler = handler.substring(1, handler.length - 1).trim();
  }
  return handler;
}
