import { expect, describe, test } from 'vitest';
import { parseLifeCycles } from '../../../src/parser/composition/lifeCycles';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseLifeCycles', () => {
  test('should parse mounted hook', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      lifeCycles: {
        mounted: {
          type: 'JSFunction',
          value: 'function() { console.log("mounted") }'
        }
      }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseLifeCycles(dsl.lifeCycles, symbols);
    expect(result.statements[0]).toContain(
      'onMounted(function() { console.log("mounted") })'
    );
    expect(result.usedHooks.has('onMounted')).toBe(true);
  });

  test('should handle empty lifeCycles', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    const result = parseLifeCycles({}, symbols);
    expect(result.statements).toEqual([]);
    expect(result.usedHooks.size).toBe(0);
  });
});
