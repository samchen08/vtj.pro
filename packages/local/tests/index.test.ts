import { expect, test } from 'vitest';

import { createDevPlugin } from '../src';

test('index', () => {
  expect(!!createDevPlugin).toBeTruthy();
});
