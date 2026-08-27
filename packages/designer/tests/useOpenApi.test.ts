import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useEngine, jsonp } = vi.hoisted(() => ({
  useEngine: vi.fn(),
  jsonp: vi.fn()
}));

vi.mock('../src/framework', () => ({ useEngine }));
vi.mock('@vtj/utils', async (importOriginal) => ({
  ...(await importOriginal()),
  jsonp
}));

import { useOpenApi } from '../src/components/hooks/useOpenApi';

describe('useOpenApi.chatCompletions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    jsonp.mockReset();
    useEngine.mockReturnValue({
      access: { getData: () => ({ token: 'token' }) },
      remote: 'https://vtj.test'
    });
  });

  it('新签名登录请求失败时回退旧后端 JSONP', async () => {
    const login = vi.fn();
    useEngine.mockReturnValue({
      options: { auth: 'sign' },
      access: { login },
      remote: 'https://vtj.test'
    });
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('cors'));
    jsonp.mockResolvedValue(['legacy-login-data']);

    await useOpenApi().loginBySign();

    expect(jsonp).toHaveBeenCalledWith('https://vtj.test/api/open/auth/sign');
    expect(login).toHaveBeenCalledWith(['legacy-login-data']);
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

  it('Token 即将过期时先刷新再创建流式请求', async () => {
    let data = { token: 'old-token', expiresAt: Date.now() - 1 };
    const access = {
      getData: () => data,
      getToken: () => data.token,
      login: vi.fn((value) => (data = value))
    };
    useEngine.mockReturnValue({
      access,
      remote: 'https://vtj.test'
    });
    const fetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: { token: 'new-token', expiresAt: Date.now() + 3600000 }
          })
        )
      )
      .mockResolvedValueOnce(new Response(''));

    await useOpenApi().chatCompletions('topic', 'chat');
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(fetch.mock.calls[0]).toEqual([
      'https://vtj.test/api/users/refresh',
      { method: 'post', credentials: 'include' }
    ]);
    expect(fetch.mock.calls[1][0]).toContain('/completions/new-token');
  });

  it('流式请求收到 401 后刷新并用新 Token 重连一次', async () => {
    let data = { token: 'old-token', expiresAt: Date.now() + 3600000 };
    const access = {
      getData: () => data,
      getToken: () => data.token,
      login: vi.fn((value) => (data = value))
    };
    useEngine.mockReturnValue({
      access,
      remote: 'https://vtj.test'
    });
    const fetch = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('', { status: 401 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: { token: 'new-token', expiresAt: Date.now() + 3600000 }
          })
        )
      )
      .mockResolvedValueOnce(new Response(''));

    await useOpenApi().chatCompletions('topic', 'chat');
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));

    expect(fetch.mock.calls[0][0]).toContain('/completions/old-token');
    expect(fetch.mock.calls[1][0]).toBe('https://vtj.test/api/users/refresh');
    expect(fetch.mock.calls[2][0]).toContain('/completions/new-token');
  });

  it('汇总当前文件、其他文件和物料后发布云端', async () => {
    const getFile = vi.fn().mockResolvedValue({ id: 'block-1' });
    useEngine.mockReturnValue({
      access: { getData: () => ({ token: 'token' }) },
      remote: 'https://vtj.test',
      project: {
        value: {
          id: 'app-1',
          currentFile: { id: 'page-1' },
          blocks: [
            { id: 'block-1', fromType: 'Schema' },
            { id: 'preset-1', preset: true }
          ],
          toDsl: () => ({
            id: 'app-1',
            platform: 'web',
            __VTJ_PROJECT__: true
          }),
          getPages: () => [{ id: 'page-1', name: 'Home' }]
        }
      },
      current: { value: { toDsl: () => ({ id: 'page-1' }) } },
      service: { getFile },
      assets: {
        componentMap: new Map([['ElButton', { name: 'ElButton' }]])
      }
    });
    const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          data: {
            app: 'app-1',
            projectCount: 1,
            materialCount: 1,
            fileCount: 2
          }
        })
      )
    );

    await expect(useOpenApi().publishCloudProject()).resolves.toMatchObject({
      app: 'app-1',
      fileCount: 2
    });

    expect(getFile).toHaveBeenCalledWith(
      'block-1',
      expect.objectContaining({ id: 'app-1' })
    );
    expect(fetch.mock.calls[0][0]).toBe(
      'https://vtj.test/api/open/project/dev/publish/token'
    );
    const body = JSON.parse(
      (fetch.mock.calls[0][1] as RequestInit).body as string
    );
    expect(body.files).toEqual([{ id: 'page-1' }, { id: 'block-1' }]);
    expect(body.materials).toEqual({ ElButton: { name: 'ElButton' } });
  });
});
