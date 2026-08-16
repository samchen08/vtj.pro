import { describe, expect, it, vi } from 'vitest';
import { useEditorStep } from '../src/components/widgets/agent/composables/useEditorStep';

describe('useEditorStep', () => {
  it('directly executes a validated high-frequency tool without SSE', async () => {
    const postChat = vi.fn(async () => ({ chat: { id: 'direct-chat' } }));
    const saveChat = vi.fn(async () => true);
    const execute = vi.fn(async () => true);
    const streamCompletion = vi.fn();
    const engine = {
      project: {
        value: {
          getPages: () => [],
          apis: [],
          blocks: []
        }
      },
      toolRegistry: {
        get: vi.fn(() => ({ parameters: [] })),
        execute
      }
    } as any;
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion,
      getEngine: vi.fn(() => engine),
      getToolDirectMode: () => 'on',
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });
    const step = {
      id: 'step_1',
      type: 'tool_call' as const,
      description: '刷新预览',
      toolName: 'refresh'
    };

    const result = await executeEditorStep(
      'topic',
      'user',
      step,
      0,
      [step],
      Date.now(),
      []
    );

    expect(streamCompletion).not.toHaveBeenCalled();
    expect(execute).toHaveBeenCalledWith('refresh', []);
    expect(postChat.mock.calls[0][0].stepMeta.parameters).toEqual([]);
    expect(result.tokens).toBe(0);
    expect(result.error).toBeNull();
  });

  it('binds active id from its completed create dependency', async () => {
    const postChat = vi.fn(async () => ({ chat: { id: 'active-chat' } }));
    const execute = vi.fn(async () => true);
    const streamCompletion = vi.fn();
    const engine = {
      project: {
        value: {
          getPages: () => [],
          getFile: (id: string) => (id === 'block-1' ? { id } : null),
          apis: [],
          blocks: []
        }
      },
      toolRegistry: {
        get: vi.fn(() => ({
          parameters: [{ name: 'id', type: 'string', required: true }]
        })),
        execute
      }
    } as any;
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat: vi.fn(async () => true),
      updateTopic: vi.fn(async () => ({})),
      streamCompletion,
      getEngine: vi.fn(() => engine),
      getToolDirectMode: () => 'on',
      setStatus: vi.fn(),
      requestApproval: vi.fn(async () => true)
    });
    const created = {
      step: { id: 'create', type: 'tool_call', description: '' },
      done: true,
      error: null,
      turns: [
        {
          toolAction: 'createBlock',
          toolResult: { success: true, result: { id: 'block-1' } }
        }
      ]
    } as any;
    const step = {
      id: 'active',
      type: 'tool_call' as const,
      description: '激活新建区块',
      toolName: 'active',
      dependsOn: ['create']
    };

    await executeEditorStep(
      'topic',
      'user',
      step,
      1,
      [created.step, step],
      Date.now(),
      [created]
    );

    expect(streamCompletion).not.toHaveBeenCalled();
    expect(execute).toHaveBeenCalledWith('active', ['block-1']);
    expect(postChat.mock.calls[0][0].stepMeta.parameters).toEqual(['block-1']);
  });

  it('does not ask the LLM to repeat a failed write tool', async () => {
    const streamCompletion = vi.fn();
    const execute = vi.fn(async () => {
      throw new Error('write failed');
    });
    const { executeEditorStep } = useEditorStep({
      postChat: vi.fn(async () => ({ chat: { id: 'write-chat' } })),
      saveChat: vi.fn(async () => true),
      updateTopic: vi.fn(async () => ({})),
      streamCompletion,
      getEngine: vi.fn(
        () =>
          ({
            project: { value: { getPages: () => [], apis: [], blocks: [] } },
            toolRegistry: {
              get: vi.fn(() => ({
                risk: 'write',
                parameters: [{ name: 'value', type: 'string', required: true }]
              })),
              execute
            }
          }) as any
      ),
      getToolDirectMode: () => 'on',
      setStatus: vi.fn(),
      requestApproval: vi.fn(async () => true)
    });
    const step = {
      id: 'write',
      type: 'tool_call' as const,
      description: '写入配置',
      toolName: 'setCustom',
      parameters: ['value']
    };

    const result = await executeEditorStep(
      'topic',
      'user',
      step,
      0,
      [step],
      Date.now(),
      []
    );

    expect(result.error).toBe('write failed');
    expect(streamCompletion).not.toHaveBeenCalled();
  });

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
      getEngine: vi.fn(
        () =>
          ({
            project: {
              value: {
                getPages: () => [{ id: 'p1', name: 'home' }, { id: 'p2' }],
                apis: [{ name: 'getUser', url: '/api/user' }],
                blocks: [{ id: 'b1', name: 'Header' }]
              }
            },
            toolRegistry: { get: vi.fn() }
          }) as any
      ),
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
    expect(postChat.mock.calls[0][0].prompt).toContain('页面: home(p1), p2');
    expect(postChat.mock.calls[0][0].prompt).toContain('区块: Header(b1)');
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

  it('executes a tool_call with missing parameters (tolerant parsing)', async () => {
    const postChat = vi.fn(async (_body: any) => ({ chat: { id: 'chat' } }));
    const saveChat = vi.fn(async (_body: any) => true);
    const execute = vi.fn(async () => 'file content');
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        onChunk?.('```json\n{"action":"getCurrentFileContent"}\n```');
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
            project: { value: {} },
            current: { value: { id: 'p1' } },
            service: {},
            toolRegistry: { get: vi.fn(), execute }
          }) as any
      ),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    const editorResults: any[] = [];
    const step = {
      id: 'step_4',
      type: 'tool_call' as const,
      description: '获取当前页面最新源码',
      toolName: 'getCurrentFileContent'
    };
    const result = await executeEditorStep(
      'topic',
      'user',
      step,
      0,
      [step],
      Date.now(),
      editorResults
    );

    expect(result.error).toBeNull();
    // 缺省 parameters 容错为空数组后正常执行工具
    expect(execute).toHaveBeenCalledWith('getCurrentFileContent', []);
    const slot = editorResults[0];
    expect(slot.error).toBeNull();
    expect(slot.done).toBe(true);
  });

  it('feeds back unrecognized tool_call output for retry', async () => {
    const postChat = vi.fn(async (_body: any) => ({
      chat: { id: `chat-${postChat.mock.calls.length}` }
    }));
    const saveChat = vi.fn(async (_body: any) => true);
    const execute = vi.fn(async () => 'file content');
    let streamCount = 0;
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        streamCount++;
        onChunk?.(
          streamCount === 1
            ? '这不是工具调用'
            : '{"action":"getCurrentFileContent","parameters":[]}'
        );
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
            project: { value: {} },
            current: { value: { id: 'p1' } },
            service: {},
            toolRegistry: { get: vi.fn(), execute }
          }) as any
      ),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    const editorResults: any[] = [];
    const step = {
      id: 'step_4',
      type: 'tool_call' as const,
      description: '获取当前页面最新源码',
      toolName: 'getCurrentFileContent'
    };
    const result = await executeEditorStep(
      'topic',
      'user',
      step,
      0,
      [step],
      Date.now(),
      editorResults
    );

    // 格式错误反馈重试后第二轮成功执行
    expect(postChat).toHaveBeenCalledTimes(2);
    expect(execute).toHaveBeenCalledTimes(1);
    expect(result.error).toBeNull();
    const slot = editorResults[0];
    expect(slot.done).toBe(true);
    expect(slot.turns.map((t: any) => t.type)).toEqual(['text', 'tool_call']);
    // 重试提示包含格式纠正要求
    expect(postChat.mock.calls[1][0].prompt).toContain('输出格式无法识别');
    expect(postChat.mock.calls[1][0].prompt).toContain('parameters 必须为数组');
  });

  it('writes unrecognized output error back to the slot for non-tool_call steps', async () => {
    const postChat = vi.fn(async (_body: any) => ({ chat: { id: 'chat' } }));
    const saveChat = vi.fn(async (_body: any) => true);
    const { executeEditorStep } = useEditorStep({
      postChat,
      saveChat,
      updateTopic: vi.fn(async () => ({})),
      streamCompletion: vi.fn(async (_topic, _chat, onChunk) => {
        onChunk?.('```json\n{"foo":"bar"}\n```');
        return {
          done: vi.fn(),
          reasoning: '',
          usage: null,
          modelUsed: '',
          reasoningTime: 0
        };
      }),
      getEngine: vi.fn(),
      setStatus: vi.fn(),
      requestApproval: vi.fn()
    });

    const editorResults: any[] = [];
    const step = { id: 'step', type: 'text' as const, description: '文本步骤' };
    const result = await executeEditorStep(
      'topic',
      'user',
      step,
      0,
      [step],
      Date.now(),
      editorResults
    );

    expect(result.error).toContain('JSON 格式不符合 tool_call 规范');
    const slot = editorResults[0];
    // 槽位错误与返回值一致，导出/trace 不再误记为完成
    expect(slot.error).toBe(result.error);
    expect(slot.done).toBe(true);
    // 失败轮次落库为 Error 状态（status 封装在保存 body 中）
    expect((saveChat.mock.calls[0][0] as any).status).toBe('Error');
  });
});
