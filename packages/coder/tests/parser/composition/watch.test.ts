import { expect, describe, test } from 'vitest';
import { parseWatch } from '../../../src/parser/composition/watch';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseWatch', () => {
  test('should parse watch', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      watch: [
        {
          source: { type: 'JSExpression', value: 'count' },
          handler: {
            type: 'JSFunction',
            value: 'function(val) { console.log(val) }'
          },
          deep: false,
          immediate: true
        }
      ]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseWatch(dsl.watch, symbols);
    expect(result[0]).toContain('watch(');
    expect(result[0]).toContain('function(val) { console.log(val) }');
  });

  test('should handle empty watch', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseWatch([], symbols)).toEqual([]);
  });
});
