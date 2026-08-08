import { afterEach, describe, expect, it, vi } from 'vitest';
import { withRequestRetry } from '../src/components/widgets/agent/utils/request';

describe('withRequestRetry', () => {
  afterEach(() => vi.useRealTimers());

  it('retries transient failures up to success', async () => {
    vi.useFakeTimers();
    const request = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('network'))
      .mockRejectedValueOnce(Object.assign(new Error('busy'), { status: 503 }))
      .mockResolvedValue('ok');

    const result = withRequestRetry(request);
    await vi.runAllTimersAsync();

    await expect(result).resolves.toBe('ok');
    expect(request).toHaveBeenCalledTimes(3);
  });

  it('does not retry business errors or cancellation', async () => {
    const businessRequest = vi.fn(async () => {
      throw Object.assign(new Error('invalid'), { status: 400 });
    });
    const cancelRequest = vi.fn(async () => {
      throw Object.assign(new Error('canceled'), { name: 'AbortError' });
    });

    await expect(withRequestRetry(businessRequest)).rejects.toThrow('invalid');
    await expect(withRequestRetry(cancelRequest)).rejects.toThrow('canceled');
    expect(businessRequest).toHaveBeenCalledTimes(1);
    expect(cancelRequest).toHaveBeenCalledTimes(1);
  });
});
