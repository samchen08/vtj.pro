import { expect, test } from 'vitest';
import plugin from '../src';

test('plugin', () => {
  expect(!!plugin.plugin).toBeTruthy();
});
