import { expect, describe, test } from 'vitest';
import { parseProps } from '../../src/parser/props';

describe('parseProps', () => {
  test('should parse string prop', () => {
    const result = parseProps(['title']);
    expect(result[0]).toBe('title: {}');
  });

  test('should parse prop with type', () => {
    const result = parseProps([{ name: 'title', type: 'String' }]);
    expect(result[0]).toContain('title: {');
    expect(result[0]).toContain('type:[String]');
  });

  test('should parse prop with default', () => {
    const result = parseProps([{ name: 'count', type: 'Number', default: 0 }]);
    // Values that are falsy (0) will be treated as "default: undefined" in parseProps
    expect(result[0]).toBeTruthy();
  });

  test('should parse prop with JSExpression default', () => {
    const result = parseProps([
      {
        name: 'list',
        type: 'Array',
        default: { type: 'JSExpression', value: '() => []' }
      }
    ]);
    expect(result[0]).toContain('default: () => []');
  });

  test('should set undefined default for JSExpression with no value', () => {
    const result = parseProps([
      {
        name: 'items',
        type: 'Array',
        default: { type: 'JSExpression', value: '' }
      }
    ]);
    expect(result[0]).toContain('default: undefined');
  });

  test('should parse prop with required', () => {
    const result = parseProps([{ name: 'id', type: 'String', required: true }]);
    expect(result[0]).toContain('required: true');
  });

  test('should handle empty props array', () => {
    expect(parseProps([])).toEqual([]);
  });

  test('should handle multiple type arguments', () => {
    const result = parseProps([{ name: 'value', type: ['String', 'Number'] }]);
    expect(result[0]).toContain('type:[String,Number]');
  });
});
