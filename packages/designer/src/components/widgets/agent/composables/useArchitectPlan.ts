/**
 * Architect 规划执行
 * 调用 Architect → 解析计划 → 保存 → 分流（直接回复 or Editor 执行）→ 总结
 */
import { nextTick, type Ref } from 'vue';
import type { PlanResult, StepRecord, ArchitectPlanDeps } from '../types/agent';
import type { EditorStepResult } from '../types/agent';

/** executeArchitectPlan 写入的目标 ref 集合 */
export interface ArchPlanTargets {
  architectPlan: Ref<PlanResult | null>;
  architectAnswer: Ref<string>;
  architectStreamText: Ref<string>;
  reasoningText: Ref<string>;
  editorResults: Ref<EditorStepResult[]>;
  summaryText: Ref<string>;
  summaryReasoning: Ref<string>;
  summaryError: Ref<string>;
  summaryAttempt: Ref<number>;
}

export function useArchitectPlan(deps: ArchitectPlanDeps) {
  const {
    streamCompletion,
    postChat,
    saveChat,
    updateTopic,
    saveTrace,
    statusText,
    statusType,
    executeEditorStep,
    buildSummaryPrompt
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
    targets: ArchPlanTargets,
    records: StepRecord[],
    signal?: AbortSignal
  ): Promise<number> {
    targets.summaryText.value = '';
    targets.summaryReasoning.value = '';
    targets.summaryError.value = '';
    statusText.value = '生成任务总结...';
    statusType.value = 'warning';

    try {
      const summaryChatRes = await postChat({
        topicId,
        prompt: buildSummaryPrompt(
          userMessage,
          targets.architectPlan.value,
          records
        ),
        agent: 'editor',
        stepId: 'summary',
        attempt: ++targets.summaryAttempt.value,
        userId: userId || '',
        userName: ''
      });
      const summaryChat = summaryChatRes.chat || summaryChatRes;
      const summaryChatId = summaryChat.id || summaryChat.chatId || '';
      const summaryResult = await streamCompletion(
        topicId,
        summaryChatId,
        (text) => {
          targets.summaryText.value += text;
        },
        (reasoning) => {
          targets.summaryReasoning.value += reasoning;
        }
      );
      if (signal?.aborted) return 0;

      await saveChat({
        id: summaryChatId,
        topicId,
        userId,
        status: 'Success',
        content: targets.summaryText.value,
        reasoning: summaryResult.reasoning || '',
        modelUsed: summaryResult.modelUsed || '',
        tokens: summaryResult.usage?.total_tokens || 0,
        tokensPrompt: summaryResult.usage?.prompt_tokens || 0,
        tokensCompletion: summaryResult.usage?.completion_tokens || 0,
        thinking: summaryResult.reasoningTime || 0
      });
      return summaryResult.usage?.total_tokens || 0;
    } catch (e: any) {
      targets.summaryError.value = e.message || String(e);
      console.warn('总结生成失败:', e.message);
      return 0;
    }
  }

  async function executeEditorPlan(
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    targets: ArchPlanTargets,
    startStep: number,
    initialTokens: number,
    signal?: AbortSignal,
    retrySlot?: EditorStepResult
  ) {
    const startTime = Date.now();
    const steps = targets.architectPlan.value?.steps || [];
    const records = targets.editorResults.value
      .slice(0, startStep)
      .map(toStepRecord);
    let totalTokens =
      initialTokens + records.reduce((sum, item) => sum + item.tokens, 0);
    let failedStep = -1;

    for (let i = startStep; i < steps.length; i++) {
      if (signal?.aborted) {
        statusText.value = `⏹️ 已取消（已完成 ${i}/${steps.length} 步）`;
        statusType.value = 'info';
        return;
      }

      const stepResult = await executeEditorStep(
        topicId,
        userId,
        steps[i],
        i,
        steps,
        Date.now(),
        targets.editorResults,
        signal,
        i === startStep ? retrySlot : undefined
      );
      const slot =
        (i === startStep && retrySlot) ||
        targets.editorResults.value[targets.editorResults.value.length - 1];
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
      statusText.value = '⏹️ 已取消';
      statusType.value = 'info';
      return;
    }

    if (failedStep < 0) {
      totalTokens += await generateSummary(
        topicId,
        userId,
        userMessage,
        targets,
        records,
        signal
      );
    }

    if (signal?.aborted) {
      statusText.value = '⏹️ 已取消';
      statusType.value = 'info';
      return;
    }

    await updateTopic({
      id: topicId,
      status: failedStep >= 0 ? 'failed' : 'completed',
      traceId
    });
    await saveTrace({
      traceId,
      topicId,
      planJson: targets.architectPlan.value,
      stepsJson: records,
      finalStatus: failedStep >= 0 ? 'failed' : 'completed',
      totalTokens,
      totalDuration: Date.now() - startTime
    });

    if (failedStep >= 0) {
      statusText.value = `❌ 第 ${failedStep + 1} 步执行失败，可从此步骤重试`;
      statusType.value = 'danger';
    } else if (targets.summaryError.value) {
      statusText.value = `❌ 总结生成失败: ${targets.summaryError.value}`;
      statusType.value = 'danger';
    } else {
      statusText.value = `✅ 全部 ${steps.length} 个步骤执行完成`;
      statusType.value = 'success';
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
    targets: ArchPlanTargets,
    signal?: AbortSignal
  ) {
    const startTime = Date.now();
    let totalTokens = 0;

    /** 检查是否已取消，若取消则提前退出 */
    function isCancelled(): boolean {
      return signal?.aborted ?? false;
    }

    // ── Architect 流式规划 ──
    statusText.value = 'Architect 规划中...';
    statusType.value = 'warning';
    targets.architectStreamText.value = '';
    targets.reasoningText.value = '';

    const archResult = await streamCompletion(
      topicId,
      architectChatId,
      (text) => {
        targets.architectStreamText.value += text;
      },
      (r) => {
        targets.reasoningText.value += r;
        nextTick();
      }
    );

    // 检查取消信号：SSE 流被中断后不应继续执行后续操作
    if (isCancelled()) {
      statusText.value = '⏹️ 已取消';
      statusType.value = 'info';
      return;
    }

    // 解析计划 JSON
    function tryParse(content: string): PlanResult | null {
      const m = content.match(/\{[\s\S]*\}/);
      if (!m) return null;
      try {
        return JSON.parse(m[0]) as PlanResult;
      } catch {
        return null;
      }
    }

    targets.architectPlan.value = tryParse(targets.architectStreamText.value);

    // ── 保存 Architect chat ──
    // 再次检查取消信号，避免写入已取消会话的数据
    if (isCancelled()) {
      statusText.value = '⏹️ 已取消';
      statusType.value = 'info';
      return;
    }

    const rawStreamText = targets.architectStreamText.value;
    await saveChat({
      id: architectChatId,
      topicId,
      userId,
      status: 'Success',
      content: rawStreamText || ' ',
      reasoning: archResult.reasoning || '',
      modelUsed: archResult.modelUsed || '',
      tokens: archResult.usage?.total_tokens || 0,
      tokensPrompt: archResult.usage?.prompt_tokens || 0,
      tokensCompletion: archResult.usage?.completion_tokens || 0,
      thinking: archResult.reasoningTime || 0
    });
    totalTokens += archResult.usage?.total_tokens || 0;

    // ── 计划为空 → 标记失败 ──
    if (!targets.architectPlan.value) {
      statusText.value = '⚠️ Architect 未返回有效 JSON，检查 SSE 日志';
      statusType.value = 'danger';
      await updateTopic({
        id: topicId,
        status: 'failed',
        traceId
      });
      await saveTrace({
        traceId,
        topicId,
        planJson: null,
        stepsJson: [],
        finalStatus: 'failed',
        totalTokens,
        totalDuration: Date.now() - startTime
      });
      return;
    }

    // 更新 topic 为 executing
    await updateTopic({
      id: topicId,
      planJson: targets.architectPlan.value,
      status: 'executing',
      traceId
    });

    // ── 分流：无步骤 → 直接回复 ──
    const steps = targets.architectPlan.value.steps;
    if (!steps || steps.length === 0) {
      const answer =
        targets.architectPlan.value.answer ||
        targets.architectPlan.value.intent ||
        '(无回复)';
      targets.architectAnswer.value = answer;
      statusText.value = '✅ Architect 直接回答';
      statusType.value = 'success';
      await updateTopic({
        id: topicId,
        status: 'completed',
        planJson: targets.architectPlan.value,
        traceId
      });
      await saveTrace({
        traceId,
        topicId,
        planJson: targets.architectPlan.value,
        stepsJson: [],
        finalStatus: 'completed',
        totalTokens,
        totalDuration: Date.now() - startTime
      });
      return;
    }

    statusText.value = `计划已生成: ${targets.architectPlan.value.intent}`;
    statusType.value = 'success';
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      targets,
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
    targets: ArchPlanTargets,
    stepIndex: number,
    signal?: AbortSignal
  ) {
    const retrySlot = targets.editorResults.value[stepIndex];
    if (!targets.architectPlan.value || !retrySlot?.error) {
      throw new Error('没有可重试的失败步骤');
    }

    targets.editorResults.value.splice(stepIndex + 1);
    targets.summaryText.value = '';
    targets.summaryReasoning.value = '';
    targets.summaryError.value = '';
    await updateTopic({ id: topicId, status: 'executing', traceId });
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      targets,
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
    targets: ArchPlanTargets,
    signal?: AbortSignal
  ) {
    if (!targets.architectPlan.value || !targets.summaryError.value) {
      throw new Error('没有可重试的总结');
    }
    const startTime = Date.now();
    const records = targets.editorResults.value.map(toStepRecord);
    const totalTokens = await generateSummary(
      topicId,
      userId,
      userMessage,
      targets,
      records,
      signal
    );
    if (signal?.aborted) return;

    await saveTrace({
      traceId,
      topicId,
      planJson: targets.architectPlan.value,
      stepsJson: records,
      finalStatus: targets.summaryError.value ? 'failed' : 'completed',
      totalTokens,
      totalDuration: Date.now() - startTime
    });
    statusText.value = targets.summaryError.value
      ? `❌ 总结生成失败: ${targets.summaryError.value}`
      : '✅ 任务总结已重新生成';
    statusType.value = targets.summaryError.value ? 'danger' : 'success';
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
    targets: ArchPlanTargets,
    signal?: AbortSignal
  ) {
    const steps = targets.architectPlan.value?.steps || [];
    if (!steps.length) throw new Error('没有可恢复的计划');

    const startTime = Date.now();
    const results = targets.editorResults.value;
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
      statusText.value = '恢复生成任务总结...';
      statusType.value = 'warning';
      const records = results.map(toStepRecord);
      const totalTokens = await generateSummary(
        topicId,
        userId,
        userMessage,
        targets,
        records,
        signal
      );
      if (signal?.aborted) return;
      await saveTrace({
        traceId,
        topicId,
        planJson: targets.architectPlan.value,
        stepsJson: records,
        finalStatus: targets.summaryError.value ? 'failed' : 'completed',
        totalTokens,
        totalDuration: Date.now() - startTime
      });
      statusText.value = targets.summaryError.value
        ? `❌ 总结生成失败: ${targets.summaryError.value}`
        : '✅ 任务总结已生成';
      statusType.value = targets.summaryError.value ? 'danger' : 'success';
      return;
    }

    // 从断点步骤续跑（跳过已完成步骤，retrySlot 复用未完成槽位）
    await updateTopic({ id: topicId, status: 'executing', traceId });
    statusText.value = `恢复执行: 步骤 ${startStep + 1}/${steps.length}...`;
    statusType.value = 'warning';
    await executeEditorPlan(
      topicId,
      userId,
      traceId,
      userMessage,
      targets,
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
