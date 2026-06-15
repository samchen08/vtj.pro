import { describe, it, expect, vi } from 'vitest';
import { Queue } from '../src';

describe('Queue 队列工具', () => {
  it('add 应顺序执行任务', async () => {
    const queue = new Queue();
    const order: number[] = [];

    await Promise.all([
      queue.add('task1', async () => {
        order.push(1);
        return 'a';
      }),
      queue.add('task2', async () => {
        order.push(2);
        return 'b';
      }),
      queue.add('task3', async () => {
        order.push(3);
        return 'c';
      })
    ]);

    expect(order).toEqual([1, 2, 3]);
  });

  it('add 应返回任务结果', async () => {
    const queue = new Queue();
    const result = await queue.add('test', async () => 'success');
    expect(result).toBe('success');
  });

  it('add 应缓存相同key的任务结果', async () => {
    const queue = new Queue();
    const mock = vi.fn().mockResolvedValue('cached');

    const result1 = await queue.add('key', mock);
    const result2 = await queue.add('key', mock);

    expect(result1).toBe('cached');
    expect(result2).toBe('cached');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('add 应去重并发的相同key任务', async () => {
    const queue = new Queue();
    const mock = vi.fn().mockResolvedValue('deduped');

    const [result1, result2] = await Promise.all([
      queue.add('key', mock),
      queue.add('key', mock)
    ]);

    expect(result1).toBe('deduped');
    expect(result2).toBe('deduped');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('add 应缓存失败的任务结果', async () => {
    const queue = new Queue();
    const mock = vi.fn().mockRejectedValue(new Error('fail'));

    await expect(queue.add('errKey', mock)).rejects.toThrow('fail');
    await expect(queue.add('errKey', mock)).rejects.toThrow('fail');
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('getAllResults 应返回所有结果', async () => {
    const queue = new Queue();

    await queue.add('a', async () => 'x');
    await queue.add('b', async () => 'y');

    const results = queue.getAllResults();
    expect(results).toHaveLength(2);
    expect(results[0].key).toBe('a');
    expect(results[0].status).toBe('fulfilled');
    expect(results[0].value).toBe('x');
    expect(results[1].key).toBe('b');
    expect(results[1].status).toBe('fulfilled');
    expect(results[1].value).toBe('y');
  });

  it('getAllResults 应包含失败结果', async () => {
    const queue = new Queue();

    await queue.add('a', async () => 'ok').catch(() => {});
    await queue
      .add('b', async () => {
        throw new Error('fail');
      })
      .catch(() => {});

    const results = queue.getAllResults();
    expect(results).toHaveLength(2);
    expect(results[0].status).toBe('fulfilled');
    expect(results[1].status).toBe('rejected');
  });

  it('getResult 应返回特定任务结果', async () => {
    const queue = new Queue();
    await queue.add('key', async () => 'value');

    const result = queue.getResult('key');
    expect(result).toBeDefined();
    expect(result!.status).toBe('fulfilled');
    expect(result!.value).toBe('value');
  });

  it('getResult 应返回undefined当key不存在', () => {
    const queue = new Queue();
    expect(queue.getResult('nonexistent')).toBeUndefined();
  });

  it('clearCacheForKey 应清除特定缓存', async () => {
    const queue = new Queue();
    const mock = vi.fn().mockResolvedValue('fresh');

    await queue.add('key', mock);
    queue.clearCacheForKey('key');
    await queue.add('key', mock);

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('clearAllCache 应清除所有缓存', async () => {
    const queue = new Queue();
    const mock = vi.fn().mockResolvedValue('fresh');

    await queue.add('a', mock);
    await queue.add('b', mock);
    expect(mock).toHaveBeenCalledTimes(2);

    queue.clearAllCache();

    await queue.add('a', mock);
    await queue.add('b', mock);
    expect(mock).toHaveBeenCalledTimes(4);
  });

  it('add 应使用symbol作为key', async () => {
    const queue = new Queue();
    const sym = Symbol('test');

    const result = await queue.add(sym, async () => 'symbolic');
    expect(result).toBe('symbolic');

    const cachedResult = queue.getResult(sym);
    expect(cachedResult!.value).toBe('symbolic');
  });

  it('getAllResults 返回的是副本', async () => {
    const queue = new Queue();
    await queue.add('key', async () => 'val');

    const results = queue.getAllResults();
    expect(results).toHaveLength(1);

    // 修改副本不应影响内部
    (results as any).push('modified');
    expect(queue.getAllResults()).toHaveLength(1);
  });
});
