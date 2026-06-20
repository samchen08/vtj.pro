import { describe, it, expect } from 'vitest';
import * as url from '../src/url';

describe('url 工具函数', () => {
  describe('getHost', () => {
    it('应提取 http URL 的 host', () => {
      expect(url.getHost('http://example.com/path')).toBe('http://example.com');
    });

    it('应提取 https URL 的 host', () => {
      expect(url.getHost('https://www.example.com:8080/path')).toBe(
        'https://www.example.com:8080'
      );
    });

    it('应返回空字符串当 URL 无效', () => {
      expect(url.getHost('not-a-url')).toBe('');
      expect(url.getHost('')).toBe('');
    });
  });

  describe('stringify', () => {
    it('应将对象转为查询字符串', () => {
      expect(url.stringify({ a: 1, b: 2 })).toBe('a=1&b=2');
    });

    it('应对值进行 URL 编码', () => {
      expect(url.stringify({ name: 'hello world' })).toBe('name=hello%20world');
    });

    it('应处理空对象', () => {
      expect(url.stringify({})).toBe('');
    });
  });

  describe('parse', () => {
    it('应解析查询字符串为对象', () => {
      expect(url.parse('a=1&b=2')).toEqual({ a: '1', b: '2' });
    });

    it('应处理 URL 编码', () => {
      expect(url.parse('name=hello%20world')).toEqual({ name: 'hello world' });
    });

    it('应处理空字符串', () => {
      expect(url.parse('')).toEqual({});
    });

    it('应处理带 ? 前缀的查询', () => {
      expect(url.parse('?a=1&b=2')).toEqual({ a: '1', b: '2' });
    });
  });

  describe('append', () => {
    it('应追加查询参数到 URL', () => {
      expect(url.append('http://example.com', { a: 1 })).toBe(
        'http://example.com?a=1'
      );
    });

    it('应合并已有查询参数', () => {
      expect(url.append('http://example.com?x=1', { y: 2 })).toBe(
        'http://example.com?x=1&y=2'
      );
    });

    it('已有参数应被新参数覆盖', () => {
      expect(url.append('http://example.com?a=1', { a: 2 })).toBe(
        'http://example.com?a=2'
      );
    });

    it('应处理字符串查询参数', () => {
      expect(url.append('http://example.com', 'b=2')).toBe(
        'http://example.com?b=2'
      );
    });

    it('空参数应返回原始 URL', () => {
      expect(url.append('http://example.com', {})).toBe('http://example.com');
    });
  });
});
