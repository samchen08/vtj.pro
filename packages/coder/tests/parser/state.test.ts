import { expect, describe, test } from 'vitest';
import { parseState } from '../../src/parser/state';

describe('parseState', () => {
  test('should parse state with string value', () => {
    const result = parseState({ title: 'hello' });
    expect(result).toContain('title:hello');
  });

  test('should parse state with JSExpression value', () => {
    const result = parseState({
      list: { type: 'JSExpression', value: '[]' }
    });
    expect(result).toContain('list:[]');
  });

  test('should handle empty state', () => {
    expect(parseState({})).toEqual([]);
  });
});
