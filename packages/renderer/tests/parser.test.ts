import { expect, test, describe } from 'vitest';
import {
  isJSExpression,
  isJSFunction,
  isJSCode,
  JSCodeToString,
  parseExpression,
  parseFunction
} from '../src/utils/parser';

test('isJSExpression detects JSExpression type', () => {
  expect(isJSExpression({ type: 'JSExpression', value: 'a + b' })).toBe(true);
  expect(isJSExpression({ type: 'JSFunction', value: '() => {}' })).toBe(false);
  expect(isJSExpression({ type: 'other' })).toBe(false);
  expect(isJSExpression(null)).toBeNull();
  // undefined returns undefined because data && data.type short-circuits
  expect(isJSExpression(undefined)).toBeUndefined();
  expect(isJSExpression('string')).toBe(false);
});

test('isJSFunction detects JSFunction type', () => {
  expect(isJSFunction({ type: 'JSFunction', value: '() => {}' })).toBe(true);
  expect(isJSFunction({ type: 'JSExpression', value: 'a + b' })).toBe(false);
  expect(isJSFunction({ type: 'other' })).toBe(false);
  expect(isJSFunction(null)).toBeNull();
  expect(isJSFunction('string')).toBe(false);
});

test('isJSCode detects both JSExpression and JSFunction', () => {
  expect(isJSCode({ type: 'JSExpression', value: 'a + b' })).toBe(true);
  expect(isJSCode({ type: 'JSFunction', value: '() => {}' })).toBe(true);
  expect(isJSCode({ type: 'other' })).toBe(false);
  expect(isJSCode('string')).toBe(false);
});

test('JSCodeToString converts JS code to string', () => {
  expect(JSCodeToString({ type: 'JSExpression', value: 'a + b' })).toBe(
    'a + b'
  );
  expect(JSCodeToString({ type: 'JSFunction', value: '() => {}' })).toBe(
    '() => {}'
  );
  expect(JSCodeToString('plain text')).toBe('"plain text"');
  expect(JSCodeToString(123)).toBe('123');
  expect(JSCodeToString(null)).toBe('null');
});

test('parseExpression evaluates simple expression', () => {
  const self = { x: 10, y: 20 };
  const result = parseExpression(
    { type: 'JSExpression', value: 'this.x + this.y' },
    self
  );
  expect(result).toBe(30);
});

test('parseExpression returns undefined for empty value', () => {
  const result = parseExpression({ type: 'JSExpression', value: '' }, { x: 1 });
  expect(result).toBeUndefined();
});

test('parseExpression handles string values', () => {
  const self = { name: 'VTJ' };
  const result = parseExpression(
    { type: 'JSExpression', value: '"Hello " + this.name' },
    self
  );
  expect(result).toBe('Hello VTJ');
});

test('parseExpression handles noWith mode', () => {
  const self = { val: 42 };
  // With noWith mode, use __self directly in expression
  const result = parseExpression(
    { type: 'JSExpression', value: '__self.val * 2' },
    self,
    false,
    false,
    true // noWith mode
  );
  expect(result).toBe(84);
});

test('parseExpression throws error when throwError is true', () => {
  expect(() => {
    parseExpression(
      { type: 'JSExpression', value: 'invalid syntax @@' },
      {},
      false,
      true
    );
  }).toThrow();
});

test('parseFunction returns a function', () => {
  const self = {};
  const fn = parseFunction(
    { type: 'JSFunction', value: '() => { return 42; }' },
    self
  );
  expect(typeof fn).toBe('function');
  expect(fn()).toBe(42);
});

test('parseFunction throws when not a function', () => {
  expect(() => {
    parseFunction({ type: 'JSFunction', value: '123' }, {}, false, true);
  }).toThrow();
});
