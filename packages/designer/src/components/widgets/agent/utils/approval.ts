import { reactive } from 'vue';
import type { EditorTurn } from '../types/agent';

export type ApprovalRisk = 'write' | 'destructive';

export function createEditorTurn(turn: number): EditorTurn {
  return reactive({ turn, type: '', content: '', reasoning: '' });
}

/**
 * 获取工具调用的审批风险等级
 * @param action 工具名称
 * @param declared 工具定义中显式声明的风险等级（优先使用）
 * @returns 需要审批时返回风险等级，无需审批（只读操作）返回 null
 */
export function getApprovalRisk(
  action: string,
  declared?: ApprovalRisk | null
): ApprovalRisk | null {
  if (declared) return declared;
  // 兜底规则：只读操作免审批，remove/delete 前缀视为高风险
  if (action.startsWith('get') || action === 'refresh') return null;
  return /^(remove|delete)/i.test(action) ? 'destructive' : 'write';
}
