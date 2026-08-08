import { describe, it, expect, vi, afterEach } from 'vitest';
import type { Engine } from '../../src/framework';
import {
  executeTool,
  formatToolFeedback
} from '../../src/components/widgets/agent/utils/toolExecutor';

function createEngine(execute: (...args: any[]) => Promise<any>): Engine {
  return {
    toolRegistry: { execute }
  } as unknown as Engine;
}

afterEach(() => {
  vi.useRealTimers();
});

describe('executeTool', () => {
  it('工具执行成功返回结果与耗时', async () => {
    const engine = createEngine(vi.fn().mockResolvedValue({ id: 'page1' }));
    const result = await executeTool(engine, 'getPage', ['home']);
    expect(result.success).toBe(true);
    expect(result.action).toBe('getPage');
    expect(result.result).toEqual({ id: 'page1' });
    expect(result.duration).toBeGreaterThanOrEqual(0);
  });

  it('工具执行异常时返回失败结果而非抛出', async () => {
    const engine = createEngine(
      vi.fn().mockRejectedValue(new Error('工具内部错误'))
    );
    const result = await executeTool(engine, 'updatePage', []);
    expect(result.success).toBe(false);
    expect(result.error).toContain('工具内部错误');
  });

  it('超过超时时间返回超时错误', async () => {
    vi.useFakeTimers();
    const engine = createEngine(
      vi.fn().mockImplementation(() => new Promise(() => {}))
    );
    const pending = executeTool(engine, 'slowTool', [], 100);
    vi.advanceTimersByTime(100);
    const result = await pending;
    expect(result.success).toBe(false);
    expect(result.error).toContain('超时');
  });

  it('AbortSignal 中止时立即返回 AbortError（取消透传）', async () => {
    vi.useFakeTimers();
    const engine = createEngine(
      vi.fn().mockImplementation(() => new Promise(() => {}))
    );
    const controller = new AbortController();
    const pending = executeTool(
      engine,
      'slowTool',
      [],
      30000,
      controller.signal
    );
    controller.abort();
    const result = await pending;
    expect(result.success).toBe(false);
    expect(result.error).toBe('Aborted');
  });

  it('信号已中止时不再执行工具', async () => {
    const controller = new AbortController();
    controller.abort();
    const execute = vi.fn().mockResolvedValue('ok');
    const engine = createEngine(execute);
    const result = await executeTool(
      engine,
      'refresh',
      [],
      1000,
      controller.signal
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe('Aborted');
    expect(execute).not.toHaveBeenCalled();
  });
});

describe('formatToolFeedback', () => {
  it('成功时包含结果', () => {
    const text = formatToolFeedback({
      success: true,
      action: 'getPage',
      result: { id: 'x' },
      duration: 10
    });
    expect(text).toContain('工具执行成功');
    expect(text).toContain('工具: getPage');
    expect(text).toContain('结果:');
    expect(text).toContain('耗时: 10ms');
  });

  it('失败时包含错误信息', () => {
    const text = formatToolFeedback({
      success: false,
      action: 'removePage',
      error: '权限不足',
      duration: 5
    });
    expect(text).toContain('工具执行失败');
    expect(text).toContain('错误: 权限不足');
  });
});
