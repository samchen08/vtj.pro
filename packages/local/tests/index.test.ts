import { expect, test } from 'vitest';

import { createDevTools } from '../src';
import { VueRepository } from '../src/repository';

test('index', () => {
  expect(!!createDevTools).toBeTruthy();
});

test('VueRepository rejects paths outside its source root', () => {
  const repository = new VueRepository({
    dir: 'src/views',
    platform: 'web'
  });
  expect(() => repository.save('../escape', '')).toThrow('格式不正确');
});
