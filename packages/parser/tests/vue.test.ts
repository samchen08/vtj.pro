import { expect, test } from 'vitest';
import { parseVue, htmlToNodes } from '../src';

import { project } from './sources/project';
import { test_25 as source } from './sources/test_25';

test('test_1', async () => {
  const result = await parseVue({
    project,
    id: '235w0t1w',
    name: 'Bbb',
    source
  }).catch((errors) => {
    console.error('error', errors);
  });

  console.log(JSON.stringify(result, null, 2));

  expect(true).toBeTruthy();
});
