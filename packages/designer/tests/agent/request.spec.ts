import { describe, it, expect, vi, afterEach } from 'vitest';
import { withRequestRetry } from '../../src/components/widgets/agent/utils/request';

function apiError(status?: number, name = 'Error') {
  const err = new Error(`HTTP ${status}`) as Error & { status?: number };
  err.name = name;
  if (status !== undefined) err.status = status;
  return err;
}

afterEach(() => {
  vi.useRealTimers();
});

describe('withRequestRetry', () => {
  it('首次成功直接返回', async () => {
    await expect(withRequestRetry(() => Promise.resolve('ok'))).resolves.toBe(
      'ok'
    );
  });

  it('可重试错误（5xx）重试后成功', async () => {
    vi.useFakeTimers();
    let calls = 0;
    const request = vi.fn(() => {
      calls++;
      return calls < 3 ? Promise.reject(apiError(500)) : Promise.resolve('ok');
    });
    const pending = withRequestRetry(request);
    // 重试延迟含 Math.random()*200 抖动（800~1000 + 2000~2200），需充足推进时间
    await vi.advanceTimersByTimeAsync(5000);
    await expect(pending).resolves.toBe('ok');
    expect(request).toHaveBeenCalledTimes(3);
  });

  it('AbortError 不重试直接抛出', async () => {
    const request = vi.fn(() => Promise.reject(apiError(0, 'AbortError')));
    await expect(withRequestRetry(request)).rejects.toThrow('HTTP');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('非重试错误（4xx）直接抛出', async () => {
    const request = vi.fn(() => Promise.reject(apiError(400)));
    await expect(withRequestRetry(request)).rejects.toThrow('HTTP 400');
    expect(request).toHaveBeenCalledTimes(1);
  });

  it('重试次数耗尽后抛出最终错误', async () => {
    vi.useFakeTimers();
    const request = vi.fn(() => Promise.reject(apiError(500)));
    const pending = withRequestRetry(request);
    // 先挂接断言，避免定时器推进触发 reject 时产生 unhandled rejection
    const assertion = expect(pending).rejects.toThrow('HTTP 500');
    await vi.advanceTimersByTimeAsync(5000);
    await assertion;
    expect(request).toHaveBeenCalledTimes(3);
  });
});
