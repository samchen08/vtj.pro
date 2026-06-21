import type { JSExpression, JSONValue } from '@vtj/core';
import { isJSCode } from '../../utils';
import { transformExpression } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 refs 声明：
 * { count: 0, list: { type: 'JSExpression', value: 'this.props.items' } }
 *  → ['const count = ref(0);', 'const list = ref(props.items);']
 */
export function parseRefs(
  refs: Record<string, JSONValue | JSExpression> = {},
  symbols: SymbolTable
): string[] {
  return Object.entries(refs).map(([name, val]) => {
    let value: string;
    if (isJSCode(val)) {
      value = transformExpression(val.value || 'undefined', symbols, 'script');
    } else {
      value = JSON.stringify(val);
    }
    return `const ${name} = ref(${value});`;
  });
}
