import type { BlockInject, JSExpression } from '@vtj/core';
import { isJSCode } from '../../utils';
import { transformExpression } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 inject 为 Composition 顶层声明：
 * { name: 'theme', from: 'theme', default: 'light' }
 *  → const theme = inject('theme', 'light');
 */
export function parseInject(
  injects: BlockInject[] = [],
  symbols: SymbolTable
): string[] {
  return injects.map((n) => {
    const key = isJSCode(n.from)
      ? transformExpression(
          (n.from as JSExpression).value || `'${n.name}'`,
          symbols,
          'script'
        )
      : `'${n.from || n.name}'`;
    let dflt = 'undefined';
    if (n.default !== undefined && n.default !== null) {
      if (isJSCode(n.default)) {
        dflt = transformExpression(
          (n.default as JSExpression).value || 'undefined',
          symbols,
          'script'
        );
      } else {
        dflt = JSON.stringify(n.default);
      }
    }
    return `const ${n.name} = inject(${key}, ${dflt});`;
  });
}
