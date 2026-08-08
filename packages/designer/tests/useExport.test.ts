import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { exportConversation } from '../src/components/widgets/agent/utils/export';
import type { ConversationRound } from '../src/components/widgets/agent/types/agent';

function createRound(
  overrides: Partial<ConversationRound> = {}
): ConversationRound {
  return {
    id: 'round-1',
    userMessage: '创建页面',
    architectChatId: 'chat-1',
    architectPlan: null,
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

describe('exportConversation', () => {
  let anchor: {
    href: string;
    download: string;
    click: ReturnType<typeof vi.fn>;
  };
  let createObjectURL: ReturnType<typeof vi.fn>;
  let revokeObjectURL: ReturnType<typeof vi.fn>;
  let mockBlob: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    anchor = { href: '', download: '', click: vi.fn() };
    vi.spyOn(document, 'createElement').mockImplementation(() => anchor as any);
    createObjectURL = vi.fn(() => 'blob:export');
    revokeObjectURL = vi.fn();
    vi.stubGlobal('URL', { ...URL, createObjectURL, revokeObjectURL });
    mockBlob = vi.fn(function (this: any, parts: string[], options?: any) {
      this.parts = parts;
      this.options = options;
    });
    vi.stubGlobal('Blob', mockBlob as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('exports base metadata with empty rounds', () => {
    exportConversation('', 'auto', []);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    expect(data.topicId).toBe('(新话题)');
    expect(data.model).toBe('auto');
    expect(data.userMessage).toBe('');
    expect(data.rounds).toBeUndefined();
  });

  it('triggers a download with topic-scoped filename', () => {
    vi.useFakeTimers();
    exportConversation('topic-9', 'auto', []);
    expect(anchor.download).toBe('conversation-topic-9.json');
    expect(anchor.href).toBe('blob:export');
    expect(anchor.click).toHaveBeenCalledTimes(1);
    // URL 延迟回收在 1000ms 定时器中执行，推进假时钟触发
    vi.advanceTimersByTime(1000);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:export');
  });

  it('maps step status by error and done flags', () => {
    const round = createRound({
      architectPlan: {
        intent: '创建页面',
        safety: 'write',
        steps: [{ id: 's1', type: 'text', description: '步骤1' }]
      },
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 's1', type: 'text', description: '步骤1' },
          content: '',
          reasoning: '',
          error: '执行失败',
          done: true,
          turns: []
        },
        {
          stepIdx: 1,
          step: { id: 's2', type: 'diff', description: '步骤2' },
          content: '',
          reasoning: '',
          error: null,
          done: true,
          turns: []
        },
        {
          stepIdx: 2,
          step: { id: 's3', type: 'vue_code', description: '步骤3' },
          content: '',
          reasoning: '',
          error: null,
          done: false,
          turns: []
        }
      ]
    });
    exportConversation('topic-1', 'auto', [round]);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    expect(data.rounds[0].steps.map((s: any) => s.status)).toEqual([
      'failed',
      'completed',
      'executing'
    ]);
  });

  it('derives round error from missing plan and step errors', () => {
    const noPlan = createRound();
    const stepError = createRound({
      architectPlan: {
        intent: 'i',
        safety: 'readonly',
        steps: [{ id: 's1', type: 'text', description: '步骤A' }]
      },
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 's1', type: 'text', description: '步骤A' },
          content: '',
          reasoning: '',
          error: '语法错误',
          done: true,
          turns: []
        }
      ]
    });
    exportConversation('topic-1', 'auto', [noPlan, stepError]);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    expect(data.rounds[0].error).toBe('Architect 未返回有效计划 JSON');
    expect(data.rounds[1].error).toBe('步骤「步骤A」: 语法错误');
  });

  it('exports tool call details with result metadata', () => {
    const round = createRound({
      architectPlan: {
        intent: 'i',
        safety: 'write',
        steps: [{ id: 's1', type: 'tool_call', description: '调用工具' }]
      },
      editorResults: [
        {
          stepIdx: 0,
          step: { id: 's1', type: 'tool_call', description: '调用工具' },
          content: '```json\n{}\n```',
          reasoning: '分析',
          error: null,
          done: true,
          turns: [
            {
              turn: 1,
              type: 'tool_call',
              content: '```json\n{}\n```',
              reasoning: '分析',
              prompt: '步骤 s1',
              toolAction: 'setDataSources',
              toolParams: [{ name: 'users' }],
              toolResult: {
                success: true,
                result: { count: 2 },
                duration: 12
              },
              resultSummary: '完成'
            }
          ]
        }
      ]
    });
    exportConversation('topic-1', 'auto', [round]);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    const turn = data.rounds[0].steps[0].turns[0];
    expect(turn.toolCall).toEqual({
      action: 'setDataSources',
      parameters: [{ name: 'users' }],
      result: { success: true, result: { count: 2 }, error: null, duration: 12 }
    });
    expect(turn.resultSummary).toBe('完成');
    expect(turn.reasoning).toBe('分析');
  });

  it('exports architect block only when stream or reasoning text exists', () => {
    const withText = createRound({
      architectStreamText: '流文本',
      architectPlan: {
        intent: 'i',
        safety: 'readonly',
        steps: []
      }
    });
    const withoutText = createRound({
      architectPlan: {
        intent: 'i',
        safety: 'readonly',
        steps: []
      }
    });
    exportConversation('topic-1', 'auto', [withText, withoutText]);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    expect(data.rounds[0].architect.output).toBe('流文本');
    expect(data.rounds[0].architect.plan.intent).toBe('i');
    expect(data.rounds[1].architect).toBeUndefined();
  });

  it('exports summary text and summary error', () => {
    const round = createRound({
      summaryText: '任务完成',
      summaryError: '总结接口超时'
    });
    exportConversation('topic-1', 'auto', [round]);
    const data = JSON.parse(mockBlob.mock.calls[0][0][0]);
    expect(data.rounds[0].summary).toBe('任务完成');
    expect(data.rounds[0].summaryError).toBe('总结接口超时');
  });
});
