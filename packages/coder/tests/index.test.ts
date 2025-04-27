import { expect, test } from 'vitest';

import { materials } from './materials';

import { generator } from '../src';
// import { input } from './log.json';

// import { deps } from './deps';
import { dsl, deps } from './dsl';

const map = new Map();

Object.entries(materials).forEach(([name, value]) => {
  map.set(name, value);
});

test('index', async () => {
  try {
    const content = await generator(
      // input.data.dsl as any,
      dsl as any,
      map,
      deps as any,
      'uniapp',
      false
    );
    // console.log(content);
  } catch (e) {
    // console.log('error----------------', e.codeFrame);
  }
  expect(!!generator).toBeTruthy();
});
