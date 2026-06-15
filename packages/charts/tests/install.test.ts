import { expect, test } from 'vitest';
import { components } from '../src';
test('components', () => {
  expect(Array.isArray(components)).toBe(true);
});
