/**
 * Architect 规划执行
 * 调用 Architect → 解析计划 → 保存 → 分流（直接回复 or Editor 执行）→ 总结
 */
import type {
  PlanResult,
  StepRecord,
  EditorStepResult,
  ConversationRound,
  ArchitectPlanDeps,
  StreamCompletionResult
} from '../types/agent';
import type { AgentStatusMessage } from '../utils/messages';
import { parsePlanOutput } from '../utils/plan';
import { pickChat } from '../utils/response';
import { Messages } from '../utils/messages';
import { buildSummaryPrompt } from '../utils/summary';
import { buildChatSaveBody } from '../utils/chat';

/** Architect 输出无效时的自动重试次数上限（大模型偶发输出空白/异常，重试一次通常可恢复） */
const MAX_ARCHITECT_RETRIES = 1;

export function useArchitectPlan(deps: ArchitectPlanDeps) {
  const {
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    saveTrace,
    setStatus,
    executeEditorStep
  } = deps;

  const toStepRecord = (result: EditorStepResult): StepRecord => ({
    stepId: result.step.id,
    type: result.step.type,
    description: result.step.description,
    status: result.error ? 'failed' : 'completed',
    content: result.content,
    error: result.error,
    tokens: result.tokens || 0,
    duration: result.duration || 0
  });

  async function generateSummary(
    topicId: string,
    userId: string,
    userMessage: string,
    round: ConversationRound,
    records: StepRecord[],
    signal?: AbortSignal
  ): Promise<number> {
    round.summaryText = '';
    round.summaryReasoning = '';
    round.summaryError = '';
    setStatus(Messages.generatingSummary);

    try {
      const summaryChatRes = await postChat({
        topicId,
        prompt: buildSummaryPrompt(userMessage, round.architectPlan, records),
        agent: 'editor',
        stepId: 'summary',
        attempt: ++round.summaryAttempt,
        userId: userId || '',
        userName: ''
      });
      const { chatId: summaryChatId } = pickChat(summaryChatRes);
      const summaryResult = await streamCompletion(
        topicId,
        summaryChatId,
        (text) => {
          round.summaryText += text;
        },
        (reasoning) => {
          round.summaryReasoning += reasoning;
        }
      );
      if (signal?.aborted) return 0;

      await saveChat(
        buildChatSaveBody({
          id: summaryChatId,
          topicId,
          userId,
          content: round.summaryText,
          result: summaryResult,
          tokens: summaryResult.usage?.total_tokens || 0
        })
      );
      return summaryResult.usage?.total_tokens || 0;
    } catch (e: any) {
      round.summaryError = e.message || String(e);
      console.warn('总结生成失败:', e.message);
      return 0;
    }
  }

  /**
   * 收尾：更新 topic 状态 + 保存 trace（executeArchitectPlan / executeEditorPlan 共用）
   */
  async function finalizeFlow(opts: {
    topicId: string;
    traceId: string;
    status: 'failed' | 'completed';
    planJson?: PlanResult | null;
    stepsJson: StepRecord[];
    totalTokens: number;
    startTime: number;
  }) {
    await updateTopic({
      id: opts.topicId,
      status: opts.status,
      traceId: opts.traceId
    });
    await saveTrace({
      traceId: opts.traceId,
      topicId: opts.topicId,
      planJson: opts.planJson ?? null,
      stepsJson: opts.stepsJson,
      finalStatus: opts.status,
      totalTokens: opts.totalTokens,
      totalDuration: Date.now() - opts.startTime
    });
  }

  /**
   * 总结收尾：保存 trace + 状态（retrySummary / resumeEditorPlan 总结分支共用）
   */
  async function saveSummaryTrace(opts: {
    traceId: string;
    topicId: string;
    round: ConversationRound;
    records: StepRecord[];
    totalTokens: number;
    startTime: number;
    successMessage: AgentStatusMessage;
  }) {
    const failed = !!opts.round.summaryError;
    await saveTrace({
      traceId: opts.traceId,
      topicId: opts.topicId,
      planJson: opts.round.architectPlan,
      stepsJson: opts.records,
      finalStatus: failed ? 'failed' : 'completed',
      totalTokens: opts.totalTokens,
      totalDuration: Date.now() - opts.startTime
    });
    setStatus(
      failed
        ? Messages.summaryFailed(opts.round.summaryError)
        : opts.successMessage
    );
  }

  async function executeEditorPlan(
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    startStep: number,
    initialTokens: number,
    signal?: AbortSignal,
    retrySlot?: EditorStepResult
  ) {
    const startTime = Date.now();
    const steps = round.architectPlan?.steps || [];
    const records = round.editorResults.slice(0, startStep).map(toStepRecord);
    let totalTokens =
      initialTokens + records.reduce((sum, item) => sum + item.tokens, 0);
    let failedStep = -1;

    for (let i = startStep; i < steps.length; i++) {
      if (signal?.aborted) {
        setStatus(Messages.cancelledWithProgress(i, steps.length));
        return;
      }

      const stepResult = await executeEditorStep(
        topicId,
        userId,
        steps[i],
        i,
        steps,
        Date.now(),
        round.editorResults,
        signal,
        i === startStep ? retrySlot : undefined
      );
      const slot =
        (i === startStep && retrySlot) ||
        round.editorResults[round.editorResults.length - 1];
      if (slot) {
        slot.tokens = stepResult.tokens;
        slot.duration = stepResult.duration;
      }
      totalTokens += stepResult.tokens;
      records.push(
        slot
          ? toStepRecord(slot)
          : {
              stepId: steps[i].id,
              type: steps[i].type,
              description: steps[i].description,
              status: stepResult.error ? 'failed' : 'completed',
              content: stepResult.content,
              error: stepResult.error,
              tokens: stepResult.tokens,
              duration: stepResult.duration
            }
      );

      if (stepResult.error) {
        failedStep = i;
        break;
      }
    }

    if (signal?.aborted) {
      setStatus(Messages.cancelled);
      return;
    }

    if (failedStep < 0) {
      totalTokens += await generateSummary(
        topicId,
        userId,
        userMessage,
        round,
        records,
        signal
      );
    }

    if (signal?.aborted) {
      setStatus(Messages.cancelled);
      return;
    }

    const status = failedStep >= 0 ? 'failed' : 'completed';
    await finalizeFlow({
      topicId,
      traceId,
      status,
      planJson: round.architectPlan,
      stepsJson: records,
      totalTokens,
      startTime
    });

    if (failedStep >= 0) {
      setStatus(Messages.stepFailed(failedStep + 1));
    } else if (round.summaryError) {
      setStatus(Messages.summaryFailed(round.summaryError));
    } else {
      setStatus(Messages.allStepsDone(steps.length));
    }
  }

  /**
   * 执行 Architect 规划 → Editor 步骤 → 总结 的完整流程
   */
  async function executeArchitectPlan(
    topicId: string,
    architectChatId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    signal?: AbortSignal
  ) {
    const startTime = Date.now();
    let totalTokens = 0;

    /** 检查是否已取消，若取消则提前退出 */
    function isCancelled(): boolean {
      return signal?.aborted ?? false;
    }

    // ── Architect 流式规划（含自动重试：大模型偶发输出空白/无效内容） ──
    setStatus(Messages.architectPlanning);
    round.architectStreamText = '';
    round.reasoningText = '';
    round.architectError = '';

    /** 流式拉取 Architect 输出（复用同一 chat 重发） */
    const streamArchitect = () =>
      streamCompletion(
        topicId,
        architectChatId,
        (text) => {
          round.architectStreamText += text;
        },
        (r) => {
          round.reasoningText += r;
        }
      );

    // 保存最后一次流式结果（保存 chat 时使用，含 usage 统计）
    let planResult: StreamCompletionResult | null = null;
    planResult = await streamArchitect();
    totalTokens += planResult.usage?.total_tokens || 0;

    // 解析计划 JSON（括号配对扫描，避免贪婪正则截断）+ 结构校验，
    // 排除大模型输出的错误占位内容（如 {"error": ...}）或空白输出
    let { plan, error: planError } = parsePlanOutput(round.architectStreamText);
    let retryCount = 0;

    // 输出无效时自动重试，直至成功、达到上限或取消
    while (!plan && retryCount < MAX_ARCHITECT_RETRIES && !isCancelled()) {
      retryCount++;
      round.architectRetryCount = retryCount;
      round.architectStreamText = '';
      round.reasoningText = '';
      setStatus(
        Messages.architectRetrying(retryCount, MAX_ARCHITECT_RETRIES + 1)
      );
      planResult = await streamArchitect();
      totalTokens += planResult.usage?.total_tokens || 0;
      const parsed = parsePlanOutput(round.architectStreamText);
      plan = parsed.plan;
      // 保留模型自报的错误说明（如缺少关键信息），供最终失败时反馈
      if (parsed.error) planError = parsed.error;
    }

    // 检查取消信号：SSE 流被中断后不应继续执行后续操作
    if (isCancelled()) {
      setStatus(Messages.cancelled);
      return;
    }

    round.architectPlan = plan;

    // ── 保存 Architect chat（保存最终一次流式输出） ──
    await saveChat(
      buildChatSaveBody({
        id: architectChatId,
        topicId,
        userId,
        content: round.architectStreamText || ' ',
        result: planResult,
        tokens: planResult?.usage?.total_tokens || 0
      })
    );

    // ── 计划为空 → 记录错误并标记失败 ──
    if (!round.architectPlan) {
      // 优先反馈大模型自报的错误（如缺少关键信息），否则使用通用文案
      round.architectError = planError || Messages.planInvalid.text;
      setStatus(
        planError ? Messages.architectFailed(planError) : Messages.planInvalid
      );
      await finalizeFlow({
        topicId,
        traceId,
        status: 'failed',
        stepsJson: [],
        totalTokens,
        startTime
      });
      return;
    }

    // 更新 topic 为 executing
    await updateTopic({
      id: topicId,
      planJson: round.architectPlan,
      status: 'executing',
      traceId
    });

    // ── 分流：无步骤 → 直接回复 ──
    const steps = round.architectPlan.steps;
    if (!steps || steps.length === 0) {
      const answer =
        round.architectPlan.answer || round.architectPlan.intent || '(无回复)';
      round.architectAnswer = answer;
      setStatus(Messages.architectAnswered);
      await finalizeFlow({
        topicId,
        traceId,
        status: 'completed',
        planJson: round.architectPlan,
        stepsJson: [],
        totalTokens,
        startTime
      });
      return;
    }

    setStatus(Messages.planGenerated(round.architectPlan.intent));
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      round,
      0,
      totalTokens,
      signal
    );
  }

  async function retryEditorPlan(
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    stepIndex: number,
    signal?: AbortSignal
  ) {
    const retrySlot = round.editorResults[stepIndex];
    if (!round.architectPlan || !retrySlot?.error) {
      throw new Error(Messages.stepNotRetryable.text);
    }

    round.editorResults.splice(stepIndex + 1);
    round.summaryText = '';
    round.summaryReasoning = '';
    round.summaryError = '';
    await updateTopic({ id: topicId, status: 'executing', traceId });
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      round,
      stepIndex,
      0,
      signal,
      retrySlot
    );
  }

  async function retrySummary(
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    signal?: AbortSignal
  ) {
    if (!round.architectPlan || !round.summaryError) {
      throw new Error(Messages.summaryNotRetryable.text);
    }
    const startTime = Date.now();
    const records = round.editorResults.map(toStepRecord);
    const totalTokens = await generateSummary(
      topicId,
      userId,
      userMessage,
      round,
      records,
      signal
    );
    if (signal?.aborted) return;

    await saveSummaryTrace({
      traceId,
      topicId,
      round,
      records,
      totalTokens,
      startTime,
      successMessage: Messages.summaryRegenerated
    });
  }

  /**
   * 从取消断点恢复 Editor 执行：
   * - 步骤执行中取消（存在 aborted 槽位或步骤未跑完）→ 从断点步骤续跑
   * - 步骤已全部完成但总结缺失（总结阶段取消）→ 仅重新生成总结
   */
  async function resumeEditorPlan(
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    signal?: AbortSignal
  ) {
    const steps = round.architectPlan?.steps || [];
    if (!steps.length) throw new Error(Messages.planNotResumable.text);

    const startTime = Date.now();
    const results = round.editorResults;
    const last = results[results.length - 1];

    // 取消时正在执行的步骤：替换该未完成槽位并从它续跑
    let startStep = results.length;
    let retrySlot: EditorStepResult | undefined;
    if (last?.aborted) {
      startStep = results.length - 1;
      retrySlot = last;
    }

    // 步骤已全部完成，仅总结缺失（总结阶段取消）
    if (startStep >= steps.length) {
      setStatus(Messages.resumedSummary);
      const records = results.map(toStepRecord);
      const totalTokens = await generateSummary(
        topicId,
        userId,
        userMessage,
        round,
        records,
        signal
      );
      if (signal?.aborted) return;
      await saveSummaryTrace({
        traceId,
        topicId,
        round,
        records,
        totalTokens,
        startTime,
        successMessage: Messages.summaryGenerated
      });
      return;
    }

    // 从断点步骤续跑（跳过已完成步骤，retrySlot 复用未完成槽位）
    await updateTopic({ id: topicId, status: 'executing', traceId });
    setStatus(Messages.resumingStep(startStep + 1, steps.length));
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      round,
      startStep,
      0,
      signal,
      retrySlot
    );
  }

  return {
    executeArchitectPlan,
    retryEditorPlan,
    retrySummary,
    resumeEditorPlan
  };
}
