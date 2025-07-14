import { expect, test } from 'vitest';
import { ComponentValidator, AutoFixer } from '../src';

import { project } from './sources/project';
import { test_27 as source } from './sources/test_27';

test('test_1', async () => {
  const validtor = new ComponentValidator();
  const fixer = new AutoFixer();
  const validation = validtor.validate(source);
  const content = fixer.fixBasedOnValidation(source, validation);
  console.log(content);

  expect(true).toBeTruthy();
});
