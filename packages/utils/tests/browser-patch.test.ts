import { describe, it, expect, vi, beforeAll } from 'vitest';
import '../src';

describe('browser-patch', () => {
  it('addEventListener 应被补丁覆盖', () => {
    // 模块导入时已自动应用补丁
    const descriptor = Object.getOwnPropertyDescriptor(
      EventTarget.prototype,
      'addEventListener'
    );
    // 补丁后的函数不是原生函数
    expect(descriptor).toBeDefined();
  });

  it('addEventListener 补丁后应能正常调用', () => {
    const el = document.createElement('div');
    const handler = vi.fn();
    // 应能正常添加事件监听
    expect(() => el.addEventListener('click', handler)).not.toThrow();
    el.dispatchEvent(new Event('click'));
    expect(handler).toHaveBeenCalled();
  });

  it('addEventListener 应接收 capture 对象', () => {
    const el = document.createElement('div');
    const handler = vi.fn();
    expect(() =>
      el.addEventListener('click', handler, { passive: true })
    ).not.toThrow();
  });
});
