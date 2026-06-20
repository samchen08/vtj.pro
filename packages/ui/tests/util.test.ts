import { describe, expect, test } from 'vitest';
import { getSizeValue, parseSize, toObjectProps } from '../src/utils/util';

describe('getSizeValue', () => {
  test('数字转为 px 字符串', () => {
    expect(getSizeValue(10)).toBe('10px');
    expect(getSizeValue(0)).toBe('0px');
    expect(getSizeValue(-5)).toBe('-5px');
  });

  test('字符串原样返回', () => {
    expect(getSizeValue('100%')).toBe('100%');
    expect(getSizeValue('50vw')).toBe('50vw');
    expect(getSizeValue('auto')).toBe('auto');
  });
});

describe('parseSize', () => {
  test('数字直接返回', () => {
    expect(parseSize(100, 1000)).toBe(100);
    expect(parseSize(0, 1000)).toBe(0);
  });

  test('百分比按最大值计算', () => {
    expect(parseSize('50%', 1000)).toBe(500);
    expect(parseSize('25%', 800)).toBe(200);
    expect(parseSize('100%', 500)).toBe(500);
    expect(parseSize('10%', 200)).toBe(20);
  });

  test('vh 单位按最大值计算', () => {
    expect(parseSize('50vh', 1000)).toBe(500);
    expect(parseSize('30vh', 500)).toBe(150);
  });

  test('vw 单位按最大值计算', () => {
    expect(parseSize('50vw', 1000)).toBe(500);
  });

  test('数字字符串转为整型', () => {
    expect(parseSize('200', 1000)).toBe(200);
  });

  test('默认值为 0', () => {
    expect(parseSize(undefined as any, 1000)).toBe(0);
  });
});

describe('toObjectProps', () => {
  test('true 返回默认值', () => {
    const result = toObjectProps(true, { key: 'value' });
    expect(result).toEqual({ key: 'value' });
  });

  test('false 返回默认值', () => {
    const result = toObjectProps(false);
    expect(result).toEqual({});
  });

  test('对象与默认值合并', () => {
    const result = toObjectProps({ a: 1, b: 2 }, { a: 0, c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('undefined 返回默认值', () => {
    const result = toObjectProps(undefined, { existing: true });
    expect(result).toEqual({ existing: true });
  });

  test('空对象返回默认值', () => {
    const result = toObjectProps({}, { foo: 'bar' });
    expect(result).toEqual({ foo: 'bar' });
  });
});
