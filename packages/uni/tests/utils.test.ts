import { describe, expect, test } from 'vitest';
import {
  toKebabCase,
  getNavigationBar,
  getGobalStyle,
  getFileId
} from '../src';

describe('toKebabCase', () => {
  test('将驼峰转为 kebab-case', () => {
    expect(toKebabCase('navigationBarBackgroundColor')).toBe(
      'navigation-bar-background-color'
    );
  });

  test('首字母小写保持不变', () => {
    expect(toKebabCase('abcDef')).toBe('abc-def');
  });

  test('单词语义不变', () => {
    expect(toKebabCase('hello')).toBe('hello');
  });
});

describe('getNavigationBar', () => {
  test('提取导航栏样式属性并映射', () => {
    const style = {
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '首页',
      navigationStyle: 'custom',
      backgroundColor: '#f5f5f5',
      enablePullDownRefresh: true
    };
    const result = getNavigationBar(style);
    expect(result).toEqual({
      backgroundColor: '#ffffff',
      titleColor: '#000000',
      titleText: '首页',
      style: 'custom'
    });
  });

  test('navigationBarTextStyle 的 white 映射为 #ffffff', () => {
    const style = { navigationBarTextStyle: 'white' };
    const result = getNavigationBar(style);
    expect(result.titleColor).toBe('#ffffff');
  });

  test('不相关的属性被忽略', () => {
    const result = getNavigationBar({ backgroundColor: '#fff' });
    expect(Object.keys(result)).toEqual([]);
  });
});

describe('getGobalStyle', () => {
  test('提取非导航栏的全局样式', () => {
    const style = {
      navigationBarBackgroundColor: '#ffffff',
      backgroundColor: '#f5f5f5',
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark',
      onReachBottomDistance: 100
    };
    const result = getGobalStyle(style);
    expect(result).toEqual({
      backgroundColor: '#f5f5f5',
      enablePullDownRefresh: true,
      backgroundTextStyle: 'dark',
      onReachBottomDistance: 100
    });
    expect(result.navigationBarBackgroundColor).toBeUndefined();
  });
});

describe('getFileId', () => {
  test('从 hash 路径中提取页面 ID', () => {
    expect(getFileId('#/pages/abc123')).toBe('abc123');
  });

  test('带 query 参数时正确提取', () => {
    expect(getFileId('#/pages/abc123?foo=bar')).toBe('abc123');
  });

  test('不匹配时返回空字符串', () => {
    expect(getFileId('')).toBe('');
    expect(getFileId('/other/path')).toBe('');
  });
});
