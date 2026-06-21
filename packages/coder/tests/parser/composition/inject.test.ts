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
});
