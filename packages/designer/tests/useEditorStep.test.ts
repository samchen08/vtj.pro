import { ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { useEditorStep } from '../src/components/widgets/agent/composables/useEditorStep';

describe('useEditorStep', () => {
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
      statusText: ref(''),
      statusType: ref('info'),
      requestApproval: vi.fn()
    });

    const result = await executeEditorStep(
      'topic',
      'user',
      { id: 'step', type: 'text', description: '测试取消' },
      0,
      [],
      Date.now(),
      ref([]),
      controller.signal
    );

    expect(postChat).not.toHaveBeenCalled();
    expect(saveChat).not.toHaveBeenCalled();
    expect(updateTopic).not.toHaveBeenCalled();
    expect(result.error).toBeNull();
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
      statusText: ref(''),
      statusType: ref('info'),
      requestApproval: vi.fn()
    });

    await executeEditorStep(
      'topic',
      'user',
      { id: 'step', type: 'tool_call', description: '测试中止' },
      0,
      [],
      Date.now(),
      ref([]),
      controller.signal
    );

    expect(getEngine).not.toHaveBeenCalled();
    // 流返回后立即检查取消信号，部分响应不再解析/保存
    expect(postChat).toHaveBeenCalledTimes(1);
    expect(saveChat).not.toHaveBeenCalled();
  });
});
