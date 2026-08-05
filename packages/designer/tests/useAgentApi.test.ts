import { describe, it, expect, vi } from 'vitest';
import { useAgentApi } from '../src/components/widgets/agent/composables/useAgentApi';
import type { AgentOpenApi } from '../src/components/widgets/agent/composables/useAgentApi';

function createOpenApi(overrides: Partial<AgentOpenApi> = {}): AgentOpenApi {
  return {
    postTopic: vi.fn(async () => ({ chat: { id: 'c1' } })),
    postChat: vi.fn(async () => ({ chat: { id: 'c2' } })),
    saveChat: vi.fn(async () => ({ code: 0, data: true })),
    getChats: vi.fn(async () => ({ code: 0, data: [] })),
    getTopics: vi.fn(async () => ({ code: 0, data: [] })),
    removeTopic: vi.fn(async () => ({ code: 0, data: true })),
    updateTopic: vi.fn(async () => ({ code: 0, data: true })),
    saveTrace: vi.fn(async () => ({ code: 0, data: true })),
    getSkills: vi.fn(async () => ({ code: 0, data: 'skills' })),
    getHotTopics: vi.fn(async () => ({ code: 0, data: [] })),
    recognitionFile: vi.fn(async () => ({ code: 0, data: { title: 't' } })),
    cancelChat: vi.fn(async () => ({})),
    ...overrides
  };
}

describe('useAgentApi', () => {
  it('postTopic/postChat 解包响应并追踪活动 chat', async () => {
    const openApi = createOpenApi();
    const api = useAgentApi(openApi);

    await api.postTopic({ prompt: 'p' } as any);
    expect(openApi.postTopic).toHaveBeenCalledOnce();

    await api.postChat({ prompt: 'p' } as any);
    expect(openApi.postChat).toHaveBeenCalledOnce();
  });

  it('cancelActiveChat 标记活动 chat 为 Canceled 并调用 cancelChat', async () => {
    const openApi = createOpenApi();
    const api = useAgentApi(openApi);

    const chat: any = { id: 'c1' };
    openApi.postTopic = vi.fn(async () => ({ chat }));
    await api.postTopic({ prompt: 'p' } as any);

    api.cancelActiveChat();
    expect(chat.status).toBe('Canceled');
    expect(openApi.cancelChat).toHaveBeenCalledWith(chat);
  });

  it('无活动 chat 时 cancelActiveChat 不调用 cancelChat', () => {
    const openApi = createOpenApi();
    const api = useAgentApi(openApi);
    api.cancelActiveChat();
    expect(openApi.cancelChat).not.toHaveBeenCalled();
  });

  it('clearActiveChat 清除追踪后不再取消', async () => {
    const openApi = createOpenApi();
    const api = useAgentApi(openApi);

    await api.postChat({ prompt: 'p' } as any);
    api.clearActiveChat();
    api.cancelActiveChat();
    expect(openApi.cancelChat).not.toHaveBeenCalled();
  });

  it('非零 code 响应抛错且不追踪活动 chat', async () => {
    const openApi = createOpenApi({
      postTopic: vi.fn(async () => ({ code: 500, message: 'boom' }))
    });
    const api = useAgentApi(openApi);

    await expect(api.postTopic({ prompt: 'p' } as any)).rejects.toThrow('boom');
    api.cancelActiveChat();
    expect(openApi.cancelChat).not.toHaveBeenCalled();
  });

  it('getTopics/getHotTopics/recognitionFile 返回解包数据', async () => {
    const openApi = createOpenApi();
    const api = useAgentApi(openApi);

    expect(await api.getTopics('p1')).toEqual([]);
    expect(await api.getHotTopics('web')).toEqual([]);
    expect(await api.recognitionFile(new File([], 'a.png'))).toEqual({
      title: 't'
    });
  });
});
