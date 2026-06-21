import type { JSExpression, JSFunction, JSONValue } from '@vtj/core';
import { isJSCode, isJSFunction } from '../../utils';
import { transformExpression, unwrapFunction } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 provide 为 Composition provide() 调用：
 * { theme: 'light', count: { type: 'JSExpression', value: 'this.count' } }
 *  → provide('theme', 'light');
 *    provide('count', count);
 */
export function parseProvide(
  provide: Record<string, JSONValue | JSExpression | JSFunction> = {},
  symbols: SymbolTable
): string[] {
  return Object.entries(provide).map(([key, val]) => {
    let value: string;
    if (isJSFunction(val)) {
      const transformed = transformExpression(
        val.value || '',
        symbols,
        'script'
      );
      value = unwrapFunction(transformed);
    } else if (isJSCode(val)) {
      value = transformExpression(val.value || 'undefined', symbols, 'script');
    } else {
      value = JSON.stringify(val);
    }
    return `provide('${key}', ${value});`;
  });
}
