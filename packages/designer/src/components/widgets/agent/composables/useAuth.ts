/**
 * 认证与模型选择状态管理
 * 管理 token、model、existingTopicId 三个核心表单状态
 */
import { ref } from 'vue';

export function useAuth(getToken: () => string | undefined) {
  const token = ref('');
  const model = ref('auto');
  const existingTopicId = ref('');

  /** 从 access store 初始化 token */
  function initToken() {
    token.value = getToken() || '';
  }

  /** 重置话题 ID */
  function clearTopicId() {
    existingTopicId.value = '';
  }

  /** 设置话题 ID */
  function setTopicId(id: string) {
    existingTopicId.value = id;
  }

  return {
    token,
    model,
    existingTopicId,
    initToken,
    clearTopicId,
    setTopicId
  };
}
