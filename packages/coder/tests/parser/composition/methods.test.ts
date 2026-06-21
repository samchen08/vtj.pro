import { expect, describe, test } from 'vitest';
import {
  parseMethods,
  parseDataSources
} from '../../../src/parser/composition/methods';
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

describe('parseDataSources', () => {
  test('should transform this.state.xxx to __state.xxx in transform', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      apiMode: 'composition',
      state: { list: { type: 'JSExpression', value: '[]' } },
      dataSources: {
        loadData: {
          type: 'api',
          ref: 'getDashboardData',
          name: 'loadData',
          transform: {
            type: 'JSFunction',
            value: '(res) => { this.state.list = []; return res; }'
          }
        }
      }
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseDataSources(dsl.dataSources, symbols);
    expect(result[0]).toContain('__state.list');
    expect(result[0]).not.toContain('this.state.list');
  });

  test('should not transform when no symbols provided', () => {
    const dataSources = {
      loadData: {
        type: 'api',
        ref: 'getData',
        name: 'loadData',
        transform: {
          type: 'JSFunction',
          value: '(res) => { this.state.list = []; return res; }'
        }
      }
    } as any;
    const result = parseDataSources(dataSources);
    // 无 symbols 时不做转换，保留原始值
    expect(result[0]).toContain('this.state.list');
  });
});
