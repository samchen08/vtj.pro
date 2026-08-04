import { describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';
import { useDualAgent } from '../src/components/widgets/agent/composables/useDualAgent';
import type {
  ConversationRound,
  DualAgentApi,
  DualAgentInfrastructure,
  DualAgentState
} from '../src/components/widgets/agent/types/agent';

function createInfra() {
  const token = ref('');
  const model = ref('auto');
  const existingTopicId = ref('');
  const statusText = ref('');
  const statusType = ref<'info' | 'warning' | 'success' | 'danger'>('info');
  const engine = {
    state: {
      streaming: false,
      getLLMById: vi.fn(() => 'llm-info')
    },
    project: { value: { toDsl: () => ({}) } },
    current: { value: { toDsl: () => ({}) } },
    toolRegistry: { generateToolDescriptions: () => [] }
  };
  const infra: DualAgentInfrastructure = {
    token,
    model,
    existingTopicId,
    setTopicId: vi.fn(),
    getEngine: () => engine as any,
    registerTools: vi.fn(),
    abortSse: vi.fn(),
    access: { getData: () => ({ id: 'u1', name: 'Alice' }) } as any,
    statusText,
    statusType
  };
  return { infra, engine };
}

function createApi(): DualAgentApi {
  return {
    apiPost: vi.fn(async (url: string) => {
      if (url === '/api/open/topic/post/:token') {
        return { topic: { id: 't1', userId: 'u1' }, chat: { id: 'c1' } };
      }
      if (url === '/api/open/chat/post/:token') {
        return { chat: { id: 'c2' } };
      }
      return {};
    }),
    streamCompletion: vi.fn(),
    executeArchitectPlan: vi.fn(async () => {})
  };
}

function createState(): DualAgentState {
  return { conversationRounds: ref<ConversationRound[]>([]) };
}

function createRound(): ConversationRound {
  return reactive({
    id: 'r1',
    userMessage: '创建页面',
    architectChatId: 'c1',
    architectPlan: { intent: '旧计划', safety: 'readonly', steps: [] },
    architectAnswer: '旧回答',
    architectStreamText: '旧文本',
    reasoningText: '旧推理',
    editorResults: [
      {
        stepIdx: 0,
        step: { id: 's1', type: 'text', description: '步骤' },
        content: '',
        reasoning: '',
        error: null,
        done: true,
        turns: []
      }
    ],
    summaryText: '旧总结',
    summaryReasoning: '',
    summaryError: '旧错误'
  });
}

describe('useDualAgent', () => {
  it('validates token before starting a new conversation', async () => {
    const { infra } = createInfra();
    const api = createApi();
    const state = createState();
    const { startDualAgent } = useDualAgent(infra, api, state, () => 'hi');

    await startDualAgent();

    expect(infra.statusText.value).toBe('❌ 请先获取 Token');
    expect(infra.statusType.value).toBe('danger');
    expect(api.apiPost).not.toHaveBeenCalled();
    expect(api.executeArchitectPlan).not.toHaveBeenCalled();
  });

  it('validates the prompt before starting a new conversation', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    const state = createState();
    const { startDualAgent } = useDualAgent(infra, api, state);

    await startDualAgent();

    expect(infra.statusText.value).toBe('❌ 请输入消息或上传文件');
    expect(api.apiPost).not.toHaveBeenCalled();
  });

  it('starts a new topic and runs the architect plan', async () => {
    const { infra, engine } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    const state = createState();
    const { running, startDualAgent } = useDualAgent(
      infra,
      api,
      state,
      () => '创建一个页面'
    );

    await startDualAgent();

    const topicCall = (api.apiPost as any).mock.calls.find(
      (c: any[]) => c[0] === '/api/open/topic/post/:token'
    )!;
    expect(topicCall[1]).toMatchObject({
      model: 'auto',
      prompt: '创建一个页面',
      agent: 'architect',
      userId: 'u1',
      userName: 'Alice'
    });
    expect(infra.setTopicId).toHaveBeenCalledWith('t1');
    expect(state.conversationRounds.value).toHaveLength(1);
    expect(state.conversationRounds.value[0].architectChatId).toBe('c1');
    expect(api.executeArchitectPlan).toHaveBeenCalledTimes(1);
    const planCall = (api.executeArchitectPlan as any).mock.calls[0];
    expect(planCall[0]).toBe('t1');
    expect(planCall[1]).toBe('c1');
    expect(planCall[2]).toBe('u1');
    expect(planCall[4]).toBe('创建一个页面');
    expect(running.value).toBe(false);
    expect(engine.state.streaming).toBe(false);
    expect(infra.registerTools).toHaveBeenCalledTimes(1);
  });

  it('requires a topic id before continuing a conversation', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    const state = createState();
    const { continueConversation } = useDualAgent(
      infra,
      api,
      state,
      () => '追加问题'
    );

    await continueConversation();

    expect(infra.statusText.value).toBe('❌ 请输入 Topic ID');
    expect(api.apiPost).not.toHaveBeenCalled();
  });

  it('continues a conversation on the existing topic', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    infra.existingTopicId.value = 't-9';
    const api = createApi();
    const state = createState();
    const { continueConversation } = useDualAgent(
      infra,
      api,
      state,
      () => '继续修改'
    );

    await continueConversation();

    const chatCall = (api.apiPost as any).mock.calls.find(
      (c: any[]) => c[0] === '/api/open/chat/post/:token'
    )!;
    expect(chatCall[1]).toMatchObject({
      topicId: 't-9',
      prompt: '继续修改',
      agent: 'architect'
    });
    expect(state.conversationRounds.value).toHaveLength(1);
    expect(state.conversationRounds.value[0].architectChatId).toBe('c2');
    const planCall = (api.executeArchitectPlan as any).mock.calls[0];
    expect(planCall[0]).toBe('t-9');
  });

  it('abortAll cancels the flow controller and aborts SSE', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    // 保持 executeArchitectPlan 未完成，以便在流程运行中触发 abort
    let release: () => void = () => {};
    api.executeArchitectPlan = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          release = resolve;
        })
    );
    const state = createState();
    const { startDualAgent, abortAll } = useDualAgent(
      infra,
      api,
      state,
      () => '任务'
    );

    const promise = startDualAgent();
    await new Promise((r) => setTimeout(r, 0));
    abortAll();

    expect(infra.abortSse).toHaveBeenCalledTimes(1);
    const signal = (api.executeArchitectPlan as any).mock.calls[0][6];
    expect(signal.aborted).toBe(true);
    release();
    await promise;
  });

  it('rejects retry when no round exists', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    const state = createState();
    const { retryLastRound } = useDualAgent(infra, api, state, () => '');

    await retryLastRound();

    expect(infra.statusText.value).toBe('❌ 没有可重试的轮次');
    expect(api.executeArchitectPlan).not.toHaveBeenCalled();
  });

  it('rejects retry when the topic id is missing', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    const state = createState();
    state.conversationRounds.value.push(createRound());
    const { retryLastRound } = useDualAgent(infra, api, state, () => '');

    await retryLastRound();

    expect(infra.statusText.value).toBe('❌ 缺少 Topic ID，无法重试');
    expect(api.executeArchitectPlan).not.toHaveBeenCalled();
  });

  it('retries the last round with reset state', async () => {
    const { infra } = createInfra();
    infra.token.value = 'tk';
    infra.existingTopicId.value = 't-9';
    const api = createApi();
    const state = createState();
    const round = createRound();
    state.conversationRounds.value.push(round);
    const { retryLastRound } = useDualAgent(infra, api, state, () => '');

    await retryLastRound();

    expect(round.architectPlan).toBeNull();
    expect(round.architectAnswer).toBe('');
    expect(round.architectStreamText).toBe('');
    expect(round.editorResults).toHaveLength(0);
    expect(round.summaryText).toBe('');
    expect(round.summaryError).toBe('');
    expect(api.executeArchitectPlan).toHaveBeenCalledTimes(1);
    const planCall = (api.executeArchitectPlan as any).mock.calls[0];
    expect(planCall[0]).toBe('t-9');
    expect(planCall[1]).toBe('c1');
    expect(planCall[4]).toBe('创建页面');
  });

  it('exposes flow errors through the status text', async () => {
    const { infra, engine } = createInfra();
    infra.token.value = 'tk';
    const api = createApi();
    api.apiPost = vi.fn(async () => {
      throw new Error('接口失败');
    });
    const state = createState();
    const { running, startDualAgent } = useDualAgent(
      infra,
      api,
      state,
      () => '任务'
    );

    await startDualAgent();

    expect(infra.statusText.value).toBe('❌ 错误: 接口失败');
    expect(infra.statusType.value).toBe('danger');
    expect(running.value).toBe(false);
    expect(engine.state.streaming).toBe(false);
  });
});
