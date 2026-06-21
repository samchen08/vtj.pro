import { expect, describe, test } from 'vitest';
import { parseComputed } from '../../../src/parser/composition/computed';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseComputed', () => {
  test('should parse computed with function', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      computed: {
        total: { type: 'JSFunction', value: '() => this.count * 2' }
      }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseComputed(dsl.computed, symbols);
    expect(result[0]).toBe('const total = computed(() => this.count * 2);');
  });

  test('should handle empty computed', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseComputed({}, symbols)).toEqual([]);
  });
});
