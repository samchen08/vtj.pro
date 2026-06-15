import { describe, expect, test } from 'vitest';
import { version, camelCase } from '../src';

describe('exports', () => {
  test('version 是字符串', () => {
    expect(typeof version).toBe('string');
  });

  test('camelCase 被重新导出且可用', () => {
    expect(camelCase('hello-world')).toBe('helloWorld');
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz');
    expect(typeof camelCase).toBe('function');
  });
});
