import { describe, expect, test, vi } from 'vitest';
import { useListeners } from '../src';

describe('useListeners', () => {
  test('从 attrs 中提取 onXxx 格式的事件监听器', () => {
    const fn = vi.fn();
    const attrs = {
      onClick: fn,
      'on-custom-event': vi.fn(),
      title: 'hello',
      disabled: true
    };
    const listeners = useListeners(attrs);
    expect(listeners.click).toBe(fn);
    expect(listeners.customEvent).toBeTypeOf('function');
    expect(listeners.customEvent).not.toBe(fn);
    expect(Object.keys(listeners)).toEqual(['click', 'customEvent']);
  });

  test('非 on* 开头的属性会被忽略', () => {
    const attrs = {
      title: 'hello',
      'data-id': '123',
      class: 'foo'
    };
    const listeners = useListeners(attrs);
    expect(Object.keys(listeners)).toEqual([]);
  });

  test('on* 开头但值不是函数的属性会被忽略', () => {
    const fn = vi.fn();
    const attrs = {
      onClick: 'not-a-function',
      onMounted: 123,
      onChange: fn
    };
    const listeners = useListeners(attrs);
    expect(Object.keys(listeners)).toEqual(['change']);
    expect(listeners.change).toBe(fn);
  });

  test('空的 attrs 返回空对象', () => {
    const listeners = useListeners({});
    expect(Object.keys(listeners)).toEqual([]);
  });
});
