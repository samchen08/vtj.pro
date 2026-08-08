/**
 * 断点检测（纯函数）
 * 判断对话轮次中是否存在可恢复的执行断点，用于回放后驱动"恢复"入口
 */
import type { ConversationRound } from '../types/agent';

export function hasResumableBreakpoint(rounds: ConversationRound[]): boolean {
  const last = rounds[rounds.length - 1];
  if (!last) return false;
  // 规划阶段中断：已创建 architect chat 但未产出有效计划 → 重跑规划
  if (last.architectChatId && !last.architectPlan) return true;
  // 步骤执行中断：存在未完成的 aborted 槽位 → 从断点续跑
  if (last.editorResults.some((r) => r.aborted)) return true;
  return false;
}
