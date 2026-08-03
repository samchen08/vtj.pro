/**
 * 双代理顶层编排
 * 组合 Auth / Designer / SSE / 业务逻辑，提供 startDualAgent 和 continueConversation
 *
 * 重构: 参数对象化，提取共享流程，修复类型
 */
import { ref, toRef, reactive } from 'vue';
import type { Ref } from 'vue';
import type {
  PlanResult,
  ConversationRound,
  EditorStepResult,
  DualAgentInfrastructure,
  DualAgentApi,
  DualAgentState
} from '../types/agent';
import type { ArchPlanTargets } from './useArchitectPlan';

/** 生成 trace ID */
function generateTraceId(): string {
  return `trace_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** 默认用户提示语 */
const DEFAULT_USER_MESSAGE = '创建一个包含标题和按钮的简单欢迎页面';

/** 创建空对话轮次 */
function createEmptyRound(userMessage: string): ConversationRound {
  return {
    id: `round_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    userMessage,
    architectChatId: '',
    architectPlan: null,
    architectAnswer: '',
    architectStreamText: '',
    reasoningText: '',
    editorResults: [],
    summaryText: '',
    summaryReasoning: '',
    summaryError: ''
  };
}

export function useDualAgent(
  infra: DualAgentInfrastructure,
  api: DualAgentApi,
  state: DualAgentState,
  promptBuilder?: () => string
) {
  const running = ref(false);
  const userMessage = ref(DEFAULT_USER_MESSAGE);

  // ── 解构 infra (仅内部使用) ──
  const {
    token,
    model,
    existingTopicId,
    setTopicId,
    getEngine,
    registerTools,
    abortSse
  } = infra;

  const { apiPost, executeArchitectPlan } = api;
  const { conversationRounds } = state;

  /** 当前流程的取消控制器，用于中断工作流编排（非仅 SSE） */
  let flowAbortController: AbortController | null = null;

  /** 构建最终提示词：用户文本 + 文件识别描述 */
  function getFinalPrompt(): string {
    return promptBuilder ? promptBuilder() : userMessage.value;
  }

  /** 构建 round 对应的 ArchPlanTargets */
  function buildTargets(round: ConversationRound): ArchPlanTargets {
    return {
      architectPlan: toRef(round, 'architectPlan') as Ref<PlanResult | null>,
      architectAnswer: toRef(round, 'architectAnswer') as Ref<string>,
      architectStreamText: toRef(round, 'architectStreamText') as Ref<string>,
      reasoningText: toRef(round, 'reasoningText') as Ref<string>,
      editorResults: toRef(round, 'editorResults') as Ref<EditorStepResult[]>,
      summaryText: toRef(round, 'summaryText') as Ref<string>,
      summaryReasoning: toRef(round, 'summaryReasoning') as Ref<string>,
      summaryError: toRef(round, 'summaryError') as Ref<string>
    };
  }

  /** 验证前置条件 */
  function validate(prompt: string): boolean {
    if (!token.value) {
      infra.statusText.value = '❌ 请先获取 Token';
      infra.statusType.value = 'danger';
      return false;
    }
    if (!prompt.trim()) {
      infra.statusText.value = '❌ 请输入消息或上传文件';
      infra.statusType.value = 'danger';
      return false;
    }
    return true;
  }

  // ── 核心流程 (start 和 continue 共享) ──

  /**
   * 执行双代理流程的统一入口
   * @param setup 异步 setup 函数，接收 finalPrompt，返回 { topicId, userId, chatId, round }
   */
  async function executeFlow(
    setup: (finalPrompt: string) => Promise<{
      topicId: string;
      userId: string;
      chatId: string;
      round: ConversationRound;
    }>
  ) {
    const finalPrompt = getFinalPrompt();
    if (!validate(finalPrompt)) return;

    running.value = true;
    flowAbortController = new AbortController();
    try {
      registerTools();
      const { topicId, userId, chatId, round } = await setup(finalPrompt);
      const traceId = generateTraceId();
      await executeArchitectPlan(
        topicId,
        chatId,
        userId,
        traceId,
        finalPrompt,
        buildTargets(round),
        flowAbortController.signal
      );
    } catch (e: any) {
      infra.statusText.value = `❌ 错误: ${e.message}`;
      infra.statusType.value = 'danger';
    } finally {
      running.value = false;
      flowAbortController = null;
    }
  }

  /** 启动新话题双代理流程 */
  async function startDualAgent() {
    await executeFlow(async (finalPrompt) => {
      // 新开对话：清空所有历史轮次
      conversationRounds.value = [];

      infra.statusText.value = '创建话题 (architect)...';
      infra.statusType.value = 'info';

      const userData = infra.access.getData();
      const topicBody = {
        model: model.value,
        prompt: finalPrompt,
        project: JSON.stringify(getEngine()?.project.value?.toDsl() || {}),
        dsl: JSON.stringify(getEngine()?.current.value?.toDsl() || {}),
        source: '',
        tools: JSON.stringify(
          getEngine()?.toolRegistry?.generateToolDescriptions?.() || []
        ),
        options: JSON.stringify({}),
        agent: 'architect' as const,
        userId: userData?.id || '',
        userName: userData?.name || ''
      };

      const topicRes = await apiPost('/api/open/topic/post/:token', topicBody);
      const topic = topicRes.topic || topicRes;
      const architectChat = topicRes.chat || topicRes;
      const topicId = topic.id || topic.topicId;
      const userId = topic.userId || '';
      setTopicId(topicId);

      infra.statusText.value = `话题创建成功: ${topicId}`;
      infra.statusType.value = 'success';

      const round = reactive(createEmptyRound(finalPrompt));
      conversationRounds.value.push(round);

      const chatId = architectChat.id || architectChat.chatId || '';
      round.architectChatId = chatId;
      return { topicId, userId, chatId, round };
    });
  }

  /** 追加对话到已有话题 */
  async function continueConversation() {
    const tid = existingTopicId.value.trim();
    if (!tid) {
      infra.statusText.value = '❌ 请输入 Topic ID';
      infra.statusType.value = 'danger';
      return;
    }

    await executeFlow(async (finalPrompt) => {
      infra.statusText.value = '创建 Architect 聊天...';
      infra.statusType.value = 'info';

      const chatRes = await apiPost('/api/open/chat/post/:token', {
        topicId: tid,
        prompt: finalPrompt,
        agent: 'architect',
        source: ''
      });
      const chat = chatRes.chat || chatRes;
      const chatId = chat.id || chat.chatId || '';

      // 追加新轮次
      const round = reactive(createEmptyRound(finalPrompt));
      conversationRounds.value.push(round);
      round.architectChatId = chatId;

      const userData = infra.access.getData();
      const userId = userData?.id || '';
      return { topicId: tid, userId, chatId, round };
    });
  }

  /** 中止当前工作流：取消编排信号 + 中断 SSE 流 */
  function abortAll() {
    flowAbortController?.abort();
    abortSse();
  }

  /** 重试最后一轮失败的 Architect 规划 */
  async function retryLastRound() {
    const lastRound =
      conversationRounds.value[conversationRounds.value.length - 1];
    if (!lastRound) {
      infra.statusText.value = '❌ 没有可重试的轮次';
      infra.statusType.value = 'danger';
      return;
    }

    const topicId = existingTopicId.value.trim();
    if (!topicId) {
      infra.statusText.value = '❌ 缺少 Topic ID，无法重试';
      infra.statusType.value = 'danger';
      return;
    }

    // 重置最后一轮状态
    lastRound.architectPlan = null;
    lastRound.architectAnswer = '';
    lastRound.architectStreamText = '';
    lastRound.reasoningText = '';
    lastRound.editorResults = [];
    lastRound.summaryText = '';
    lastRound.summaryReasoning = '';
    lastRound.summaryError = '';

    running.value = true;
    flowAbortController = new AbortController();

    try {
      registerTools();

      infra.statusText.value = '重试 Architect 规划...';
      infra.statusType.value = 'warning';

      // 复用已有 Architect chat 记录，避免重复插入
      const chatId = lastRound.architectChatId;
      if (!chatId) {
        infra.statusText.value = '❌ 该轮次缺少 Architect chat ID，无法重试';
        infra.statusType.value = 'danger';
        return;
      }

      const userData = infra.access.getData();
      const userId = userData?.id || '';
      const traceId = generateTraceId();

      await executeArchitectPlan(
        topicId,
        chatId,
        userId,
        traceId,
        lastRound.userMessage,
        buildTargets(lastRound),
        flowAbortController.signal
      );
    } catch (e: any) {
      infra.statusText.value = `❌ 重试失败: ${e.message}`;
      infra.statusType.value = 'danger';
    } finally {
      running.value = false;
      flowAbortController = null;
    }
  }

  return {
    running,
    userMessage,
    startDualAgent,
    continueConversation,
    retryLastRound,
    abortAll
  };
}
