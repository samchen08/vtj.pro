import { expect, test } from 'vitest';
import * as Renderer from '../src';

test('index', () => {
  expect(!!Renderer).toEqual(true);
});
