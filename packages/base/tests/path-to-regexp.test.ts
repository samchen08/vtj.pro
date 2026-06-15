import { describe, it, expect } from 'vitest';
import {
  pathToRegexp,
  pathToRegexpMatch,
  pathToRegexpParse,
  pathToRegexpCompile
} from '../src';

describe('path-to-regexp 路径匹配工具', () => {
  it('pathToRegexp 应生成正则表达式', () => {
    const keys: any[] = [];
    const regexp = pathToRegexp('/user/:id', keys);
    expect(regexp).toBeInstanceOf(RegExp);
    expect(regexp.test('/user/123')).toBe(true);
    expect(regexp.test('/user/abc')).toBe(true);
    expect(regexp.test('/user/')).toBe(false);
  });

  it('pathToRegexp 应捕获路径参数', () => {
    const keys: any[] = [];
    pathToRegexp('/user/:id/post/:postId', keys);
    expect(keys.length).toBe(2);
    expect(keys[0].name).toBe('id');
    expect(keys[1].name).toBe('postId');
  });

  it('pathToRegexpMatch 应匹配路径', () => {
    const match = pathToRegexpMatch('/user/:id');
    const result = match('/user/42');
    expect(result).not.toBe(false);
    if (result) {
      expect((result.params as any).id).toBe('42');
    }
  });

  it('pathToRegexpMatch 应返回 false 当不匹配', () => {
    const match = pathToRegexpMatch('/user/:id');
    expect(match('/other')).toBe(false);
  });

  it('pathToRegexpParse 应解析路径模式', () => {
    const tokens = pathToRegexpParse('/user/:id');
    expect(Array.isArray(tokens)).toBe(true);
    expect(tokens.length).toBeGreaterThan(0);
  });

  it('pathToRegexpCompile 应编译路径模板', () => {
    const toPath = pathToRegexpCompile('/user/:id');
    expect(toPath({ id: 42 })).toBe('/user/42');
    expect(toPath({ id: 'abc' })).toBe('/user/abc');
  });

  it('pathToRegexpCompile 应处理可选参数', () => {
    const toPath = pathToRegexpCompile('/user/:id/:name?');
    expect(toPath({ id: 1 })).toBe('/user/1');
    expect(toPath({ id: 1, name: 'foo' })).toBe('/user/1/foo');
  });

  it('pathToRegexp 应处理完整URL路径', () => {
    const keys: any[] = [];
    const regexp = pathToRegexp('/api/v1/users/:userId/orders/:orderId', keys);
    expect(regexp.test('/api/v1/users/100/orders/200')).toBe(true);
    expect(keys.length).toBe(2);
    expect(keys[0].name).toBe('userId');
    expect(keys[1].name).toBe('orderId');
  });
});
