import { expect, test } from 'vitest';
import * as modules from '../src';

test('index', () => {
  expect(!!modules).toBeTruthy();
});
