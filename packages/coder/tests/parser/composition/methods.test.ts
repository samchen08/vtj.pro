import { expect, describe, test } from 'vitest';
import { parseMethods } from '../../../src/parser/composition/methods';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseMethods', () => {
  test('should parse methods', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      methods: {
        handleClick: {
          type: 'JSFunction',
          value:
            'function() { this.count++; this.$emit("change", this.count); this.$router.push("/about"); }'
        }
      }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseMethods(dsl.methods, symbols);
    expect(result[0]).toContain('const handleClick =');
  });

  test('should handle empty methods', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseMethods({}, symbols)).toEqual([]);
  });
});
