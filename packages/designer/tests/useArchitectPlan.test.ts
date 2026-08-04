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
  return {
    streamCompletion: vi.fn(async () => createStreamResult()),
    apiPost: vi.fn(async (_url: string, _body: any) => ({})),
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
    summaryError: ref('')
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

function updateCalls(apiPost: any) {
  return apiPost.mock.calls as [string, any][];
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

    expect(deps.apiPost).not.toHaveBeenCalled();
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
    const urls = updateCalls(deps.apiPost).map(([url]) => url);
    expect(urls).toEqual([
      '/api/open/chat/save/:token',
      '/api/open/topic/update/:token',
      '/api/open/trace/:token'
    ]);
    const traceBody = updateCalls(deps.apiPost)[2][1];
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
    const calls = updateCalls(deps.apiPost);
    const updateCalls_ = calls.filter(
      ([url]) => url === '/api/open/topic/update/:token'
    );
    // 分流前会先更新一次 executing，最终更新才是 completed
    expect(updateCalls_[updateCalls_.length - 1][1].status).toBe('completed');
    const traceBody = calls.find(
      ([url]) => url === '/api/open/trace/:token'
    )![1];
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
      apiPost: vi.fn(async (url: string) => {
        if (url === '/api/open/chat/post/:token') {
          return { chat: { id: 'summary-chat' } };
        }
        return {};
      }),
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

    const calls = updateCalls(deps.apiPost);
    expect(calls.map(([url]) => url)).toEqual([
      '/api/open/chat/save/:token',
      '/api/open/topic/update/:token',
      '/api/open/chat/post/:token',
      '/api/open/chat/save/:token',
      '/api/open/topic/update/:token',
      '/api/open/trace/:token'
    ]);
    const executingUpdate = calls.find(
      ([url, body]) => url === '/api/open/topic/update/:token' && body.status
    )!;
    expect(executingUpdate[1].status).toBe('executing');
    expect(calls[4][1].status).toBe('completed');
    const traceBody = calls[5][1];
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

    expect(deps.statusText.value).toBe('⚠️ 2 个步骤执行完成（有错误）');
    expect(deps.statusType.value).toBe('warning');
    const calls = updateCalls(deps.apiPost);
    const failedUpdate = calls.find(
      ([url, body]) =>
        url === '/api/open/topic/update/:token' && body.status === 'failed'
    );
    expect(failedUpdate).toBeDefined();
    const traceBody = calls.find(
      ([url]) => url === '/api/open/trace/:token'
    )![1];
    expect(traceBody.finalStatus).toBe('failed');
    expect(traceBody.stepsJson[0].status).toBe('failed');
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
    const urls = updateCalls(deps.apiPost).map(([url]) => url);
    expect(urls).not.toContain('/api/open/chat/post/:token');
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
      apiPost: vi.fn(async (url: string) => {
        if (url === '/api/open/chat/post/:token') {
          throw new Error('network down');
        }
        return {};
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
    const calls = updateCalls(deps.apiPost);
    const updateCalls_ = calls.filter(
      ([url]) => url === '/api/open/topic/update/:token'
    );
    // 最终状态更新仍在总结失败后执行
    expect(updateCalls_[updateCalls_.length - 1][1].status).toBe('completed');
  });
});
