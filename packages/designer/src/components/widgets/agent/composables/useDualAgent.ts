/**
 * 双代理顶层编排
 * 组合 Auth / Designer / SSE / 业务逻辑，提供 startDualAgent 和 continueConversation
 *
 * 重构: 参数对象化，提取共享流程，修复类型
 */
import { ref, reactive } from 'vue';
import type {
  ConversationRound,
  AttachmentInfo,
  DualAgentInfrastructure,
  DualAgentApi,
  DualAgentState,
  AgentTopicBody,
  AgentChatBody
} from '../types/agent';
import { stripFileDescBlocks } from '../utils/filePrompt';
import { Messages } from '../utils/messages';
import { genId } from '../utils/genId';

/** 创建空对话轮次 */
function createEmptyRound(userMessage: string): ConversationRound {
  return {
    id: genId('round'),
    userMessage,
    architectChatId: '',
    architectPlan: null,
    architectAnswer: '',
    architectStreamText: '',
    reasoningText: '',
    editorResults: [],
    summaryText: '',
    summaryReasoning: '',
    summaryError: '',
    summaryAttempt: 0
  };
}

export function useDualAgent(
  infra: DualAgentInfrastructure,
  api: DualAgentApi,
  state: DualAgentState,
  promptBuilder?: () => string,
  attachmentsBuilder?: () => AttachmentInfo[],
  clearAttachments?: () => void
) {
  const running = ref(false);
  const userMessage = ref('');
  /** 当前流程是否被用户取消（供 UI 展示“恢复”操作） */
  const cancelled = ref(false);

  // ── 解构 infra (仅内部使用) ──
  const {
    token,
    model,
    existingTopicId,
    setTopicId,
    getEngine,
    registerTools,
    abortSse,
    setStatus
  } = infra;

  const {
    postTopic,
    postChat,
    executeArchitectPlan,
    retryEditorPlan,
    resumeEditorPlan,
    retrySummary: executeSummaryRetry
  } = api;
  const { conversationRounds } = state;

  /** 当前流程的取消控制器，用于中断工作流编排（非仅 SSE） */
  let flowAbortController: AbortController | null = null;
  let lastFailedSubmission: (() => Promise<void>) | null = null;

  /** 构建最终提示词：用户文本 + 文件识别描述 */
  function getFinalPrompt(): string {
    return promptBuilder ? promptBuilder() : userMessage.value;
  }

  /** 验证前置条件 */
  function validate(prompt: string): boolean {
    if (!token.value) {
      setStatus(Messages.tokenMissing);
      return false;
    }
    if (!prompt.trim()) {
      setStatus(Messages.promptEmpty);
      return false;
    }
    return true;
  }

  // ── 核心流程 (start 和 continue 共享) ──

  /**
   * 执行双代理流程的统一入口
   * @param setup 异步 setup 函数，接收 { finalPrompt（提交用）, userText（气泡展示用）, attachments（附件快照） }
   */
  async function executeFlow(
    setup: (
      finalPrompt: string,
      userText: string,
      attachments: AttachmentInfo[]
    ) => Promise<{
      topicId: string;
      userId: string;
      chatId: string;
      round: ConversationRound;
    }>,
    promptOverride?: string
  ) {
    const finalPrompt = promptOverride ?? getFinalPrompt();
    if (!validate(finalPrompt)) return;

    // 气泡展示的纯文本（不含文件识别描述）；
    // 失败重试场景下用户输入框已清空，从提交的 prompt 还原纯文本
    const userText = promptOverride
      ? stripFileDescBlocks(finalPrompt)
      : userMessage.value.trim();
    // 附件快照（与输入框 files 解耦，发送后清空附件区不影响气泡）
    const attachments = attachmentsBuilder ? attachmentsBuilder() : [];

    running.value = true;
    cancelled.value = false;
    flowAbortController = new AbortController();
    const engine = getEngine();
    if (engine) engine.state.streaming = true;
    try {
      registerTools();
      const { topicId, userId, chatId, round } = await setup(
        finalPrompt,
        userText,
        attachments
      );
      // round 已入列且快照已生成，清空输入框附件区
      clearAttachments?.();
      const traceId = genId('trace');
      await executeArchitectPlan(
        topicId,
        chatId,
        userId,
        traceId,
        finalPrompt,
        round,
        flowAbortController.signal
      );
      lastFailedSubmission = null;
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        lastFailedSubmission = () => executeFlow(setup, finalPrompt);
      }
      setStatus(Messages.error(e.message));
    } finally {
      if (engine) engine.state.streaming = false;
      running.value = false;
      cancelled.value = !!flowAbortController?.signal.aborted;
      flowAbortController = null;
    }
  }

  /** 启动新话题双代理流程 */
  async function startDualAgent() {
    const requestId = genId('trace');
    await executeFlow(async (finalPrompt, userText, attachments) => {
      // 新开对话：清空所有历史轮次
      conversationRounds.value = [];

      setStatus(Messages.creatingTopic);

      const userData = infra.access?.getData();
      const topicBody: AgentTopicBody = {
        model: model.value,
        llm: JSON.stringify(getEngine()?.state.getLLMById(model.value) || ''),
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
        userName: userData?.name || '',
        files: attachments.length ? JSON.stringify(attachments) : undefined,
        requestId
      };

      const topicRes = await postTopic(topicBody);
      const topic = topicRes.topic || topicRes;
      const architectChat = topicRes.chat || topicRes;
      const topicId = topic.id || topic.topicId;
      const userId = topic.userId || '';
      setTopicId(topicId);

      setStatus(Messages.topicCreated(topicId));

      const round = reactive(createEmptyRound(userText));
      round.attachments = attachments;
      round.promptSent = finalPrompt;
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
      setStatus(Messages.topicIdMissing);
      return;
    }

    const requestId = genId('trace');
    await executeFlow(async (finalPrompt, userText, attachments) => {
      setStatus(Messages.creatingArchitectChat);

      const chatBody: AgentChatBody = {
        topicId: tid,
        prompt: finalPrompt,
        agent: 'architect',
        source: '',
        files: attachments.length ? JSON.stringify(attachments) : undefined,
        requestId
      };

      const chatRes = await postChat(chatBody);
      const chat = chatRes.chat || chatRes;
      const chatId = chat.id || chat.chatId || '';

      // 追加新轮次
      const round = reactive(createEmptyRound(userText));
      round.attachments = attachments;
      round.promptSent = finalPrompt;
      conversationRounds.value.push(round);
      round.architectChatId = chatId;

      const userData = infra.access?.getData();
      const userId = userData?.id || '';
      return { topicId: tid, userId, chatId, round };
    });
  }

  /** 中止当前工作流：取消编排信号 + 中断 SSE 流 */
  function abortAll() {
    flowAbortController?.abort();
    abortSse();
  }

  async function runRetry(task: (signal: AbortSignal) => Promise<void>) {
    if (running.value) return;
    running.value = true;
    cancelled.value = false;
    flowAbortController = new AbortController();
    const engine = getEngine();
    if (engine) engine.state.streaming = true;
    try {
      registerTools();
      await task(flowAbortController.signal);
    } catch (e: any) {
      setStatus(Messages.retryFailed(e.message));
    } finally {
      if (engine) engine.state.streaming = false;
      running.value = false;
      cancelled.value = !!flowAbortController?.signal.aborted;
      flowAbortController = null;
    }
  }

  function getRetryContext() {
    // 放开“只能重试最后一轮”限制：任何轮次只要处于失败/取消态即可重试
    const topicId = existingTopicId.value.trim();
    if (!topicId) throw new Error(Messages.retryTopicIdMissing.text);
    return {
      topicId,
      userId: infra.access?.getData()?.id || '',
      traceId: genId('trace')
    };
  }

  async function retryStep(round: ConversationRound, stepIndex: number) {
    await runRetry(async (signal) => {
      const { topicId, userId, traceId } = getRetryContext();
      if (!round.editorResults[stepIndex]?.error) {
        throw new Error(Messages.stepNotFailed.text);
      }
      setStatus(Messages.retryingStep(stepIndex + 1));
      await retryEditorPlan(
        topicId,
        userId,
        traceId,
        round.promptSent || round.userMessage,
        round,
        stepIndex,
        signal
      );
    });
  }

  async function retrySummary(round: ConversationRound) {
    await runRetry(async (signal) => {
      const { topicId, userId, traceId } = getRetryContext();
      setStatus(Messages.retryingSummary);
      await executeSummaryRetry(
        topicId,
        userId,
        traceId,
        round.promptSent || round.userMessage,
        round,
        signal
      );
    });
  }

  async function retryArchitectRound(round: ConversationRound, label = '重试') {
    let context: ReturnType<typeof getRetryContext>;
    try {
      context = getRetryContext();
      if (!round.architectChatId) {
        throw new Error(Messages.architectChatIdMissing.text);
      }
    } catch (e: any) {
      setStatus(Messages.error(e.message));
      return;
    }

    await runRetry(async (signal) => {
      round.architectPlan = null;
      round.architectAnswer = '';
      round.architectStreamText = '';
      round.reasoningText = '';
      round.editorResults = [];
      round.summaryText = '';
      round.summaryReasoning = '';
      round.summaryError = '';
      setStatus(Messages.retryArchitect(label));
      await executeArchitectPlan(
        context.topicId,
        round.architectChatId,
        context.userId,
        context.traceId,
        round.promptSent || round.userMessage,
        round,
        signal
      );
    });
  }

  /** 根据最后一轮的失败位置选择最小重试范围（label 用于区分重试/恢复文案） */
  async function retryLastRound(label = '重试') {
    const lastRound =
      conversationRounds.value[conversationRounds.value.length - 1];
    if (!lastRound) {
      if (lastFailedSubmission) {
        setStatus(Messages.retryingLastRequest);
        return lastFailedSubmission();
      }
      setStatus(Messages.noRetryRound);
      return;
    }
    if (!existingTopicId.value.trim()) {
      setStatus(Messages.retryTopicIdMissing);
      return;
    }
    const failedStep = lastRound.editorResults.findIndex((item) => item.error);
    if (failedStep >= 0) return retryStep(lastRound, failedStep);
    if (lastRound.summaryError) return retrySummary(lastRound);
    return retryArchitectRound(lastRound, label);
  }

  /**
   * 从取消断点恢复最后一轮：
   * - 规划阶段取消（architectPlan 为空）→ 重跑 Architect 规划
   * - 步骤执行中取消 → 从断点步骤续跑（跳过已完成步骤）
   * - 总结阶段取消 → 仅重新生成总结
   */
  async function resumeLastRound() {
    const lastRound =
      conversationRounds.value[conversationRounds.value.length - 1];
    if (!lastRound) {
      setStatus(Messages.noResumeRound);
      return;
    }
    if (!existingTopicId.value.trim()) {
      setStatus(Messages.resumeTopicIdMissing);
      return;
    }

    // 规划阶段取消：复用 architectChatId 重跑规划（自动清空该轮规划字段）
    if (!lastRound.architectPlan) {
      return retryArchitectRound(lastRound, '恢复');
    }

    // 步骤/总结阶段取消：断点续跑
    await runRetry(async (signal) => {
      const { topicId, userId, traceId } = getRetryContext();
      await resumeEditorPlan(
        topicId,
        userId,
        traceId,
        lastRound.promptSent || lastRound.userMessage,
        lastRound,
        signal
      );
    });
  }

  return {
    running,
    userMessage,
    cancelled,
    startDualAgent,
    continueConversation,
    retryLastRound,
    retryStep,
    retrySummary,
    resumeLastRound,
    abortAll
  };
}
