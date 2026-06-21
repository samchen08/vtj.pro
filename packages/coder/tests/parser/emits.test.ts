import { expect, describe, test } from 'vitest';
import { parseEmits } from '../../src/parser/emits';

describe('parseEmits', () => {
  test('should parse string emits', () => {
    const result = parseEmits(['change', 'submit']);
    expect(result).toEqual(["'change'", "'submit'"]);
  });

  test('should parse object emits', () => {
    const result = parseEmits([
      { name: 'change' } as any,
      { name: 'submit' } as any
    ]);
    expect(result).toEqual(["'change'", "'submit'"]);
  });

  test('should handle empty array', () => {
    expect(parseEmits([])).toEqual([]);
  });

  test('should handle mixed array', () => {
    const result = parseEmits(['click', { name: 'change' } as any]);
    expect(result).toEqual(["'click'", "'change'"]);
  });
});
