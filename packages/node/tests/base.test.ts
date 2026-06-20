import { describe, expect, test } from 'vitest';
import {
  upperFirstCamelCase,
  base64,
  fs,
  copy,
  emptyDir,
  pathExists,
  pathExistsSync,
  readJson,
  readJsonSync,
  readdir,
  readdirSync
} from '../src';

describe('base re-exports', () => {
  test('upperFirstCamelCase', () => {
    expect(upperFirstCamelCase('helloWorld')).toEqual('HelloWorld');
    expect(upperFirstCamelCase('abc')).toEqual('Abc');
    expect(upperFirstCamelCase('')).toEqual('');
  });

  test('base64', () => {
    const encoded = base64('abc');
    expect(typeof encoded).toBe('string');
    expect(encoded.length).toBeGreaterThan(0);
  });
});

describe('fs re-exports', () => {
  test('fs 对象存在', () => {
    expect(fs).toBeDefined();
    expect(typeof fs.copy).toBe('function');
  });

  test('文件操作函数全部可导入且为函数', () => {
    expect(typeof copy).toBe('function');
    expect(typeof emptyDir).toBe('function');
    expect(typeof pathExists).toBe('function');
    expect(typeof pathExistsSync).toBe('function');
    expect(typeof readJson).toBe('function');
    expect(typeof readJsonSync).toBe('function');
    expect(typeof readdir).toBe('function');
    expect(typeof readdirSync).toBe('function');
  });
});
