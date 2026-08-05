import { describe, expect, it, vi, beforeEach } from 'vitest';
import { reactive, ref } from 'vue';
import { useArchitectPlan } from '../src/components/widgets/agent/composables/useArchitectPlan';
import { buildSummaryPrompt } from '../src/components/widgets/agent/utils/summary';
import type {
  ConversationRound,
  EditorStepResult,
  PlanResult,
  StreamCompletionResult
} from '../src/components/widgets/agent/types/agent';

vi.mock('../src/components/widgets/agent/utils/summary', () => ({
  buildSummaryPrompt: vi.fn(() => 'summary prompt')
}));

beforeEach(() => {
  // 模块级 mock 的调用计数跨用例累积，需要单独清理
  vi.mocked(buildSummaryPrompt).mockClear();
});

function createStreamResult(
  overrides: Partial<StreamCompletionResult> = {}
): StreamCompletionResult {
  return {
    done: vi.fn(),
    reasoning: '',
    usage: null,
    modelUsed: '',
    reasoningTime: 0,
    ...overrides
  };
}

function createDeps(overrides: Record<string, any> = {}) {
  const statusText = ref('');
  const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
  const callLog: [string, any][] = [];
  const deps = {
    streamCompletion: vi.fn(async () => createStreamResult()),
    postChat: vi.fn(async (body: any) => {
      callLog.push(['postChat', body]);
      return { chat: { id: 'summary-chat' } };
    }),
    saveChat: vi.fn(async (body: any) => {
      callLog.push(['saveChat', body]);
      return {};
    }),
    updateTopic: vi.fn(async (body: any) => {
      callLog.push(['updateTopic', body]);
      return {};
    }),
    saveTrace: vi.fn(async (body: any) => {
      callLog.push(['saveTrace', body]);
      return {};
    }),
    setStatus: vi.fn((message: { text: string; type: any }) => {
      statusText.value = message.text;
      statusType.value = message.type;
    }),
    executeEditorStep: vi.fn(async () => ({
      content: '',
      error: null,
      tokens: 0,
      duration: 10
    })),
    ...overrides
  };
  return { ...deps, statusText, statusType, callLog };
}

function createRound(overrides: Partial<ConversationRound> = {}) {
  return reactive<ConversationRound>({
    id: 'round_1',
    userMessage: '消息',
    architectChatId: '',
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
  });
}

const PLAN_JSON = JSON.stringify({
  intent: '创建页面',
  safety: 'write',
  steps: [
    { id: 's1', type: 'text', description: '创建模板' },
    { id: 's2', type: 'diff', description: '修改样式' }
  ]
});

function planStreamResult(): StreamCompletionResult {
  return createStreamResult({ usage: { total_tokens: 20 } });
}

