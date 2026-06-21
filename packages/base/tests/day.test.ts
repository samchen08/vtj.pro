import { describe, it, expect } from 'vitest';
import { dateFormat } from '../src';

describe('日期格式化工具', () => {
  it('dateFormat 应格式化日期为默认格式', () => {
    const date = new Date('2024-03-15 14:30:00');
    expect(dateFormat(date)).toBe('2024-03-15 14:30:00');
  });

  it('dateFormat 应支持自定义格式化字符串', () => {
    const date = new Date('2024-03-15 14:30:00');
    expect(dateFormat(date, 'YYYY-MM-DD')).toBe('2024-03-15');
    expect(dateFormat(date, 'YYYY年MM月DD日')).toBe('2024年03月15日');
    expect(dateFormat(date, 'HH:mm:ss')).toBe('14:30:00');
    expect(dateFormat(date, 'MM/DD')).toBe('03/15');
  });

  it('dateFormat 应处理字符串类型日期', () => {
    expect(dateFormat('2024-03-15', 'YYYY/MM/DD')).toBe('2024/03/15');
  });

  it('dateFormat 应处理时间戳', () => {
    const timestamp = new Date('2024-03-15 14:30:00').getTime();
    expect(dateFormat(timestamp, 'YYYY-MM-DD')).toBe('2024-03-15');
  });

  it('dateFormat 应处理跨年日期', () => {
    const date = new Date('2023-12-31 23:59:59');
    expect(dateFormat(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-12-31 23:59:59');
  });

  it('dateFormat 应处理月份和日期补零', () => {
    const date = new Date('2024-01-05 08:05:00');
    expect(dateFormat(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-01-05 08:05:00');
  });
});
