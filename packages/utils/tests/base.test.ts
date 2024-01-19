import { expect, test } from 'vitest';
import { uid } from '../src';

test('base', () => {
  expect(!!uid()).toBeTruthy();
});
