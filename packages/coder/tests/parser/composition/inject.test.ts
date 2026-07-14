import { expect, describe, test } from 'vitest';
import { parseInject } from '../../../src/parser/composition/inject';
import { buildSymbolTable } from '../../../src/parser/composition/symbolTable';

describe('parseInject', () => {
  test('should parse inject with default', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      inject: [{ name: 'theme', from: 'theme', default: 'light' }]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseInject(dsl.inject, symbols);
    expect(result[0]).toBe('const theme = inject(\'theme\', "light");');
  });

  test('should handle empty inject', () => {
    const symbols = buildSymbolTable({ id: 'test', name: 'Test' } as any);
    expect(parseInject([], symbols)).toEqual([]);
  });

  test('should parse inject with null default', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      inject: [{ name: 'data', from: 'data', default: null }]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseInject(dsl.inject, symbols);
    expect(result[0]).toContain('inject');
    expect(result[0]).toContain('undefined');
  });

  test('should parse inject with JSExpression default', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      inject: [{ name: 'config', from: 'config', default: { type: 'JSExpression', value: '{}' } }]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseInject(dsl.inject, symbols);
    expect(result[0]).toContain('inject');
    expect(result[0]).toContain('{}');
  });

  test('should use name as from when from is not provided', () => {
    const dsl = {
      id: 'test',
      name: 'Test',
      inject: [{ name: 'myService' }]
    } as any;
    const symbols = buildSymbolTable(dsl);
    const result = parseInject(dsl.inject, symbols);
    expect(result[0]).toContain("'myService'");
  });
});
