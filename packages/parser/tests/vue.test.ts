import { expect, test } from 'vitest';
import { parseVue } from '../src';

import { project } from './sources/project';
import { test_1 } from './sources/test_1';

test('test_1', async () => {
  const result = await parseVue({
    project,
    id: '235w0t1w',
    name: 'Bbb',
    source: test_1
  }).catch((errors) => {
    console.error('error', errors);
  });

  console.log(JSON.stringify(result, null, 2));

  expect(true).toBeTruthy();
});
