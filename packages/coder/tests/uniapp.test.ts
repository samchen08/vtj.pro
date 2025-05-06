import { expect, test } from 'vitest';

import { uniappMaterials } from './dsl/uniapp.materials';
import { uniappProject } from './dsl/uniapp.project';
import { test_1 as dsl } from './dsl/test_1';
import { generator } from '../src';

const map = new Map();

Object.entries(uniappMaterials).forEach(([name, value]) => {
  map.set(name, value);
});

test('uniapp', async () => {
  try {
    // const content = await generator(
    //   // input.data.dsl as any,
    //   dsl as any,
    //   map,
    //   uniappProject.dependencies as any,
    //   'uniapp',
    //   false
    // );
    // console.log(content);
  } catch (e) {
    console.log('error----------------', e.codeFrame);
  }
  expect(!!generator).toBeTruthy();
});
