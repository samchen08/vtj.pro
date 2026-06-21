import { expect, describe, test } from 'vitest';
import { parseReactives } from '../../../src/parser/composition/reactives';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseReactives', () => {
  test('should parse reactive object', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      reactives: { form: { name: '', age: 0 } }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseReactives(dsl.reactives, symbols);
    expect(result[0]).toBe('const form = reactive({"name":"","age":0});');
  });

  test('should handle empty reactives', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseReactives({}, symbols)).toEqual([]);
  });
});
