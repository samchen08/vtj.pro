import { describe, it, expect } from 'vitest';
import { numberFormat, toFixed } from '../src';

describe('数字格式化工具', () => {
  it('numberFormat 应格式化数字', () => {
    expect(numberFormat(1234.567)).toBe('1234.57');
    expect(numberFormat(1234.5, '0,0.00')).toBe('1,234.50');
    expect(numberFormat(1000, '0,0')).toBe('1,000');
  });

  it('numberFormat 应处理小数位数', () => {
    expect(numberFormat(0.1 + 0.2, '0.00')).toBe('0.30');
    expect(numberFormat(0, '0.00')).toBe('0.00');
    expect(numberFormat(999.999, '0.0')).toBe('1000.0');
  });

  it('toFixed 应保留指定小数位数(四舍五入)', () => {
    expect(toFixed(3.14159, 2, true)).toBe(3.14);
    expect(toFixed(3.145, 2, true)).toBe(3.15);
    expect(toFixed(3.14159, 3, true)).toBe(3.142);
  });

  it('toFixed 应保留指定小数位数(向下取整)', () => {
    expect(toFixed(3.14159, 2, false)).toBe(3.14);
    expect(toFixed(3.145, 2, false)).toBe(3.14);
    expect(toFixed(3.999, 2, false)).toBe(3.99);
  });

  it('toFixed 应处理默认小数位数', () => {
    expect(toFixed(5.678, undefined as any, true)).toBe(5.68);
    expect(toFixed(5.678, undefined as any, false)).toBe(5.67);
  });

  it('toFixed 应处理整数', () => {
    expect(toFixed(10, 2, true)).toBe(10);
    expect(toFixed(10, 2, false)).toBe(10);
  });

  it('toFixed 应处理负数', () => {
    expect(toFixed(-3.14159, 2, true)).toBe(-3.14);
    expect(toFixed(-3.14159, 2, false)).toBe(-3.15);
  });
});
