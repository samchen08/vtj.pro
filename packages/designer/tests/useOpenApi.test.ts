import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useEngine } = vi.hoisted(() => ({ useEngine: vi.fn() }));

vi.mock('../src/framework', () => ({ useEngine }));

import { useOpenApi } from '../src/components/hooks/useOpenApi';

describe('useOpenApi.chatCompletions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    useEngine.mockReturnValue({
      access: { getData: () => ({ token: 'token' }) },
      remote: 'https://vtj.test'
    });
  });

  it('收到 SSE 业务错误后立即中止请求', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        'data: {"error":"OpenAI API Error","message":"失败","statusCode":500}\n\n'
      )
    );
    const abort = vi.spyOn(AbortController.prototype, 'abort');
    const onError = vi.fn();

    await useOpenApi().chatCompletions('topic', 'chat', undefined, onError);

    await vi.waitFor(() => expect(onError).toHaveBeenCalledOnce());
    expect(abort).toHaveBeenCalledOnce();
  });

  it('HTTP 429 使用 Retry-After 展示独立的速率限制提示', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('{"message":"rate limited"}', {
        status: 429,
        headers: { 'Retry-After': '3' }
      })
    );
    const onError = vi.fn();

    await useOpenApi().chatCompletions('topic', 'chat', undefined, onError);

    await vi.waitFor(() => expect(onError).toHaveBeenCalledOnce());
    expect(onError.mock.calls[0][0]).toMatchObject({
      message: '模型服务繁忙（速率限制），请等待 3 秒后重试',
      status: 429,
      retryAfter: 3
    });
  });
});
