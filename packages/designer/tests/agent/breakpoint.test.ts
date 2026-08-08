import { describe, expect, it } from 'vitest';
import { hasResumableBreakpoint } from '../../src/components/widgets/agent/utils/breakpoint';
import type { ConversationRound } from '../../src/components/widgets/agent/types/agent';

function makeRound(
  overrides: Partial<ConversationRound> = {}
): ConversationRound {
  return {
    id: 'round_1',
    userMessage: '创建页面',
    architectChatId: 'chat_architect',
    architectPlan: {
      intent: '创建页面',
      safety: 'write',
      steps: [{ id: 'step_1', type: 'text', description: '生成代码' }]
    },
    architectAnswer: '',
    architectStreamText: '',
    reasoningText: '',
    editorResults: [],
    summaryText: '',
    summaryReasoning: '',
    summaryError: '',
    summaryAttempt: 0,
    ...overrides
  };
}

describe('hasResumableBreakpoint', () => {
  it('空对话不存在断点', () => {
    expect(hasResumableBreakpoint([])).toBe(false);
  });

  it('正常完成的轮次不存在断点', () => {
    const round = makeRound({
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 'step_1', type: 'text', description: '生成代码' },
          content: '完成',
          reasoning: '',
          error: null,
          done: true,
          turns: []
        }
      ]
    });
    expect(hasResumableBreakpoint([round])).toBe(false);
  });

  it('规划阶段中断（有 architect chat 但无计划）判定为可恢复', () => {
    const round = makeRound({ architectPlan: null });
    expect(hasResumableBreakpoint([round])).toBe(true);
  });

  it('未开始规划（无 architect chat）不判定为断点', () => {
    const round = makeRound({ architectChatId: '' });
    expect(hasResumableBreakpoint([round])).toBe(false);
  });

  it('存在 aborted 步骤槽位判定为可恢复', () => {
    const round = makeRound({
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 'step_1', type: 'text', description: '生成代码' },
          content: '完成',
          reasoning: '',
          error: null,
          done: true,
          turns: []
        },
        {
          stepIdx: 1,
          step: { id: 'step_2', type: 'text', description: '补充样式' },
          content: '样式代码',
          reasoning: '',
          error: '对话已中断',
          done: true,
          turns: [],
          aborted: true
        }
      ]
    });
    expect(hasResumableBreakpoint([round])).toBe(true);
  });

  it('仅检查最后一轮：历史轮次的断点不影响判定', () => {
    const broken = makeRound({ id: 'round_old', architectPlan: null });
    const done = makeRound({
      id: 'round_latest',
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 'step_1', type: 'text', description: '生成代码' },
          content: '完成',
          reasoning: '',
          error: null,
          done: true,
          turns: []
        }
      ]
    });
    expect(hasResumableBreakpoint([broken, done])).toBe(false);
  });
});
