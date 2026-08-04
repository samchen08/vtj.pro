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
    const stepsRecords: StepRecord[] = [];

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

    // ── Editor 步骤循环 ──
    let hasError = false;
    for (let i = 0; i < steps.length; i++) {
      // 每个步骤执行前检查取消信号
      if (isCancelled()) {
        statusText.value = `⏹️ 已取消（已完成 ${i}/${steps.length} 步）`;
        statusType.value = 'info';
        return;
      }
      const step = steps[i];
      const stepStart = Date.now();
      const stepResult = await executeEditorStep(
        topicId,
        userId,
        step,
        i,
        steps,
        stepStart,
        targets.editorResults,
        signal
      );

      if (stepResult.error) hasError = true;
      totalTokens += stepResult.tokens;

      stepsRecords.push({
        stepId: step.id,
        type: step.type,
        description: step.description,
        status: stepResult.error ? 'failed' : 'completed',
        content: stepResult.content,
        error: stepResult.error,
        tokens: stepResult.tokens,
        duration: stepResult.duration
      });
    }

    // ── 总结阶段 ──
    if (steps.length > 0 && !isCancelled()) {
      targets.summaryText.value = '';
      targets.summaryReasoning.value = '';
      statusText.value = '生成任务总结...';
      statusType.value = 'warning';

      const summaryPrompt = buildSummaryPrompt(
        userMessage,
        targets.architectPlan.value,
        stepsRecords
      );

      try {
        const summaryChatRes = await postChat({
          topicId,
          prompt: summaryPrompt,
          agent: 'editor',
          stepId: 'summary',
          attempt: 1,
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
          (r) => {
            targets.summaryReasoning.value += r;
          }
        );

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
        totalTokens += summaryResult.usage?.total_tokens || 0;
      } catch (e: any) {
        targets.summaryError.value = e.message || String(e);
        console.warn('总结生成失败:', e.message);
      }
    }

    // 最终状态更新（仅未取消时执行）
    if (isCancelled()) {
      statusText.value = '⏹️ 已取消';
      statusType.value = 'info';
      return;
    }

    await updateTopic({
      id: topicId,
      status: hasError ? 'failed' : 'completed',
      traceId
    });

    await saveTrace({
      traceId,
      topicId,
      planJson: targets.architectPlan.value,
      stepsJson: stepsRecords,
      finalStatus: hasError ? 'failed' : 'completed',
      totalTokens,
      totalDuration: Date.now() - startTime
    });

    statusText.value = hasError
      ? `⚠️ ${steps.length} 个步骤执行完成（有错误）`
      : `✅ 全部 ${steps.length} 个步骤执行完成`;
    statusType.value = hasError ? 'warning' : 'success';
  }

  return { executeArchitectPlan };
}
