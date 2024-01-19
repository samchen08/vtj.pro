import { expect, test } from 'vitest';
import { emitter } from '../src';

test('emitter', () => {
  expect(!!emitter).toBe(true);
});
