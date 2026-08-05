/**
 * SSE 流式通信 composable
 * 管理与 LLM 的 SSE 流式连接，提供 chunk 回调、abort 控制
 */
import type { SSEChunkData, StreamCompletionResult } from '../types/agent';

type ChatCompletions = (
  topicId: string,
  chatId: string,
  callback?: (data: SSEChunkData | null, done?: boolean) => void,
  error?: (error: Error, cancel?: boolean) => void
) => Promise<() => void>;

export function useSSEStream(chatCompletions: ChatCompletions) {
  let currentAbort: (() => void) | null = null;

  function abortAll() {
    if (currentAbort) {
      currentAbort();
      currentAbort = null;
    }
  }

  /**
   * 发起 SSE 流式请求
   */
  function streamCompletion(
    topicId: string,
    chatId: string,
    onChunk?: (text: string) => void,
    onReasoning?: (text: string) => void
  ): Promise<StreamCompletionResult> {
    return new Promise((resolve, reject) => {
      let reasoningAcc = '';
      let usageAcc: StreamCompletionResult['usage'] = null;
      let modelAcc = '';
      let reasoningStartTime = 0;
      let reasoningEndTime = 0;
      let remoteAbort: (() => void) | null = null;
      let settled = false;
      let abortRequested = false;

      const finish = () => {
        if (settled) return;
        settled = true;
        if (currentAbort === done) currentAbort = null;
        resolve({
          done,
          reasoning: reasoningAcc,
          usage: usageAcc,
          modelUsed: modelAcc,
          reasoningTime: reasoningStartTime
            ? reasoningEndTime - reasoningStartTime
            : 0
        });
      };
      const done = () => {
        abortRequested = true;
        remoteAbort?.();
        finish();
      };
      currentAbort = done;

      chatCompletions(
        topicId,
        chatId,
        (data, completed) => {
          if (completed) return finish();
          if (!data) return;
          modelAcc = data.vtj?.model || data.model || modelAcc;
          if (data.usage) usageAcc = data.usage;
          const delta = data.choices?.[0]?.delta;
          const reasoning = delta?.reasoning_content;
          if (reasoning) {
            if (!reasoningStartTime) reasoningStartTime = Date.now();
            reasoningEndTime = Date.now();
            reasoningAcc += reasoning;
            onReasoning?.(reasoning);
          }
          if (delta?.content) onChunk?.(delta.content);
        },
        (error, cancel) => {
          if (cancel) finish();
          else if (!settled) {
            settled = true;
            currentAbort = null;
            reject(error);
          }
        }
      )
        .then((abort) => {
          remoteAbort = abort;
          if (abortRequested) abort();
        })
        .catch((error) => {
          if (!settled) reject(error);
        });
    });
  }

  return {
    streamCompletion,
    abortAll
  };
}
