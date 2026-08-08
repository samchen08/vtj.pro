import { describe, expect, it } from 'vitest';
import { buildSummaryPrompt } from '../src/components/widgets/agent/utils/summary';
import type {
  PlanResult,
  StepRecord
} from '../src/components/widgets/agent/types/agent';

describe('buildSummaryPrompt', () => {
  it('builds a prompt containing the user request and plan info', () => {
    const plan: PlanResult = {
      intent: '创建用户列表页面',
      safety: 'write',
      steps: [{ id: 's1', type: 'text', description: '创建页面' }]
    };
    const prompt = buildSummaryPrompt('帮我做一个页面', plan, []);
    expect(prompt).toContain('帮我做一个页面');
    expect(prompt).toContain('创建用户列表页面');
    expect(prompt).toContain('安全评级: write');
    expect(prompt).toContain('步骤数: 1');
    expect(prompt).toContain('总步骤: 0');
  });

  it('shows unknown plan fields when plan is null', () => {
    const prompt = buildSummaryPrompt('需求', null, []);
    expect(prompt).toContain('意图: 未知');
    expect(prompt).toContain('安全评级: 未知');
    expect(prompt).toContain('步骤数: 0');
  });

  it('summarizes step status, errors and durations', () => {
    const records: StepRecord[] = [
      {
        stepId: 's1',
        type: 'text',
        description: '创建页面',
        status: 'completed',
        content: '',
        error: null,
        tokens: 5,
        duration: 1000
      },
      {
        stepId: 's2',
        type: 'diff',
        description: '修改样式',
        status: 'failed',
        content: '',
        error: '匹配失败',
        tokens: 0,
        duration: 500
      }
    ];
    const prompt = buildSummaryPrompt('需求', null, records);
    expect(prompt).toContain('总步骤: 2');
    expect(prompt).toContain('成功: 1');
    expect(prompt).toContain('失败: 1');
    expect(prompt).toContain('总耗时: 1.5s');
    expect(prompt).toContain('1. [成功] 创建页面');
    expect(prompt).toContain('2. [失败] 修改样式 (错误: 匹配失败)');
  });

  it('omits the error suffix for successful steps', () => {
    const records: StepRecord[] = [
      {
        stepId: 's1',
        type: 'text',
        description: '创建页面',
        status: 'completed',
        content: '',
        error: null,
        tokens: 0,
        duration: 0
      }
    ];
    const prompt = buildSummaryPrompt('需求', null, records);
    expect(prompt).toContain('1. [成功] 创建页面\n');
    expect(prompt).not.toContain('(错误:');
  });
});
