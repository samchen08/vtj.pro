import { describe, it, expect, vi } from 'vitest';
import { jsonp } from '../src';

vi.mock('fetch-jsonp', () => {
  return {
    default: (url: string, options?: any) => {
      return Promise.resolve({
        json: () => Promise.resolve({ success: true, data: { id: 1 } })
      });
    }
  };
});

describe('jsonp 工具', () => {
  it('应发起 JSONP 请求并返回数据', async () => {
    const result = await jsonp<{ success: boolean; data: any }>(
      'https://api.example.com/data'
    );
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ id: 1 });
  });

  it('应支持 query 参数', async () => {
    const result = await jsonp<{ success: boolean }>(
      'https://api.example.com/data',
      { query: { page: 1, limit: 10 } }
    );
    expect(result.success).toBe(true);
  });

  it('应支持模板 URL', async () => {
    const result = await jsonp<{ success: boolean }>(
      'https://api.example.com/user/${id}',
      { query: { id: 42 } }
    );
    expect(result.success).toBe(true);
  });
});
