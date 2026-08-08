/**
 * 工具执行器
 * 封装 engine.toolRegistry.execute 的调用，提供超时、取消（AbortSignal）、错误处理和结果格式化
 */

import type { Engine } from '../../../../framework';

export interface ToolExecResult {
  success: boolean;
  action: string;
  result?: any;
  error?: string;
  /** 执行耗时(ms) */
  duration: number;
}

/**
 * 执行单个工具调用
 *
 * @param engine   设计器引擎实例
 * @param action   工具名称
 * @param parameters 工具参数数组
 * @param timeoutMs 超时时间(ms)，默认 30000
 * @param signal   取消信号（用户中止工作流时立即中断等待中的工具调用）
 */
export async function executeTool(
  engine: Engine,
  action: string,
  parameters: any[],
  timeoutMs: number = 30000,
  signal?: AbortSignal
): Promise<ToolExecResult> {
  const startTime = Date.now();

  // 信号已中止时不再启动工具执行
  if (signal?.aborted) {
    return { success: false, action, error: 'Aborted', duration: 0 };
  }

  try {
    const result = await withTimeout(
      engine.toolRegistry.execute(action, parameters),
      timeoutMs,
      signal
    );
    return {
      success: true,
      action,
      result,
      duration: Date.now() - startTime
    };
  } catch (e: any) {
    const error = e?.message || String(e);
    return {
      success: false,
      action,
      error,
      duration: Date.now() - startTime
    };
  }
}

/**
 * 将工具执行结果格式化为 LLM 反馈消息（O: 格式）
 */
export function formatToolFeedback(result: ToolExecResult): string {
  const parts: string[] = [];
  parts.push(`O: 工具执行${result.success ? '成功' : '失败'}`);
  parts.push(`工具: ${result.action}`);

  if (result.success) {
    const resultStr =
      typeof result.result === 'string'
        ? result.result
        : JSON.stringify(result.result, null, 2);
    parts.push(`结果: ${resultStr}`);
  } else {
    parts.push(`错误: ${result.error}`);
  }

  parts.push(`耗时: ${result.duration}ms`);
  return parts.join('\n');
}

/**
 * 给 Promise 添加超时与取消支持
 * 超时或取消时 reject；取消使用 AbortError 便于调用方区分
 */
function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  signal?: AbortSignal
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`工具执行超时 (${ms}ms)`));
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    };

    if (signal?.aborted) {
      onAbort();
      return;
    }
    signal?.addEventListener('abort', onAbort, { once: true });

    promise
      .then((val) => {
        cleanup();
        resolve(val);
      })
      .catch((err) => {
        cleanup();
        reject(err);
      });
  });
}
