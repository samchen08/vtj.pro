import { expect, describe, test } from 'vitest';
import { parseInject } from '../../src/parser/inject';

describe('parseInject', () => {
  test('should parse inject array with from', () => {
    const result = parseInject([
      { name: 'theme', from: 'theme', default: 'light' }
    ]);
    expect(result[0]).toContain('theme');
    expect(result[0]).toContain("from: 'theme'");
  });

  test('should handle empty inject', () => {
    expect(parseInject([])).toEqual([]);
  });

  test('should handle undefined', () => {
    expect(parseInject(undefined)).toEqual([]);
  });
});
