import { expect, test } from 'vitest';
import { isUrl, isEmail, isCarNo } from '../src';

test('isCarNo', () => {
  //   const id = '粤ED4E80A';
  //   const id = '粤EB7T809';
  const id = '粤BD12345';
  expect(isCarNo(id)).toBe(true);
});
