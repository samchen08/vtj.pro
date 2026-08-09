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
) => Promise<(() => void) | undefined>;

/** SSE 空闲超时：连接存活但持续无数据则判定中断，避免 UI 无限等待 */
const IDLE_TIMEOUT_MS = 90 * 1000;

export function useSSEStream(chatCompletions: ChatCompletions) {
  let currentAbort: (() => void) | null = null;
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  function clearIdleTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function abortAll() {
    clearIdleTimer();
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
        clearIdleTimer();
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

      // 请求开始即启动空闲计时；每次收到数据块重置
      const startIdleTimer = () => {
        clearIdleTimer();
        idleTimer = setTimeout(() => {
          idleTimer = null;
          if (settled) return;
          settled = true;
          abortRequested = true;
          if (currentAbort === done) currentAbort = null;
          remoteAbort?.();
          console.warn('[useSSEStream]', 'SSE 流空闲超时', {
            topicId,
            chatId,
            idleSeconds: IDLE_TIMEOUT_MS / 1000
          });
          reject(
            new Error(
              `SSE 流长时间无数据（${IDLE_TIMEOUT_MS / 1000}s），连接可能已中断`
            )
          );
        }, IDLE_TIMEOUT_MS);
      };
      startIdleTimer();

      chatCompletions(
        topicId,
        chatId,
        (data, completed) => {
          if (completed) return finish();
          if (!data) return;
          startIdleTimer();
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
          clearIdleTimer();
          if (cancel) finish();
          else if (!settled) {
            settled = true;
            currentAbort = null;
            reject(error);
          }
        }
      )
        .then((abort) => {
          remoteAbort = abort ?? null;
          if (abortRequested) abort?.();
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
