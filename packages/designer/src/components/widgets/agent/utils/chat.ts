/**
 * 聊天记录保存 body 构建（纯函数）
 * 统一 useEditorStep / useArchitectPlan 中的同构组装
 */
import type { SaveChatBody, StreamCompletionResult } from '../types/agent';

export function buildChatSaveBody(opts: {
  id: string;
  topicId: string;
  userId: string;
  status?: string;
  attempt?: number;
  content?: string;
  message?: string;
  result: StreamCompletionResult | null;
  tokens?: number;
}): SaveChatBody {
  return {
    id: opts.id,
    topicId: opts.topicId,
    userId: opts.userId,
    status: opts.status ?? 'Success',
    attempt: opts.attempt,
    content: opts.content || ' ',
    message: opts.message,
    reasoning: opts.result?.reasoning || '',
    modelUsed: opts.result?.modelUsed || '',
    tokens: opts.tokens || 0,
    tokensPrompt: opts.result?.usage?.prompt_tokens || 0,
    tokensCompletion: opts.result?.usage?.completion_tokens || 0,
    thinking: opts.result?.reasoningTime || 0
  };
}
