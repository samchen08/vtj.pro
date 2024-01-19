import { expect, test } from 'vitest';

import { generator } from '../src';

test('index', () => {
  expect(!!generator).toBeTruthy();
});
