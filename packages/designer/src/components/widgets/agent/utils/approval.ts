import { reactive } from 'vue';
import type { EditorTurn } from '../types/agent';

export type ApprovalRisk = 'write' | 'destructive';

export function createEditorTurn(turn: number): EditorTurn {
  return reactive({ turn, type: '', content: '', reasoning: '' });
}

export function getApprovalRisk(action: string): ApprovalRisk | null {
  if (action.startsWith('get') || action === 'refresh') return null;
  return /^(remove|delete)/i.test(action) ? 'destructive' : 'write';
}