describe('useArchitectPlan.executeArchitectPlan', () => {
  it('exits early without any API call when already canceled', async () => {
    const controller = new AbortController();
    controller.abort();
    const deps = createDeps();
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      round,
      controller.signal
    );

    expect(deps.callLog).toHaveLength(0);
    expect(deps.statusText.value).toBe('已取消');
    expect(deps.statusType.value).toBe('info');
  });

  it('marks the topic as failed when no valid plan json is returned', async () => {
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('plain text without plan json');
        return planStreamResult();
      })
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan('topic', 'chat', 'user', 'trace', '消息', round);

    expect(round.architectPlan).toBeNull();
    expect(deps.statusText.value).toContain('未返回有效 JSON');
    expect(deps.statusType.value).toBe('danger');
    expect(deps.callLog.map(([name]) => name)).toEqual([
      'saveChat',
      'updateTopic',
      'saveTrace'
    ]);
    const updateBody = deps.callLog[1][1];
    expect(updateBody.status).toBe('failed');
    const traceBody = deps.callLog[2][1];
    expect(traceBody.finalStatus).toBe('failed');
    expect(traceBody.planJson).toBeNull();
  });

  it('answers directly when the plan has no steps', async () => {
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.(
          '```json\n' +
            JSON.stringify({
              intent: '打招呼',
              safety: 'readonly',
              steps: [],
              answer: '你好，我是 AI'
            }) +
            '\n```'
        );
        return planStreamResult();
      })
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan('topic', 'chat', 'user', 'trace', '消息', round);

    expect(round.architectAnswer).toBe('你好，我是 AI');
    expect(deps.statusText.value).toBe('Architect 直接回答');
    const updateBodies = deps.callLog.filter(
      ([name]) => name === 'updateTopic'
    );
    // 分流前会先更新一次 executing，最终更新才是 completed
    expect(updateBodies[updateBodies.length - 1][1].status).toBe('completed');
    const traceBody = deps.callLog.find(([name]) => name === 'saveTrace')![1];
    expect(traceBody.finalStatus).toBe('completed');
    expect(traceBody.stepsJson).toEqual([]);
  });

  it('executes all steps, generates a summary and completes the topic', async () => {
    const deps = createDeps({
      streamCompletion: vi
        .fn()
        .mockImplementationOnce(
          async (_t: string, _c: string, onChunk: any) => {
            onChunk?.('```json\n' + PLAN_JSON + '\n```');
            return planStreamResult();
          }
        )
        .mockImplementationOnce(
          async (_t: string, _c: string, onChunk: any) => {
            onChunk?.('总结内容');
            return createStreamResult({ usage: { total_tokens: 30 } });
          }
        ),
      executeEditorStep: vi.fn(async () => ({
        content: '执行成功',
        error: null,
        tokens: 5,
        duration: 100
      }))
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan('topic', 'chat', 'user', 'trace', '消息', round);

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(2);
    expect(round.architectPlan?.intent).toBe('创建页面');
    expect(round.summaryText).toBe('总结内容');
    expect(buildSummaryPrompt).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('全部 2 个步骤执行完成');
    expect(deps.statusType.value).toBe('success');

    expect(deps.callLog.map(([name]) => name)).toEqual([
      'saveChat',
      'updateTopic',
      'postChat',
      'saveChat',
      'updateTopic',
      'saveTrace'
    ]);
    const executingBody = deps.callLog[1][1];
    expect(executingBody.status).toBe('executing');
    expect(deps.callLog[4][1].status).toBe('completed');
    const traceBody = deps.callLog[5][1];
    expect(traceBody.finalStatus).toBe('completed');
    expect(traceBody.stepsJson).toHaveLength(2);
    expect(traceBody.stepsJson[0]).toMatchObject({
      stepId: 's1',
      status: 'completed',
      tokens: 5
    });
    expect(traceBody.totalTokens).toBe(60);
  });

  it('marks the topic as failed when a step reports an error', async () => {
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('```json\n' + PLAN_JSON + '\n```');
        return planStreamResult();
      }),
      executeEditorStep: vi.fn(async () => ({
        content: '',
        error: '语法错误',
        tokens: 0,
        duration: 50
      }))
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan('topic', 'chat', 'user', 'trace', '消息', round);

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('第 1 步执行失败，可从此步骤重试');
    expect(deps.statusType.value).toBe('danger');
    const failedUpdates = deps.callLog.filter(
      ([name, body]) => name === 'updateTopic' && body.status === 'failed'
    );
    expect(failedUpdates).toHaveLength(1);
    const traceBody = deps.callLog.find(([name]) => name === 'saveTrace')![1];
    expect(traceBody.finalStatus).toBe('failed');
    expect(traceBody.stepsJson).toHaveLength(1);
    expect(traceBody.stepsJson[0].status).toBe('failed');
  });

  it('retries from the failed step and keeps completed step records', async () => {
    const round = createRound();
    round.architectPlan = JSON.parse(PLAN_JSON);
    round.editorResults = [
      {
        stepIdx: 0,
        step: round.architectPlan!.steps[0],
        content: '已完成',
        reasoning: '',
        error: null,
        done: true,
        turns: [],
        tokens: 3,
        duration: 20
      },
      {
        stepIdx: 1,
        step: round.architectPlan!.steps[1],
        content: '',
        reasoning: '',
        error: '生成失败',
        done: true,
        turns: []
      }
    ];
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('重试后的总结');
        return createStreamResult();
      }),
      executeEditorStep: vi.fn(async (...args: any[]) => {
        const retrySlot = args[8] as EditorStepResult;
        retrySlot.error = null;
        retrySlot.done = true;
        retrySlot.content = '重试成功';
        return { content: '重试成功', error: null, tokens: 5, duration: 30 };
      })
    });
    const { retryEditorPlan } = useArchitectPlan(deps);

    await retryEditorPlan('topic', 'user', 'trace-retry', '消息', round, 1);

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(round.editorResults[0].content).toBe('已完成');
    expect(round.editorResults[1].error).toBeNull();
    const traceBody = deps.callLog.find(([name]) => name === 'saveTrace')![1];
    expect(traceBody.stepsJson.map((item: any) => item.status)).toEqual([
      'completed',
      'completed'
    ]);
  });

  it('stops the step loop when canceled mid-execution', async () => {
    const controller = new AbortController();
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('```json\n' + PLAN_JSON + '\n```');
        return planStreamResult();
      }),
      executeEditorStep: vi.fn(async () => {
        controller.abort();
        return { content: '', error: null, tokens: 0, duration: 10 };
      })
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      round,
      controller.signal
    );

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('已取消（已完成 1/2 步）');
    expect(buildSummaryPrompt).not.toHaveBeenCalled();
    const names = deps.callLog.map(([name]) => name);
    expect(names).not.toContain('postChat');
  });

  it('keeps the final status update when summary generation fails', async () => {
    const deps = createDeps({
      streamCompletion: vi
        .fn()
        .mockImplementationOnce(
          async (_t: string, _c: string, onChunk: any) => {
            onChunk?.('```json\n' + PLAN_JSON + '\n```');
            return planStreamResult();
          }
        )
        .mockImplementationOnce(
          async (_t: string, _c: string, onChunk: any) => {
            onChunk?.('部分总结');
            return createStreamResult();
          }
        ),
      postChat: vi.fn(async () => {
        throw new Error('network down');
      })
    });
    const round = createRound();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan('topic', 'chat', 'user', 'trace', '消息', round);

    expect(round.summaryError).toBe('network down');
    const updateBodies = deps.callLog.filter(
      ([name]) => name === 'updateTopic'
    );
    // 最终状态更新仍在总结失败后执行
    expect(updateBodies[updateBodies.length - 1][1].status).toBe('completed');
  });
});

