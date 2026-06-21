import { expect, describe, test } from 'vitest';
import { parseStyle } from '../../src/parser/style';

describe('parseStyle', () => {
  test('should generate CSS rules from collector style', () => {
    const style = {
      '.my-div_1': { color: 'red', fontSize: '14px' }
    };
    const result = parseStyle(style);
    expect(result).toContain('.my-div_1 {');
    expect(result).toContain('color: red');
    expect(result).toContain('fontSize: 14px');
  });

  test('should generate multiple CSS rules', () => {
    const style = {
      '.a': { color: 'red' },
      '.b': { color: 'blue' }
    };
    const result = parseStyle(style);
    expect(result).toContain('.a {');
    expect(result).toContain('.b {');
  });

  test('should handle empty style', () => {
    expect(parseStyle({})).toBe('');
  });
});
