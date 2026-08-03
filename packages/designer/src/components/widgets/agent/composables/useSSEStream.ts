/**
 * SSE 流式通信 composable
 * 管理与 LLM 的 SSE 流式连接，提供 chunk 回调、abort 控制
 */
import type { SSEChunkData, StreamCompletionResult } from '../types/agent';

export function useSSEStream(token: () => string, remote: () => string) {
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
      const t = token();
      const url = `${remote().replace(/\/$/, '')}/api/open/completions/${t}?tid=${topicId}&id=${chatId}`;
      const controller = new AbortController();
      let buffer = '';
      let reasoningAcc = '';
      let usageAcc: StreamCompletionResult['usage'] = null;
      let modelAcc = '';
      let reasoningStartTime = 0;
      let reasoningEndTime = 0;

      const done = () => controller.abort();

      function processLine(line: string) {
        if (!line.startsWith('data: ')) return;
        const content = line.slice(6).trim();
        if (!content) return;
        if (content === '[DONE]') return;

        try {
          const data: SSEChunkData = JSON.parse(content);

          // 捕获 vtj.init 中的模型信息
          if (data.vtj?.model) {
            modelAcc = data.vtj.model;
          }

          const delta = data.choices?.[0]?.delta;
          const text = delta?.content;
          const reasoning = delta?.reasoning_content;

          // 收集 reasoning
          if (reasoning) {
            if (!reasoningStartTime) reasoningStartTime = Date.now();
            reasoningEndTime = Date.now();
            reasoningAcc += reasoning;
            if (onReasoning) onReasoning(reasoning);
          }

          // 收集 token usage（最后一个 chunk 会包含 usage）
          if (data.usage) {
            usageAcc = data.usage;
          }

          // 收集 content 用于展示
          if (!text) return;

          // 流式回调
          if (onChunk) onChunk(text);
        } catch {
          // 解析失败静默跳过
        }
      }

      fetch(url, { method: 'GET', signal: controller.signal })
        .then(async (res) => {
          if (!res.ok) {
            const errText = await res.text();
            return reject(new Error(`SSE HTTP ${res.status}: ${errText}`));
          }
          const reader = res.body?.getReader();
          if (!reader) return reject(new Error('No reader'));

          try {
            while (true) {
              const { done: streamDone, value } = await reader.read();
              if (streamDone) {
                if (buffer) processLine(buffer.trim());
                resolve({
                  done,
                  reasoning: reasoningAcc,
                  usage: usageAcc,
                  modelUsed: modelAcc,
                  reasoningTime: reasoningStartTime
                    ? reasoningEndTime - reasoningStartTime
                    : 0
                });
                break;
              }
              buffer += new TextDecoder().decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
              for (const line of lines) {
                processLine(line.trim());
              }
            }
          } catch (e) {
            if ((e as Error).name === 'AbortError') {
              resolve({
                done,
                reasoning: reasoningAcc,
                usage: usageAcc,
                modelUsed: modelAcc,
                reasoningTime: reasoningStartTime
                  ? reasoningEndTime - reasoningStartTime
                  : 0
              });
            } else {
              reject(e);
            }
          }
        })
        .catch((e) => {
          if (e.name === 'AbortError')
            resolve({
              done,
              reasoning: '',
              usage: null,
              modelUsed: '',
              reasoningTime: 0
            });
          else reject(e);
        });

      // Store abort for external cancellation
      currentAbort = done;
    });
  }

  return {
    streamCompletion,
    abortAll
  };
}
