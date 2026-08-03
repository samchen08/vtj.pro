/**
 * 工具执行器
 * 封装 engine.toolRegistry.execute 的调用，提供超时、错误处理和结果格式化
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
 */
export async function executeTool(
  engine: Engine,
  action: string,
  parameters: any[],
  timeoutMs: number = 30000
): Promise<ToolExecResult> {
  const startTime = Date.now();

  try {
    const result = await withTimeout(
      engine.toolRegistry.execute(action, parameters),
      timeoutMs
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
 * 给 Promise 添加超时
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`工具执行超时 (${ms}ms)`));
    }, ms);

    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
