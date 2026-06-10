import { expect, describe, test } from 'vitest';
import { parseRefs } from '../../../src/parser/composition/refs';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseRefs', () => {
  test('should parse number ref', () => {
    const dsl = { id: 'test', name: 'Test', refs: { count: 0 } } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseRefs(dsl.refs, symbols);
    expect(result[0]).toBe('const count = ref(0);');
  });

  test('should parse string ref', () => {
    const dsl = { id: 'test', name: 'Test', refs: { name: 'hello' } } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseRefs(dsl.refs, symbols);
    expect(result[0]).toBe('const name = ref("hello");');
  });

  test('should parse JSExpression ref', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      refs: { list: { type: 'JSExpression', value: '[1,2,3]' } }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseRefs(dsl.refs, symbols);
    expect(result[0]).toBe('const list = ref([1,2,3]);');
  });

  test('should handle empty refs', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseRefs({}, symbols)).toEqual([]);
  });
});
