import type { BlockWatch } from '@vtj/core';
import { transformExpression, unwrapFunction } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 watch 为 Composition watch() 调用：
 *
 * { source: '() => this.count', handler: 'function(val) {...}', deep: true }
 *  → watch(() => count.value, function(val) {...}, { deep: true });
 */
export function parseWatch(
  watches: BlockWatch[] = [],
  symbols: SymbolTable
): string[] {
  return watches
    .map((w) => {
      if (!w || !w.handler || !w.handler.value) return null;
      const sourceCode =
        w.source && (w.source as any).value
          ? transformExpression((w.source as any).value, symbols, 'script')
          : '() => null';
      const source = unwrapFunction(sourceCode);
      const handlerCode = transformExpression(
        w.handler.value,
        symbols,
        'script'
      );
      const handler = unwrapFunction(handlerCode);
      const opts: string[] = [];
      if (w.deep) opts.push('deep: true');
      if (w.immediate) opts.push('immediate: true');
      if (w.flush) opts.push(`flush: '${w.flush}'`);
      const optStr = opts.length > 0 ? `, { ${opts.join(', ')} }` : '';
      return `watch(${source}, ${handler}${optStr});`;
    })
    .filter((n): n is string => !!n);
}
