import { expect, test } from 'vitest';
import { isString, isSymbol, camelCase, upperFirst, get, set } from '../src';

test('isString', () => {
  expect(isString('abc')).toBe(true);
  expect(isString(null)).toBe(false);
  expect(isString(0)).toBe(false);
});

test('isSymbol', () => {
  expect(isSymbol(Symbol('test'))).toBe(true);
  expect(isSymbol(null)).toBe(false);
});

test('camelCase', () => {
  expect(camelCase('hello-world')).equal('helloWorld');
  expect(camelCase('hello world')).equal('helloWorld');
});

test('upperFirst', () => {
  expect(upperFirst('helloWorld')).equal('HelloWorld');
});

test('get', () => {
  const obj = {
    a: 1,
    b: { c: 2 },
    c: [1, 2, 3],
    d: [{ a: 3 }]
  };

  expect(get(obj, 'a')).toBe(1);
  expect(get(obj, 'b.c')).toBe(2);
  expect(get(obj, 'c.2')).toBe(3);
  expect(get(obj, 'd.0.a')).toBe(3);
  expect(get(obj, 'e', null)).toBe(null);
});

test('set', () => {
  const object = { a: [{ b: { c: 3 } }] };
  set(object, 'a[0].b.c', 4);
  set(object, ['x', '0', 'y', 'z'], 5);

  expect(object.a[0].b.c).toBe(4);
  expect(get(object, 'x.0.y.z')).toBe(5);
});
