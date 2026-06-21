import { describe, it, expect, vi } from 'vitest';
import {
  proxyContext,
  getClassProperties,
  normalizedStyle,
  readJsonFile,
  upgradeVersion
} from '../src/utils';

describe('proxyContext', () => {
  it('returns a proxy with nested safe access when context is null', () => {
    const result = proxyContext(null);
    let value: any;
    try {
      value = result.context.foo.bar.baz;
    } catch (e) {
      value = 'threw';
    }
    expect(value).not.toBe('threw');
    expect(typeof value).toBe('object');
  });

  it('returns a proxy with nested safe access when context is provided', () => {
    const context = { a: { b: 1 } };
    const result = proxyContext(context);
    let value: any;
    try {
      value = result.context.x.y.z;
    } catch (e) {
      value = 'threw';
    }
    expect(value).not.toBe('threw');
    expect(typeof value).toBe('object');
  });

  it('handles symbol access on nested proxies', () => {
    const result = proxyContext({});
    const nested = result.context.foo;
    const fn = (nested as any)[Symbol.iterator];
    expect(typeof fn).toBe('function');
    expect(fn()).toBeUndefined();
  });
});

describe('getClassProperties', () => {
  it('returns own and prototype properties excluding constructor', () => {
    class Foo {
      public a = 1;
      public b() {}
    }
    const instance = new Foo();
    const props = getClassProperties(instance);
    expect(props).toContain('a');
    expect(props).toContain('b');
    expect(props).not.toContain('constructor');
  });

  it('handles plain objects with no prototype', () => {
    const obj = Object.create(null);
    obj.x = 1;
    const props = getClassProperties(obj);
    expect(props).toContain('x');
  });
});

describe('normalizedStyle', () => {
  it('converts camelCase keys to kebab-case', () => {
    const result = normalizedStyle({
      backgroundColor: 'red',
      fontSize: '14px'
    });
    expect(result).toEqual({ 'background-color': 'red', 'font-size': '14px' });
  });

  it('preserves keys starting with dash', () => {
    const result = normalizedStyle({
      '-webkit-transform': 'scale(1)',
      fontSize: '14px'
    });
    expect(result).toEqual({
      '-webkit-transform': 'scale(1)',
      'font-size': '14px'
    });
  });

  it('returns empty object when input is empty', () => {
    expect(normalizedStyle()).toEqual({});
    expect(normalizedStyle({})).toEqual({});
  });
});

describe('readJsonFile', () => {
  it('resolves parsed JSON on successful read', async () => {
    const data = { name: 'test' };
    const file = new File([JSON.stringify(data)], 'test.json', {
      type: 'application/json'
    });
    const result = await readJsonFile(file);
    expect(result).toEqual(data);
  });

  it('rejects when file content is not a string', async () => {
    const originalFileReader = globalThis.FileReader;
    globalThis.FileReader = class MockFileReader {
      onload: ((event: any) => void) | null = null;
      onerror: (() => void) | null = null;
      readAsText() {
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: null } });
          }
        }, 0);
      }
    } as any;

    const file = new File([], 'empty.json', { type: 'application/json' });
    await expect(readJsonFile(file)).rejects.toThrow('无法读取文件内容');

    globalThis.FileReader = originalFileReader;
  });

  it('rejects when JSON parsing fails', async () => {
    const file = new File(['not-json'], 'bad.json', {
      type: 'application/json'
    });
    await expect(readJsonFile(file)).rejects.toThrow('解析JSON失败');
  });
});

describe('upgradeVersion', () => {
  it('returns default version when no version provided', () => {
    expect(upgradeVersion('major')).toBe('0.1.0');
  });

  it('increments major and resets minor/patch', () => {
    expect(upgradeVersion('major', '1.2.3')).toBe('2.0.0');
  });

  it('increments minor and resets patch', () => {
    expect(upgradeVersion('minor', '1.2.3')).toBe('1.3.0');
  });

  it('increments patch only', () => {
    expect(upgradeVersion('patch', '1.2.3')).toBe('1.2.4');
  });

  it('throws on invalid version format', () => {
    expect(() => upgradeVersion('patch', '1.2')).toThrow(
      'Invalid version format'
    );
    expect(() => upgradeVersion('patch', 'a.b.c')).toThrow(
      'Invalid version format'
    );
  });

  it('throws on invalid version type', () => {
    expect(() => upgradeVersion('build' as any, '1.2.3')).toThrow(
      'Invalid version type'
    );
  });
});
