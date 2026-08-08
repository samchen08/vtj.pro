import { describe, expect, it, vi } from 'vitest';
import { useEditorStep } from '../src/components/widgets/agent/composables/useEditorStep';

describe('useEditorStep', () => {
  it('keeps old turns and increments attempt when retrying a step', async () => {
    const postChat = vi.fn(async (_body: any) => ({
      chat: { id: 'retry-chat' }
    }));
    const saveChat = vi.fn(async () => true);
    const retrySlot: any = {
      stepIdx: 0,
      step: { id: 'step', type: 'text', description: '重试步骤' },
      content: '旧输出',
      reasoning: '',
      error: '请求失败',
      done: true,
      turns: [{ turn: 0, type: 'unknown', content: '', reasoning: '' }]
    };
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        onChunk?.('重试成功');
        return {
          done: vi.fn(),
          reasoning: '',
          usage: null,
          modelUsed: '',
          reasoningTime: 0
        };
      }),
      getEngine: vi.fn(() => ({
        project: {
          value: {
            getPages: () => [{ name: 'home' }, { id: 'p2' }],
            apis: [{ name: 'getUser', url: '/api/user' }],
            blocks: [{ name: 'Header' }]
          }
        },
        toolRegistry: { get: vi.fn() }
      })),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    await executeEditorStep(
      'topic',
      'user',
      retrySlot.step,
      0,
      [retrySlot.step],
      Date.now(),
      [retrySlot],
      undefined,
      retrySlot
    );

    expect(postChat.mock.calls[0][0].attempt).toBe(2);
    // 步骤 prompt 注入实时项目结构摘要（缓解服务端 projectCache 快照过期）
    expect(postChat.mock.calls[0][0].prompt).toContain('当前项目结构');
    expect(postChat.mock.calls[0][0].prompt).toContain('页面: home, p2');
    expect(retrySlot.turns.map((item: any) => item.turn)).toEqual([0, 1]);
    expect(retrySlot.error).toBeNull();
    expect(retrySlot.done).toBe(true);
  });

  it('does not create requests or execute work after cancellation', async () => {
    const postChat = vi.fn();
    const saveChat = vi.fn();
    const updateTopic = vi.fn();
    const controller = new AbortController();
    controller.abort();
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic,
      streamCompletion: vi.fn(),
      getEngine: vi.fn(),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    const result = await executeEditorStep(
      'topic',
      'user',
      { id: 'step', type: 'text', description: '测试取消' },
      0,
      [],
      Date.now(),
      [],
      controller.signal
    );

    expect(postChat).not.toHaveBeenCalled();
    expect(saveChat).not.toHaveBeenCalled();
    expect(updateTopic).not.toHaveBeenCalled();
    expect(result.error).toBeNull();
  });

  it('writes DSL conversion errors back to the step slot', async () => {
    const postChat = vi.fn(async () => ({ chat: { id: 'chat' } }));
    const saveChat = vi.fn(async () => true);
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        onChunk?.('```vue\n<template><div>hi</div></template>\n```');
        return {
          done: vi.fn(),
          reasoning: '',
          usage: null,
          modelUsed: '',
          reasoningTime: 0
        };
      }),
      getEngine: vi.fn(
        () =>
          ({
            project: { value: { toDsl: () => ({}) } },
            current: { value: { toDsl: () => ({}) } },
            service: {
              parseVue: vi.fn(async () => {
                throw new Error('parse error detail');
              })
            },
            toolRegistry: { get: vi.fn() }
          }) as any
      ),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    const editorResults: any[] = [];
    const result = await executeEditorStep(
      'topic',
      'user',
      { id: 'step', type: 'vue_code', description: '生成代码' },
      0,
      [{ id: 'step', type: 'vue_code', description: '生成代码' }],
      Date.now(),
      editorResults
    );

    expect(result.error).toContain('Vue→DSL 失败');
    const slot = editorResults[0];
    expect(slot.error).toContain('Vue→DSL 失败');
    expect(slot.error).toContain('parse error detail');
    expect(slot.done).toBe(true);
  });

  it('does not parse a partial response after the stream is canceled', async () => {
    const controller = new AbortController();
    const postChat = vi.fn(async () => ({ id: 'chat' }));
    const saveChat = vi.fn(async () => true);
    const updateTopic = vi.fn(async () => ({}));
    const getEngine = vi.fn();
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic,
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        onChunk?.('```json\n{"action":"setDataSources","parameters":[]}\n```');
        controller.abort();
        return {
          done: vi.fn(),
          reasoning: '',
          usage: null,
          modelUsed: '',
          reasoningTime: 0
        };
      }),
      getEngine,
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    await executeEditorStep(
      'topic',
      'user',
      { id: 'step', type: 'tool_call', description: '测试中止' },
      0,
      [],
      Date.now(),
      [],
      controller.signal
    );

    // 项目上下文注入仅读取 engine 构建 prompt，取消后部分响应不解析/不保存
    expect(getEngine).toHaveBeenCalledTimes(1);
    expect(postChat).toHaveBeenCalledTimes(1);
    expect(saveChat).not.toHaveBeenCalled();
  });
});
