import { expect, test } from 'vitest';
import { upperFirstCamelCase, base64 } from '../src';

test('base', () => {
  expect(upperFirstCamelCase('helloWorld')).toEqual('HelloWorld');
  expect(base64('abc'))
});
