import { expect, test } from 'vitest';

import { createDevTools } from '../src';

test('index', () => {
  expect(!!createDevTools).toBeTruthy();
});
