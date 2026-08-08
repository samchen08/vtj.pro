import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  executeTool,
  formatToolFeedback
} from '../src/components/widgets/agent/utils/toolExecutor';

function createEngine(
  execute: (action: string, parameters: any[]) => Promise<any>
) {
  return {
    toolRegistry: { execute }
  } as any;
}

describe('executeTool', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns success with result and duration', async () => {
    const engine = createEngine(vi.fn(async () => ({ ok: true })));
    const result = await executeTool(engine, 'updateBlock', [{ id: '1' }]);
    expect(result.success).toBe(true);
    expect(result.action).toBe('updateBlock');
    expect(result.result).toEqual({ ok: true });
    expect(result.duration).toBeGreaterThanOrEqual(0);
  });

  it('returns failure with error message when execution throws', async () => {
    const engine = createEngine(
      vi.fn(async () => {
        throw new Error('boom');
      })
    );
    const result = await executeTool(engine, 'removePage', []);
    expect(result.success).toBe(false);
    expect(result.error).toBe('boom');
    expect(result.duration).toBeGreaterThanOrEqual(0);
  });

  it('handles non-Error thrown values', async () => {
    const engine = createEngine(
      vi.fn(async () => {
        throw 'string-error';
      })
    );
    const result = await executeTool(engine, 'refresh', []);
    expect(result.success).toBe(false);
    expect(result.error).toBe('string-error');
  });

  it('rejects with timeout when execution takes too long', async () => {
    vi.useFakeTimers();
    const engine = createEngine(
      vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ ok: true }), 1000);
          })
      )
    );
    const promise = executeTool(engine, 'updateBlock', [], 100);
    vi.advanceTimersByTime(200);
    const result = await promise;
    expect(result.success).toBe(false);
    expect(result.error).toContain('工具执行超时');
  });

  it('passes action and parameters to the registry', async () => {
    const execute = vi.fn(async () => 'done');
    const engine = createEngine(execute);
    await executeTool(engine, 'setDataSources', [{ name: 'users' }]);
    expect(execute).toHaveBeenCalledWith('setDataSources', [{ name: 'users' }]);
  });
});

describe('formatToolFeedback', () => {
  it('formats success feedback with string result', () => {
    const text = formatToolFeedback({
      success: true,
      action: 'refresh',
      result: '页面已刷新',
      duration: 10
    });
    expect(text).toContain('O: 工具执行成功');
    expect(text).toContain('工具: refresh');
    expect(text).toContain('结果: 页面已刷新');
    expect(text).toContain('耗时: 10ms');
  });

  it('serializes object results as pretty JSON', () => {
    const text = formatToolFeedback({
      success: true,
      action: 'updateBlock',
      result: { id: 1 },
      duration: 5
    });
    expect(text).toContain('结果: {\n  "id": 1\n}');
  });

  it('formats failure feedback with error message', () => {
    const text = formatToolFeedback({
      success: false,
      action: 'removePage',
      error: '页面不存在',
      duration: 3
    });
    expect(text).toContain('O: 工具执行失败');
    expect(text).toContain('错误: 页面不存在');
    expect(text).not.toContain('结果:');
  });
});
