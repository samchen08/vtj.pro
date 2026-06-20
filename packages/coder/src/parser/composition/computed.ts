import type { JSExpression, JSFunction } from '@vtj/core';
import { transformExpression, unwrapFunction } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 computed 为 Composition 顶层声明：
 * { total: { value: '() => this.count * 2' } }
 *  → const total = computed(() => count.value * 2);
 */
export function parseComputed(
  computed: Record<string, JSFunction | JSExpression> = {},
  symbols: SymbolTable
): string[] {
  return Object.entries(computed)
    .map(([name, val]) => {
      if (!val || !val.value) return null;
      const transformed = transformExpression(val.value, symbols, 'script');
      const unwrapped = unwrapFunction(transformed);
      return `const ${name} = computed(${unwrapped});`;
    })
    .filter((n): n is string => !!n);
}
