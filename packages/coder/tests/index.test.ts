import { expect, test } from 'vitest';
import { webMaterials } from './dsl/web.materials';
import { webProject } from './dsl/web.project';

import { generator } from '../src';
import { test_2 as dsl } from './dsl/test_2';

const deps = [];
const map = new Map();

Object.entries(webMaterials).forEach(([name, value]) => {
  map.set(name, value);
});

test('index', async () => {
  try {
    const content = await generator(
      dsl as any,
      map,
      webProject.dependencies as any,
      'web',
      false
    );
    console.log(content);
  } catch (e) {
    console.log('error----------------', e);
  }
  expect(!!generator).toBeTruthy();
});
