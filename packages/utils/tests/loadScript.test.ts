import { describe, it, expect, vi } from 'vitest';
import { loadScript } from '../src';

vi.mock('load-script', () => {
  const mockFn = (
    src: string,
    opts: any,
    cb: (err: Error | null, script?: HTMLScriptElement) => void
  ) => {
    cb(null, document.createElement('script'));
  };
  return { default: vi.fn(mockFn) };
});

describe('loadScript 工具', () => {
  it('应成功加载脚本', async () => {
    const result = await loadScript('https://example.com/test.js');
    expect(result).toBeUndefined();
  });

  it('应支持 library 参数返回全局变量', async () => {
    (window as any).MyLib = { version: '1.0' };
    const result = await loadScript('https://example.com/lib.js', {
      library: 'MyLib'
    });
    expect(result).toEqual({ version: '1.0' });
  });

  it('应处理加载失败', async () => {
    const loadModule = await import('load-script');
    (loadModule.default as any).mockImplementationOnce(
      (src: string, opts: any, cb: (err: Error | null) => void) => {
        cb(new Error('load failed'));
      }
    );

    await expect(loadScript('https://example.com/fail.js')).rejects.toThrow(
      'load failed'
    );
  });

  it('应支持 async 选项', async () => {
    const loadModule = await import('load-script');
    (loadModule.default as any).mockImplementationOnce(
      (
        src: string,
        opts: any,
        cb: (err: Error | null, script?: HTMLScriptElement) => void
      ) => {
        cb(null, document.createElement('script'));
      }
    );

    const result = await loadScript('https://example.com/async.js', {
      async: true
    });
    expect(result).toBeUndefined();
  });
});
