import { expect, test } from 'vitest';

import { generator } from '../src';

// import { deps } from './deps';
// import { dsl } from './dsl';

test('index', async () => {
  // const content = await generator(dsl as any, new Map(), deps);
  // console.log(content);
  expect(!!generator).toBeTruthy();
});
