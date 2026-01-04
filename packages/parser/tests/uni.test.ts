import { expect, test } from 'vitest';
import { parseVue, htmlToNodes } from '../src';

import { uniProject } from './sources/uni';
import { uni_24 as source } from './sources/uni_24';

test('test_1', async () => {
  const result = await parseVue({
    project: uniProject as any,
    id: '235w0t1w',
    name: 'Bbb',
    source
  }).catch((errors) => {
    console.error('error', errors);
  });

  console.log(JSON.stringify(result, null, 2));

  expect(true).toBeTruthy();
});
