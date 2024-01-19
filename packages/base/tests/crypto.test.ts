import { expect, test } from 'vitest';
import { RSA, unRSA, base64, unBase64, AES, unAES } from '../src';

test('RSA', () => {
  const code = RSA('abc');
  const result = unRSA(code as string);
  expect(result).toEqual('abc');
});

test('base64', () => {
  const code = base64('abc');
  const result = unBase64(code);
  expect(result).toEqual('abc');
});

test('AES', () => {
  const content = 'abc';
  const key = '123';
  const code = AES(content, key);
  const result = unAES(code, key);
  expect(result).toEqual(content);
});
