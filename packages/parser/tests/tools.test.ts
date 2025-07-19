import { expect, test } from 'vitest';
import { ComponentValidator, AutoFixer } from '../src';

import { project } from './sources/project';
import { test_27 as source } from './sources/test_27';
import { parseVue } from '../src';

test('test_1', async () => {
  const validtor = new ComponentValidator();
  const fixer = new AutoFixer();
  const validation = validtor.validate(source);
  const content = fixer.fixBasedOnValidation(source, validation);

  // console.log(content);

  const result = await parseVue({
    project,
    id: '235w0t1w',
    name: 'Bbb',
    source: content
  }).catch((errors) => {
    console.error('error', errors);
  });

  console.log(JSON.stringify(result, null, 2));

  // console.log(JSON.stringify(result));
  expect(true).toBeTruthy();
});
