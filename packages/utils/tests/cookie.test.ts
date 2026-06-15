import { describe, it, expect } from 'vitest';
import { cookie } from '../src';

describe('cookie 工具', () => {
  it('set 应设置 cookie', () => {
    cookie.set('test_key', 'test_value');
    expect(cookie.get('test_key')).toBe('test_value');
  });

  it('get 应返回 null 当 cookie 不存在', () => {
    expect(cookie.get('nonexistent_key')).toBeUndefined();
  });

  it('remove 应删除 cookie', () => {
    cookie.set('temp', 'value');
    cookie.remove('temp');
    expect(cookie.get('temp')).toBeUndefined();
  });

  it('set 应支持选项参数', () => {
    cookie.set('opts_key', 'opts_val', { path: '/', secure: false });
    expect(cookie.get('opts_key')).toBe('opts_val');
  });

  it('多个 cookie 互不影响', () => {
    cookie.set('a', '1');
    cookie.set('b', '2');
    expect(cookie.get('a')).toBe('1');
    expect(cookie.get('b')).toBe('2');
    cookie.remove('a');
    expect(cookie.get('a')).toBeUndefined();
    expect(cookie.get('b')).toBe('2');
  });
});
