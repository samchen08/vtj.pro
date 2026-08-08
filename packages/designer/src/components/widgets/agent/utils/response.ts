/**
 * 远程接口响应处理（纯函数）
 * - unwrapOpenApi：响应码校验与 data 解包
 * - pickChat / pickTopic：后端响应存在两套形态（裸对象 / { topic|chat } 包裹，
 *   主键存在 id / chatId 双命名），统一提取，避免调用侧散落 `xxx.xxx || xxx` 兼容逻辑
 */

/** 响应码校验解包：非零 code / success=false 抛错，优先返回 data 字段 */
export function unwrapOpenApi<T>(response: any): T {
  const code = response?.code;
  // 显式兼容数字 0 与字符串 '0'；null/undefined 视为无 code 字段
  if (!(code == null || code === 0 || code === '0')) {
    const error = new Error(
      response.message || `API Error code=${code}`
    ) as Error & { status?: number };
    error.status = Number(response.status || code) || undefined;
    throw error;
  }
  if (response?.success === false) {
    const error = new Error(response.message || '远程接口调用失败') as Error & {
      status?: number;
    };
    error.status = Number(response.status) || undefined;
    throw error;
  }
  return (response?.data !== undefined ? response.data : response) as T;
}

/** chat 实体提取结果 */
export interface PickedChat {
  /** chat 实体（优先取包裹字段，回退整包） */
  chat: any;
  /** chat 主键（兼容 id / chatId 双命名） */
  chatId: string;
}

/** topic 实体提取结果（topic 响应同时携带起始 chat） */
export interface PickedTopic extends PickedChat {
  topic: any;
  topicId: string;
  userId: string;
}

/** 提取 chat 实体与主键 */
export function pickChat(response: any): PickedChat {
  const chat = response?.chat || response;
  return {
    chat,
    chatId: chat?.id || chat?.chatId || ''
  };
}

/** 提取 topic 实体、主键与起始 chat */
export function pickTopic(response: any): PickedTopic {
  const topic = response?.topic || response;
  // chat 仅在响应显式携带时提取：topic 响应可能只有 topic 实体，
  // 避免 pickChat 回退整包将 topic.id 误判为 chatId
  const chat = response?.chat;
  return {
    topic,
    topicId: topic?.id || topic?.topicId || '',
    userId: topic?.userId || '',
    chat: chat || null,
    chatId: chat?.id || chat?.chatId || ''
  };
}
