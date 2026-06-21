import { describe, it, expect } from 'vitest';
import {
  isString,
  isSymbol,
  isArray,
  isObject,
  isBoolean,
  isDate,
  isUndefined,
  isNull,
  isNumber,
  isPlainObject,
  isEqual,
  noop,
  camelCase,
  upperFirst,
  lowerFirst,
  kebabCase,
  snakeCase,
  get,
  set,
  cloneDeep,
  merge,
  upperFirstCamelCase
} from '../src';

describe('lodash 工具函数', () => {
  describe('类型检查', () => {
    it('isString', () => {
      expect(isString('abc')).toBe(true);
      expect(isString(null)).toBe(false);
      expect(isString(0)).toBe(false);
    });

    it('isSymbol', () => {
      expect(isSymbol(Symbol('test'))).toBe(true);
      expect(isSymbol(null)).toBe(false);
    });

    it('isArray', () => {
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray({})).toBe(false);
    });

    it('isObject', () => {
      expect(isObject({})).toBe(true);
      expect(isObject(null)).toBe(false);
      expect(isObject('string')).toBe(false);
    });

    it('isBoolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
    });

    it('isDate', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate('2024-01-01')).toBe(false);
    });

    it('isUndefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
    });

    it('isNull', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
    });

    it('isNumber', () => {
      expect(isNumber(42)).toBe(true);
      expect(isNumber('42')).toBe(false);
    });

    it('isPlainObject', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject(new Date())).toBe(false);
    });

    it('isEqual', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
      expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    });
  });

  describe('字符串转换', () => {
    it('camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('hello world')).toBe('helloWorld');
    });

    it('upperFirst', () => {
      expect(upperFirst('helloWorld')).toBe('HelloWorld');
    });

    it('lowerFirst', () => {
      expect(lowerFirst('Hello')).toBe('hello');
      expect(lowerFirst('HelloWorld')).toBe('helloWorld');
    });

    it('kebabCase', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });

    it('snakeCase', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
    });

    it('upperFirstCamelCase', () => {
      expect(upperFirstCamelCase('hello-world')).toBe('HelloWorld');
      expect(upperFirstCamelCase('hello_world')).toBe('HelloWorld');
      expect(upperFirstCamelCase('hello world')).toBe('HelloWorld');
      expect(upperFirstCamelCase('helloWorld')).toBe('HelloWorld');
    });
  });

  describe('对象操作', () => {
    it('get', () => {
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

    it('set', () => {
      const object = { a: [{ b: { c: 3 } }] };
      set(object, 'a[0].b.c', 4);
      set(object, ['x', '0', 'y', 'z'], 5);

      expect(object.a[0].b.c).toBe(4);
      expect(get(object, 'x.0.y.z')).toBe(5);
    });

    it('cloneDeep', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = cloneDeep(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('merge', () => {
      const result = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('merge 应深度合并', () => {
      const result = merge({ a: { x: 1 } }, { a: { y: 2 } });
      expect(result).toEqual({ a: { x: 1, y: 2 } });
    });
  });

  describe('其它', () => {
    it('noop 应为空操作函数', () => {
      expect(noop()).toBeUndefined();
    });
  });
});