describe('useArchitectPlan.resumeEditorPlan', () => {
  it('resumes from the aborted slot and reuses it', async () => {
    const round = createRound();
    round.architectPlan = JSON.parse(PLAN_JSON);
    const abortedSlot: EditorStepResult = {
      stepIdx: 1,
      step: round.architectPlan!.steps[1],
      content: '部分流内容',
      reasoning: '',
      error: null,
      done: true,
      aborted: true,
      turns: []
    };
    round.editorResults = [
      {
        stepIdx: 0,
        step: round.architectPlan!.steps[0],
        content: '已完成',
        reasoning: '',
        error: null,
        done: true,
        turns: [],
        tokens: 3,
        duration: 20
      },
      abortedSlot
    ];
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('恢复后的总结');
        return createStreamResult();
      }),
      executeEditorStep: vi.fn(async (...args: any[]) => {
        const retrySlot = args[8] as EditorStepResult;
        // 与真实实现一致：续跑前重置槽位并清除取消标记
        retrySlot.aborted = false;
        retrySlot.content = '续跑成功';
        retrySlot.done = true;
        return { content: '续跑成功', error: null, tokens: 5, duration: 30 };
      })
    });
    const { resumeEditorPlan } = useArchitectPlan(deps);

    await resumeEditorPlan('topic', 'user', 'trace-resume', '消息', round);

    // 已完成步骤不再执行，仅续跑被取消的步骤，且复用原槽位
    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    const stepArgs = (deps.executeEditorStep as any).mock.calls[0];
    expect(stepArgs[3]).toBe(1);
    // reactive 数组读取返回 proxy，与数组内元素为同一引用
    expect(stepArgs[8]).toBe(round.editorResults[1]);
    expect(round.editorResults).toHaveLength(2);
    expect(round.editorResults[0].content).toBe('已完成');
    expect(round.editorResults[1].content).toBe('续跑成功');
    expect(round.editorResults[1].aborted).toBe(false);
    // 续跑完成后正常生成总结并保存 trace
    expect(buildSummaryPrompt).toHaveBeenCalledTimes(1);
    const traceBody = deps.callLog.find(([name]) => name === 'saveTrace')![1];
    expect(traceBody.finalStatus).toBe('completed');
    expect(traceBody.stepsJson).toHaveLength(2);
  });

  it('continues from the next step when no aborted slot exists', async () => {
    const round = createRound();
    round.architectPlan = JSON.parse(PLAN_JSON);
    round.editorResults = [
      {
        stepIdx: 0,
        step: round.architectPlan!.steps[0],
        content: '已完成',
        reasoning: '',
        error: null,
        done: true,
        turns: []
      }
    ];
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('恢复总结');
        return createStreamResult();
      }),
      executeEditorStep: vi.fn(async () => ({
        content: '续跑',
        error: null,
        tokens: 5,
        duration: 10
      }))
    });
    const { resumeEditorPlan } = useArchitectPlan(deps);

    await resumeEditorPlan('topic', 'user', 'trace-resume', '消息', round);

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    const stepArgs = (deps.executeEditorStep as any).mock.calls[0];
    expect(stepArgs[3]).toBe(1);
    expect(stepArgs[8]).toBeUndefined();
    expect(deps.statusText.value).toBe('全部 2 个步骤执行完成');
  });

  it('only regenerates the summary when all steps are done', async () => {
    const round = createRound();
    round.architectPlan = JSON.parse(PLAN_JSON);
    round.editorResults = [
      {
        stepIdx: 0,
        step: round.architectPlan!.steps[0],
        content: '完成1',
        reasoning: '',
        error: null,
        done: true,
        turns: []
      },
      {
        stepIdx: 1,
        step: round.architectPlan!.steps[1],
        content: '完成2',
        reasoning: '',
        error: null,
        done: true,
        turns: []
      }
    ];
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('补充总结');
        return createStreamResult({ usage: { total_tokens: 9 } });
      })
    });
    const { resumeEditorPlan } = useArchitectPlan(deps);

    await resumeEditorPlan('topic', 'user', 'trace-resume', '消息', round);

    // 不执行任何步骤，仅补生成总结
    expect(deps.executeEditorStep).not.toHaveBeenCalled();
    expect(round.summaryText).toBe('补充总结');
    expect(buildSummaryPrompt).toHaveBeenCalledTimes(1);
    const traceBody = deps.callLog.find(([name]) => name === 'saveTrace')![1];
    expect(traceBody.finalStatus).toBe('completed');
    expect(traceBody.stepsJson).toHaveLength(2);
    expect(deps.statusText.value).toBe('任务总结已生成');
    expect(deps.statusType.value).toBe('success');
  });

  it('throws when the plan has no steps', async () => {
    const round = createRound();
    round.architectPlan = {
      intent: '直接回答',
      safety: 'readonly',
      steps: []
    };
    const deps = createDeps();
    const { resumeEditorPlan } = useArchitectPlan(deps);

    await expect(
      resumeEditorPlan('topic', 'user', 'trace-resume', '消息', round)
    ).rejects.toThrow('没有可恢复的计划');
    expect(deps.executeEditorStep).not.toHaveBeenCalled();
  });
});
