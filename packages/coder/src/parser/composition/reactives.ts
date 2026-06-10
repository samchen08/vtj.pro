import type { JSExpression, JSFunction, JSONValue } from '@vtj/core';
import { isJSCode } from '../../utils';
import { transformExpression } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 reactives 声明：
 * { form: { name: '' } } → ['const form = reactive({ "name": "" });']
 */
export function parseReactives(
  reactives: Record<string, JSONValue | JSExpression> = {},
  symbols: SymbolTable
): string[] {
  return Object.entries(reactives).map(([name, val]) => {
    let value: string;
    if (isJSCode(val)) {
      value = transformExpression(val.value || '{}', symbols, 'script');
    } else {
      value = JSON.stringify(val ?? {});
    }
    return `const ${name} = reactive(${value});`;
  });
}

/**
 * state 作为一个 reactive 输出（如果非空）
 */
export function parseStateAsReactive(
  state: Record<string, JSONValue | JSExpression | JSFunction> = {},
  symbols: SymbolTable
): string {
  const entries = Object.entries(state);
  if (entries.length === 0) return '';
  const fields = entries
    .map(([k, v]) => {
      let value: string;
      if (isJSCode(v)) {
        value = transformExpression(v.value || 'undefined', symbols, 'script');
      } else {
        value = JSON.stringify(v);
      }
      return `${k}: ${value}`;
    })
    .join(', ');
  return `const state = reactive({ ${fields} });`;
}
