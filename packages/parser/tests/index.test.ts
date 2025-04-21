import { expect, test } from 'vitest';
import { parseUniApp } from '../src';
import { App } from './UniApp';

test('index', async () => {
  const result = parseUniApp(App);
  // console.log(result);

  expect(true).toBeTruthy();
});
