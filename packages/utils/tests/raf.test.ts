import { describe, it, expect, vi } from 'vitest';
import { rAF, cAF } from '../src';

describe('raf 工具', () => {
  it('rAF 应返回一个数字 ID', () => {
    const id = rAF(() => {});
    expect(typeof id).toBe('number');
  });

  it('cAF 应取消已注册的回调', () => {
    const mock = vi.fn();
    const id = rAF(mock);
    cAF(id);
    expect(mock).not.toHaveBeenCalled();
  });

  it('rAF 传入的回调应被执行', () => {
    return new Promise<void>((done) => {
      const mock = vi.fn(() => {
        expect(mock).toHaveBeenCalled();
        done();
      });
      rAF(mock);
    });
  });
});
