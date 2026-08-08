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

  it('abortAll 在远端 abort 就绪前调用，就绪后补调', async () => {
    let resolveCompletions!: (abort: () => void) => void;
    const completions = vi.fn(
      () =>
        new Promise<() => void>((resolve) => {
          resolveCompletions = resolve;
        })
    );
    const { streamCompletion, abortAll } = useSSEStream(completions);
    const promise = streamCompletion('t', 'c');

    abortAll(); // remoteAbort 尚未就绪，先记录取消意图
    const abort = vi.fn();
    resolveCompletions(abort);

    const result = await promise;
    expect(result.done).toBeTypeOf('function');
    expect(abort).toHaveBeenCalled();
  });

  it('abortAll 在远端 abort 就绪后调用时立即取消', async () => {
    const abort = vi.fn();
    const completions = vi.fn(async (_t, _c, callback) => {
      callback?.({ choices: [{ delta: { content: '部分' } }] });
      return abort;
    });
    const chunks: string[] = [];
    const { streamCompletion, abortAll } = useSSEStream(completions);
    const promise = streamCompletion('t', 'c', (text) => chunks.push(text));

    await new Promise((r) => setTimeout(r, 0)); // 等待 remoteAbort 就绪
    abortAll();

    const result = await promise;
    expect(abort).toHaveBeenCalled();
    expect(chunks).toEqual(['部分']);
  });

  it('流正常结束后 abortAll 不再调用远端 abort', async () => {
    const abort = vi.fn();
    const completions = vi.fn(async (_t, _c, callback) => {
      callback?.(null, true);
      return abort;
    });
    const { streamCompletion, abortAll } = useSSEStream(completions);

    await streamCompletion('t', 'c');
    abortAll();

    expect(abort).not.toHaveBeenCalled();
  });

  it('错误回调：非取消错误 reject，取消错误按完成处理', async () => {
    const errorCompletions = vi.fn(async (_t, _c, _cb, error) => {
      error?.(new Error('boom'), false);
    });
    const { streamCompletion } = useSSEStream(errorCompletions);
    await expect(streamCompletion('t', 'c')).rejects.toThrow('boom');

    const cancelCompletions = vi.fn(async (_t, _c, _cb, error) => {
      error?.(new Error('cancel'), true);
    });
    const { streamCompletion: streamCancel } = useSSEStream(cancelCompletions);
    await expect(streamCancel('t', 'c')).resolves.toBeTruthy();
  });
});
