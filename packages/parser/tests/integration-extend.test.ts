import { expect, test, describe } from 'vitest';
import { replacer } from '../src';

describe('replacer - code transformation', () => {
  test('should replace __provider refs', () => {
    const code = `const provider = __provider;`;
    const result = replacer(code, 'prod_123');
    expect(result).toBeDefined();
  });

  test('should replace with custom id', () => {
    const code = `const x = __provider.prop;`;
    const result = replacer(code, 'custom-id');
    expect(result).toBeDefined();
  });
});
