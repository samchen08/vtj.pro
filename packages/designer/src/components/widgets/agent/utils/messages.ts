/**
 * Agent 状态消息收口
 * 统一管理各 composable 的状态文案与类型，便于维护与后续 i18n。
 * 注意：文案不携带 emoji，符号由 UI 层依据 statusType 渲染。
 */
import type { Ref } from 'vue';

export type AgentStatusType = 'info' | 'warning' | 'success' | 'danger';

export interface AgentStatusMessage {
  text: string;
  type: AgentStatusType;
}

/** 写入状态文本与类型 */
export function setAgentStatus(
  statusText: Ref<string>,
  statusType: Ref<AgentStatusType>,
  message: AgentStatusMessage
) {
  statusText.value = message.text;
  statusType.value = message.type;
}

/** 常用状态消息 */
export const Messages = {
  // 校验
  tokenMissing: { text: '请先获取 Token', type: 'danger' } as const,
  promptEmpty: { text: '请输入消息或上传文件', type: 'danger' } as const,
  topicIdMissing: { text: '请输入 Topic ID', type: 'danger' } as const,
  retryTopicIdMissing: {
    text: '缺少 Topic ID，无法重试',
    type: 'danger'
  } as const,
  resumeTopicIdMissing: {
    text: '缺少 Topic ID，无法恢复',
    type: 'danger'
  } as const,
  noRetryRound: { text: '没有可重试的轮次', type: 'danger' } as const,
  noResumeRound: { text: '没有可恢复的轮次', type: 'danger' } as const,
  architectChatIdMissing: {
    text: '该轮次缺少 Architect chat ID，无法重试',
    type: 'danger'
  } as const,
  stepNotFailed: { text: '该步骤不是失败状态', type: 'danger' } as const,
  lockedProject: {
    text: '项目已被锁定，无法应用变更',
    type: 'danger'
  } as const,

  // 流程提示
  creatingTopic: { text: '创建话题 (architect)...', type: 'info' } as const,
  creatingArchitectChat: {
    text: '创建 Architect 聊天...',
    type: 'info'
  } as const,
  architectPlanning: { text: 'Architect 规划中...', type: 'warning' } as const,
  retryingSummary: { text: '重新生成任务总结...', type: 'warning' } as const,
  planInvalid: {
    text: 'Architect 未返回有效 JSON，检查 SSE 日志',
    type: 'danger'
  } as const,
  architectAnswered: { text: 'Architect 直接回答', type: 'success' } as const,
  generatingSummary: { text: '生成任务总结...', type: 'warning' } as const,
  resumedSummary: { text: '恢复生成任务总结...', type: 'warning' } as const,
  summaryRegenerated: { text: '任务总结已重新生成', type: 'success' } as const,
  summaryGenerated: { text: '任务总结已生成', type: 'success' } as const,
  retryingLastRequest: { text: '重试上次请求...', type: 'warning' } as const,
  cancelled: { text: '已取消', type: 'info' } as const,
  loadingHistory: { text: '加载历史记录...', type: 'info' } as const,
  historyEmpty: { text: '未找到交互记录', type: 'warning' } as const,
  replayTopicIdMissing: { text: '缺少 Topic ID', type: 'danger' } as const,

  // 动态文案
  topicCreated: (topicId: string): AgentStatusMessage => ({
    text: `话题创建成功: ${topicId}`,
    type: 'success'
  }),
  planGenerated: (intent: string): AgentStatusMessage => ({
    text: `计划已生成: ${intent}`,
    type: 'success'
  }),
  allStepsDone: (count: number): AgentStatusMessage => ({
    text: `全部 ${count} 个步骤执行完成`,
    type: 'success'
  }),
  stepFailed: (index: number): AgentStatusMessage => ({
    text: `第 ${index} 步执行失败，可从此步骤重试`,
    type: 'danger'
  }),
  summaryFailed: (message: string): AgentStatusMessage => ({
    text: `总结生成失败: ${message}`,
    type: 'danger'
  }),
  cancelledWithProgress: (done: number, total: number): AgentStatusMessage => ({
    text: `已取消（已完成 ${done}/${total} 步）`,
    type: 'info'
  }),
  resumingStep: (step: number, total: number): AgentStatusMessage => ({
    text: `恢复执行: 步骤 ${step}/${total}...`,
    type: 'warning'
  }),
  retryingStep: (index: number): AgentStatusMessage => ({
    text: `重试第 ${index} 步...`,
    type: 'warning'
  }),
  retryArchitect: (label: string): AgentStatusMessage => ({
    text: `${label} Architect 规划...`,
    type: 'warning'
  }),
  error: (message: string): AgentStatusMessage => ({
    text: `错误: ${message}`,
    type: 'danger'
  }),
  retryFailed: (message: string): AgentStatusMessage => ({
    text: `重试失败: ${message}`,
    type: 'danger'
  }),
  historyLoaded: (count: number): AgentStatusMessage => ({
    text: `已加载 ${count} 轮对话记录`,
    type: 'success'
  }),
  historyLoadFailed: (message: string): AgentStatusMessage => ({
    text: `加载失败: ${message}`,
    type: 'danger'
  }),
  historyFormatInvalid: (type: string): AgentStatusMessage => ({
    text: `接口返回数据格式异常 (期望数组，收到 ${type})`,
    type: 'danger'
  }),
  editorExecuting: (
    description: string,
    index: number,
    total: number
  ): AgentStatusMessage => ({
    text: `Editor 执行中: ${description} (${index}/${total})`,
    type: 'warning'
  }),
  awaitingApproval: (action: string, risk: string): AgentStatusMessage => ({
    text: `等待批准: ${action}`,
    type: risk === 'destructive' ? 'danger' : 'warning'
  }),
  executingAction: (action: string): AgentStatusMessage => ({
    text: `正在执行: ${action}`,
    type: 'warning'
  }),
  actionRejected: (action: string): AgentStatusMessage => ({
    text: `已拒绝: ${action}`,
    type: 'info'
  })
};
