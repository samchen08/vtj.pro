import { ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { useEditorStep } from '../src/components/widgets/agent/composables/useEditorStep';

describe('useEditorStep', () => {
  it('does not create requests or execute work after cancellation', async () => {
    const apiPost = vi.fn();
    const controller = new AbortController();
    controller.abort();
    const { executeEditorStep } = useEditorStep({
      apiPost,
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

    expect(apiPost).not.toHaveBeenCalled();
    expect(result.error).toBeNull();
  });

  it('does not parse a partial response after the stream is canceled', async () => {
    const controller = new AbortController();
    const apiPost = vi
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce({ id: 'chat' });
    const getEngine = vi.fn();
    const { executeEditorStep } = useEditorStep({
      apiPost,
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
    expect(apiPost).toHaveBeenCalledTimes(2);
  });
});
