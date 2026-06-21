import { describe, it, expect, vi } from 'vitest';
import { mitt } from '../src';

describe('mitt 事件工具', () => {
  it('on 和 emit 应正确触发事件', () => {
    const emitter = mitt();
    const mock = vi.fn();
    emitter.on('test', mock);
    emitter.emit('test', 'data');
    expect(mock).toHaveBeenCalledWith('data');
  });

  it('off 应取消事件监听', () => {
    const emitter = mitt();
    const mock = vi.fn();
    emitter.on('test', mock);
    emitter.off('test', mock);
    emitter.emit('test', 'data');
    expect(mock).not.toHaveBeenCalled();
  });

  it('all 应清除所有事件监听', () => {
    const emitter = mitt();
    const mock1 = vi.fn();
    const mock2 = vi.fn();
    emitter.on('a', mock1);
    emitter.on('b', mock2);
    emitter.all.clear();
    emitter.emit('a', 'data');
    emitter.emit('b', 'data');
    expect(mock1).not.toHaveBeenCalled();
    expect(mock2).not.toHaveBeenCalled();
  });

  it('wildcard (*) 应匹配所有事件', () => {
    const emitter = mitt();
    const mock = vi.fn();
    emitter.on('*', mock);
    emitter.emit('event1', 'data1');
    emitter.emit('event2', 'data2');
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenNthCalledWith(1, 'event1', 'data1');
    expect(mock).toHaveBeenNthCalledWith(2, 'event2', 'data2');
  });

  it('多次 emit 应多次触发', () => {
    const emitter = mitt();
    const mock = vi.fn();
    emitter.on('test', mock);
    emitter.emit('test', 1);
    emitter.emit('test', 2);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenNthCalledWith(1, 1);
    expect(mock).toHaveBeenNthCalledWith(2, 2);
  });
});
