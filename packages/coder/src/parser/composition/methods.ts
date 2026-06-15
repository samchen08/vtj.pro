import type { JSFunction } from '@vtj/core';
import { transformExpression, unwrapFunction } from './transformer';
import type { SymbolTable } from './symbolTable';

/**
 * 解析 methods 为 Composition 顶层 const 函数声明：
 *
 * { handleClick: { value: 'function() { this.count++ }' } }
 *  → const handleClick = function() { count.value++ };
 *
 * { fetch: { value: 'async function() { ... }' } }
 *  → const fetch = async function() { ... };
 *
 * 兼容箭头函数：{ fn: { value: '() => {}' } } → const fn = () => {};
 */
export function parseMethods(
  methods: Record<string, JSFunction> = {},
  symbols: SymbolTable
): string[] {
  return Object.entries(methods)
    .map(([name, val]) => {
      if (!val || !val.value) return null;
      const transformed = transformExpression(val.value, symbols, 'script');
      const handler = unwrapFunction(transformed);
      // handler 形如：function() {} / async function() {} / () => {} / async () => {}
      return `const ${name} = ${handler};`;
    })
    .filter((n): n is string => !!n);
}

/**
 * 解析 dataSources 为 Composition 顶层 async 函数声明
 */
export function parseDataSources(
  dataSources: Record<string, any> = {},
  symbols?: SymbolTable
): string[] {
  return Object.values(dataSources)
    .map((item: any) => {
      if (!item || !item.name) return null;
      if (item.type === 'mock') {
        const rawMock =
          item.mockTemplate && item.mockTemplate.value
            ? item.mockTemplate.value
            : `(params) => ({})`;
        const mockTemplate = symbols
          ? transformExpression(rawMock, symbols, 'script')
          : rawMock;
        return `const ${item.name} = async (...args) => {
  const mock = __provider.createMock(${mockTemplate});
  return await mock.apply(null, args);
};`;
      } else {
        const rawTransform =
          item.transform && item.transform.value
            ? item.transform.value
            : `(res) => res`;
        const transform = symbols
          ? transformExpression(rawTransform, symbols, 'script')
          : rawTransform;
        return `const ${item.name} = async (...args) => {
  return await __provider.apis['${item.ref}'].apply(null, args).then(${transform});
};`;
      }
    })
    .filter((n): n is string => !!n);
}
