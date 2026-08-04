import { describe, expect, it, vi } from 'vitest';
import { useSSEStream } from '../src/components/widgets/agent/composables/useSSEStream';

describe('useSSEStream', () => {
  it('uses the injected OpenApi completions implementation', async () => {
    const abort = vi.fn();
    const completions = vi.fn(async (_topicId, _chatId, callback) => {
      callback?.({
        choices: [{ delta: { content: '完成', reasoning_content: '分析' } }],
        usage: { total_tokens: 3 },
        vtj: { model: 'custom-model' }
      });
      callback?.(null, true);
      return abort;
    });
    const chunks: string[] = [];
    const reasoning: string[] = [];
    const { streamCompletion } = useSSEStream(completions);

    const result = await streamCompletion(
      'topic',
      'chat',
      (text) => chunks.push(text),
      (text) => reasoning.push(text)
    );

    expect(completions).toHaveBeenCalledOnce();
    expect(chunks).toEqual(['完成']);
    expect(reasoning).toEqual(['分析']);
    expect(result.modelUsed).toBe('custom-model');
    expect(result.usage?.total_tokens).toBe(3);
    expect(abort).not.toHaveBeenCalled();
  });
});
