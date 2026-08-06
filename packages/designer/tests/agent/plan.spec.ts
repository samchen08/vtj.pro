import { describe, expect, it } from 'vitest';
import { parsePlanOutput } from '../../src/components/widgets/agent/utils/plan';

describe('parsePlanOutput', () => {
  it('将服务端协议步骤类型 code 归一化为 vue_code', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        intent: '更新页面',
        safety: 'write',
        steps: [
          { id: 's1', type: 'code', description: '生成代码' },
          { id: 's2', type: 'text', description: '说明' }
        ]
      })
    );
    expect(plan?.steps[0].type).toBe('vue_code');
    expect(plan?.steps[1].type).toBe('text');
  });

  it('透传服务端协议字段 dependsOn 与 contextKeys', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        intent: '更新页面',
        safety: 'write',
        contextKeys: ['page:home'],
        steps: [
          {
            id: 's1',
            type: 'tool_call',
            description: '读取页面',
            dependsOn: [],
            toolName: 'getPage'
          },
          { id: 's2', type: 'vue_code', description: '写入', dependsOn: ['s1'] }
        ]
      })
    );
    expect(plan?.contextKeys).toEqual(['page:home']);
    expect(plan?.steps[1].dependsOn).toEqual(['s1']);
  });

  it('直接回答（answer）保留其余字段', () => {
    const { plan } = parsePlanOutput(
      JSON.stringify({
        answer: '无需改动',
        intent: '检查',
        safety: 'readonly',
        steps: []
      })
    );
    expect(plan?.answer).toBe('无需改动');
    expect(plan?.intent).toBe('检查');
    expect(plan?.steps).toEqual([]);
  });

  it('模型自报错误返回 error 而非 plan', () => {
    const { plan, error } = parsePlanOutput('{"error":"缺少页面信息"}');
    expect(plan).toBeNull();
    expect(error).toBe('缺少页面信息');
  });

  it('空白或非 JSON 输出返回空 plan', () => {
    expect(parsePlanOutput('')).toEqual({ plan: null });
    expect(parsePlanOutput('随便说说')).toEqual({ plan: null });
  });
});
