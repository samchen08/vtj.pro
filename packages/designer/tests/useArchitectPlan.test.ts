import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { useArchitectPlan } from '../src/components/widgets/agent/composables/useArchitectPlan';
import type {
  EditorStepResult,
  PlanResult,
  StreamCompletionResult
} from '../src/components/widgets/agent/types/agent';

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
    statusText,
    statusType,
    executeEditorStep: vi.fn(async () => ({
      content: '',
      error: null,
      tokens: 0,
      duration: 10
    })),
    buildSummaryPrompt: vi.fn(() => 'summary prompt'),
    ...overrides
  };
  return { ...deps, callLog };
}

function createTargets() {
  return {
    architectPlan: ref<PlanResult | null>(null),
    architectAnswer: ref(''),
    architectStreamText: ref(''),
    reasoningText: ref(''),
    editorResults: ref<EditorStepResult[]>([]),
    summaryText: ref(''),
    summaryReasoning: ref(''),
    summaryError: ref(''),
    summaryAttempt: ref(0)
  };
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets,
      controller.signal
    );

    expect(deps.callLog).toHaveLength(0);
    expect(deps.statusText.value).toBe('⏹️ 已取消');
    expect(deps.statusType.value).toBe('info');
  });

  it('marks the topic as failed when no valid plan json is returned', async () => {
    const deps = createDeps({
      streamCompletion: vi.fn(async (_t: string, _c: string, onChunk: any) => {
        onChunk?.('plain text without plan json');
        return planStreamResult();
      })
    });
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets
    );

    expect(targets.architectPlan.value).toBeNull();
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets
    );

    expect(targets.architectAnswer.value).toBe('你好，我是 AI');
    expect(deps.statusText.value).toBe('✅ Architect 直接回答');
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets
    );

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(2);
    expect(targets.architectPlan.value?.intent).toBe('创建页面');
    expect(targets.summaryText.value).toBe('总结内容');
    expect(deps.buildSummaryPrompt).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('✅ 全部 2 个步骤执行完成');
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets
    );

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('❌ 第 1 步执行失败，可从此步骤重试');
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
    const targets = createTargets();
    targets.architectPlan.value = JSON.parse(PLAN_JSON);
    targets.editorResults.value = [
      {
        stepIdx: 0,
        step: targets.architectPlan.value!.steps[0],
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
        step: targets.architectPlan.value!.steps[1],
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

    await retryEditorPlan('topic', 'user', 'trace-retry', '消息', targets, 1);

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(targets.editorResults.value[0].content).toBe('已完成');
    expect(targets.editorResults.value[1].error).toBeNull();
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets,
      controller.signal
    );

    expect(deps.executeEditorStep).toHaveBeenCalledTimes(1);
    expect(deps.statusText.value).toBe('⏹️ 已取消（已完成 1/2 步）');
    expect(deps.buildSummaryPrompt).not.toHaveBeenCalled();
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
    const targets = createTargets();
    const { executeArchitectPlan } = useArchitectPlan(deps);

    await executeArchitectPlan(
      'topic',
      'chat',
      'user',
      'trace',
      '消息',
      targets
    );

    expect(targets.summaryError.value).toBe('network down');
    const updateBodies = deps.callLog.filter(
      ([name]) => name === 'updateTopic'
    );
    // 最终状态更新仍在总结失败后执行
    expect(updateBodies[updateBodies.length - 1][1].status).toBe('completed');
  });
});
