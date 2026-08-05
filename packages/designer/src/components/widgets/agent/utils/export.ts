/**
 * JSON 对话日志导出（纯函数）
 * 将当前会话的完整数据导出为 JSON 文件下载
 */
import type {
  ConversationRound,
  ExportData,
  ExportedStep,
  ExportedTurn,
  ExportRound
} from '../types/agent';

/** 从轮次数据推导错误信息 */
export function deriveError(r: ConversationRound): string | undefined {
  if (!r.architectPlan && r.editorResults.length === 0) {
    return 'Architect 未返回有效计划 JSON';
  }
  const stepErrors = r.editorResults
    .filter((s) => s.error)
    .map((s) => `步骤「${s.step?.description || s.stepIdx}」: ${s.error}`);
  if (stepErrors.length > 0) {
    return stepErrors.join('；');
  }
  return undefined;
}

export function exportConversation(
  existingTopicId: string,
  model: string,
  rounds: ConversationRound[]
) {
  const exportData: ExportData = {
    exportTime: new Date().toISOString(),
    topicId: existingTopicId || '(新话题)',
    model,
    userMessage: rounds[0]?.userMessage || ''
  };

  // 新格式：所有轮次
  if (rounds.length > 0) {
    exportData.rounds = rounds.map((r): ExportRound => {
      const round: ExportRound = {
        userMessage: r.userMessage,
        steps: r.editorResults.map(
          (step): ExportedStep => ({
            index: step.stepIdx,
            stepId: step.step?.id || '',
            description: step.step?.description || '',
            type: step.step?.type || '',
            status: step.error
              ? 'failed'
              : step.done
                ? 'completed'
                : 'executing',
            error: step.error || null,
            turns: (step.turns || []).map((turn): ExportedTurn => {
              const t: ExportedTurn = {
                turn: turn.turn,
                type: turn.type,
                prompt: turn.prompt || null,
                output: turn.content || ''
              };
              if (turn.reasoning) t.reasoning = turn.reasoning;
              if (turn.toolAction) {
                t.toolCall = {
                  action: turn.toolAction,
                  parameters: turn.toolParams || null
                };
                if (turn.toolResult) {
                  t.toolCall.result = {
                    success: turn.toolResult.success,
                    result: turn.toolResult.result ?? null,
                    error: turn.toolResult.error ?? null,
                    duration: turn.toolResult.duration
                  };
                }
              }
              if (turn.resultSummary) t.resultSummary = turn.resultSummary;
              return t;
            })
          })
        )
      };
      // 只要有流文本/推理内容就导出 architect 块（错误场景下仍需保留原始流，方便离线排查）
      if (r.architectStreamText || r.reasoningText) {
        round.architect = {
          reasoning: r.reasoningText || null,
          output: r.architectStreamText || null,
          plan: r.architectPlan || null,
          answer: r.architectAnswer || null
        };
      }
      if (r.summaryText) {
        round.summary = r.summaryText;
      }
      if (r.summaryError) {
        round.summaryError = r.summaryError;
      }
      round.error = deriveError(r);
      return round;
    });
  }

  // Download
  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `conversation-${existingTopicId || Date.now()}.json`;
  a.click();
  // 延迟回收，确保 Safari 等浏览器完成下载
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
