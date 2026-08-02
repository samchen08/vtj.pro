import { expect, test, describe, vi } from 'vitest';
import {
  isJSExpression,
  isJSFunction,
  isJSCode,
  JSCodeToString,
  parseExpression,
  parseFunction,
  triggerError
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

test('parseExpression handles scope with arguments property', () => {
  // 当上下文存在 arguments 属性时，内部不能依赖 arguments 对象，
  // 否则会被 with(scope) 拦截，导致 this 指向错误。
  const self = { state: { ruleForm: { name: 'x' } }, arguments: [] };
  const result = parseExpression(
    { type: 'JSExpression', value: 'this.state.ruleForm' },
    self
  );
  expect(result).toEqual({ name: 'x' });
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

test('parseExpression does not rewrite this inside strings or object keys', () => {
  expect(
    parseExpression(
      { type: 'JSExpression', value: '({ this: "this is text" })' },
      {}
    )
  ).toEqual({ this: 'this is text' });
});

test('parseExpression preserves this for arrow and classic functions', () => {
  const self = { value: 42 };
  const arrow = parseExpression(
    { type: 'JSFunction', value: '() => this.value' },
    self
  );
  const classic = parseExpression(
    { type: 'JSFunction', value: 'function () { return this.value }' },
    self
  );

  expect(arrow()).toBe(42);
  expect(classic()).toBe(42);
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

test('JSCodeToString wraps value starting with { in parentheses', () => {
  expect(JSCodeToString({ type: 'JSExpression', value: '{ a: 1 }' })).toBe(
    '({ a: 1 })'
  );
  expect(JSCodeToString({ type: 'JSFunction', value: '{ return 1; }' })).toBe(
    '({ return 1; })'
  );
});

describe('triggerError', () => {
  test('calls errorHandler when __simulator__ exists', () => {
    const mockHandler = vi.fn();
    const mockSimulator = {
      engine: { provider: { errorHandler: mockHandler } }
    };
    (globalThis as any).__simulator__ = mockSimulator;
    const err = new Error('test error');
    triggerError(err);
    expect(mockHandler).toHaveBeenCalledWith(err);
    delete (globalThis as any).__simulator__;
  });

  test('does not throw when __simulator__ is missing', () => {
    expect(() => triggerError(new Error('test'))).not.toThrow();
  });
});
