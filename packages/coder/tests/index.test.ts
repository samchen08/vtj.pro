import { expect, test } from 'vitest';

import { generator } from '../src';
import { input } from './log.json';

import { deps } from './deps';
// import { dsl } from './dsl';

test('index', async () => {
  try {
    const content = await generator(
      input.data.dsl as any,
      new Map(),
      deps,
      false
    );
    console.log(content);
  } catch (e) {
    console.log('error----------------', e.codeFrame);
  }
  expect(!!generator).toBeTruthy();
});
