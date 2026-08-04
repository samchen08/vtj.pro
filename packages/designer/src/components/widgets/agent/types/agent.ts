/**
 * 双代理 (Architect + Editor) 测试页面的类型定义
 */
import type { Ref } from 'vue';
import type { Engine } from '../../../../framework';
import type { Access } from '@vtj/renderer';
import type { ArchPlanTargets } from '../composables/useArchitectPlan';

// ── 基础数据类型 ──

/** SSE 数据块 */
export interface SSEChunkData {
  choices?: Array<{
    delta?: {
      content?: string;
      reasoning_content?: string;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  vtj?: {
    model?: string;
    agent?: string;
  };
}

/** SSE 流完成结果 */
export interface StreamCompletionResult {
  done: () => void;
  reasoning: string;
  usage: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  } | null;
  modelUsed: string;
  /** reasoning 阶段持续时间（毫秒） */
  reasoningTime: number;
}

// ── Architect 计划相关 ──

/** 计划步骤 */
export interface PlanStep {
  id: string;
  type: 'tool_call' | 'vue_code' | 'diff' | 'text';
  description: string;
  target?: string;
  toolName?: string;
}

/** Architect 返回的计划 */
export interface PlanResult {
  intent: string;
  safety: 'readonly' | 'write' | 'destructive';
  steps: PlanStep[];
  answer?: string;
}

// ── Editor 执行相关 ──

/** Editor 每轮对话信息 */
export interface EditorTurn {
  turn: number;
  type: string;
  content: string;
  reasoning: string;
  /** Vue/Diff 执行后的最终源码与 DSL */
  vue?: string;
  dsl?: Record<string, any>;
  prompt?: string;
  toolAction?: string;
  toolParams?: unknown[];
  toolResult?: {
    success: boolean;
    result?: unknown;
    error?: string;
    duration: number;
  };
  resultSummary?: string;
  approval?: {
    id: string;
    action: string;
    risk: 'write' | 'destructive';
    status: 'pending' | 'approved' | 'rejected';
  };
}

/** Editor 步骤执行结果（UI 展示用） */
export interface EditorStepResult {
  stepIdx: number;
  step: PlanStep;
  content: string;
  reasoning: string;
  error: string | null;
  done: boolean;
  turns: EditorTurn[];
  tokens?: number;
  duration?: number;
}

/** 步骤执行返回值（内部使用） */
export interface StepExecutionResult {
  content: string;
  error: string | null;
  tokens: number;
  duration: number;
  toolResult?: { action: string; result: unknown } | null;
}

/** 步骤记录（用于总结和 trace） */
export interface StepRecord {
  stepId: string;
  type: string;
  description: string;
  status: 'completed' | 'failed';
  content: string;
  error: string | null;
  tokens: number;
  duration: number;
}

// ── 对话轮次相关 ──

/** 一轮完整的 Architect → Editor → Summary 对话 */
export interface ConversationRound {
  id: string;
  userMessage: string;
  /** Architect 对应的 chats 表记录 ID，重试时复用避免重复插入 */
  architectChatId: string;
  architectPlan: PlanResult | null;
  architectAnswer: string;
  architectStreamText: string;
  reasoningText: string;
  editorResults: EditorStepResult[];
  summaryText: string;
  summaryReasoning: string;
  summaryError: string;
  summaryAttempt: number;
}

// ── 导出相关 ──

/** 导出数据结构 */
export interface ExportData {
  exportTime: string;
  topicId: string;
  model: string;
  userMessage: string;
  /** 所有对话轮次 */
  rounds?: ExportRound[];
}

/** 导出单轮数据 */
export interface ExportRound {
  userMessage: string;
  architect?: {
    reasoning: string | null;
    output: string | null;
    plan: PlanResult | null;
    answer: string | null;
  };
  steps: ExportedStep[];
  summary?: string;
  /** 总结生成错误信息 */
  summaryError?: string;
  /** 本轮错误信息 */
  error?: string;
}

/** 导出的步骤数据 */
export interface ExportedStep {
  index: number;
  stepId: string;
  description: string;
  type: string;
  status: 'failed' | 'completed' | 'executing';
  error: string | null;
  turns: ExportedTurn[];
}

/** 导出的轮次数据 */
export interface ExportedTurn {
  turn: number;
  type: string;
  prompt: string | null;
  output: string;
  reasoning?: string;
  toolCall?: {
    action: string;
    parameters: unknown[] | null;
    result?: {
      success: boolean;
      result: unknown;
      error: unknown;
      duration: number;
    };
  };
  resultSummary?: string;
}

// ── useDualAgent 配置接口 ──

/** 基础设施依赖 */
export interface DualAgentInfrastructure {
  token: Ref<string>;
  model: Ref<string>;
  existingTopicId: Ref<string>;
  setTopicId: (id: string) => void;
  getEngine: () => Engine | null;
  registerTools: () => void;
  abortSse: () => void;
  access: Access;
  statusText: Ref<string>;
  statusType: Ref<'info' | 'warning' | 'success' | 'danger'>;
}

/** API 依赖 */
export interface DualAgentApi {
  postTopic: (body: TopicCreateBody) => Promise<any>;
  postChat: (body: Record<string, any>) => Promise<any>;
  streamCompletion: (
    topicId: string,
    chatId: string,
    onChunk?: (text: string) => void,
    onReasoning?: (text: string) => void
  ) => Promise<StreamCompletionResult>;
  executeArchitectPlan: (
    topicId: string,
    architectChatId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    targets: ArchPlanTargets,
    signal?: AbortSignal
  ) => Promise<void>;
  retryEditorPlan: (
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    targets: ArchPlanTargets,
    stepIndex: number,
    signal?: AbortSignal
  ) => Promise<void>;
  retrySummary: (
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    targets: ArchPlanTargets,
    signal?: AbortSignal
  ) => Promise<void>;
}

/** 对话状态 */
export interface DualAgentState {
  conversationRounds: Ref<ConversationRound[]>;
}

// ── 下层 composable DI 接口 ──

/** Editor 步骤执行依赖 */
export interface EditorStepDeps {
  streamCompletion: (
    topicId: string,
    chatId: string,
    onChunk?: (text: string) => void,
    onReasoning?: (text: string) => void
  ) => Promise<StreamCompletionResult>;
  postChat: (body: Record<string, any>) => Promise<any>;
  saveChat: (body: Record<string, any>) => Promise<any>;
  updateTopic: (body: Record<string, any>) => Promise<any>;
  getEngine: () => Engine | null;
  statusText: Ref<string>;
  statusType: Ref<'info' | 'warning' | 'success' | 'danger'>;
  requestApproval: (id: string) => Promise<boolean>;
}

/** Architect 规划执行依赖 */
export interface ArchitectPlanDeps {
  streamCompletion: (
    topicId: string,
    chatId: string,
    onChunk?: (text: string) => void,
    onReasoning?: (text: string) => void
  ) => Promise<StreamCompletionResult>;
  postChat: (body: Record<string, any>) => Promise<any>;
  saveChat: (body: Record<string, any>) => Promise<any>;
  updateTopic: (body: Record<string, any>) => Promise<any>;
  saveTrace: (body: Record<string, any>) => Promise<any>;
  statusText: Ref<string>;
  statusType: Ref<'info' | 'warning' | 'success' | 'danger'>;
  executeEditorStep: (
    topicId: string,
    userId: string,
    step: PlanStep,
    stepIdx: number,
    allSteps: PlanStep[],
    stepStart: number,
    editorResults: Ref<EditorStepResult[]>,
    signal?: AbortSignal,
    retrySlot?: EditorStepResult
  ) => Promise<StepExecutionResult>;
  buildSummaryPrompt: (
    userRequest: string,
    plan: PlanResult | null,
    records: StepRecord[]
  ) => string;
}

// ── 话题创建相关 ──

/** 话题创建请求 */
export interface TopicCreateBody {
  model: string;
  prompt: string;
  project: string;
  dsl: string;
  source: string;
  tools: string;
  options: string;
  agent: 'architect' | 'editor';
  userId: string;
  userName: string;
  requestId?: string;
}

// ── 回显相关 ──

/** 后端返回的 chat 记录（transformChat 后格式） */
export interface ChatRecord {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  /** 用户提示词 (原 userContent) */
  prompt: string;
  /** AI 回复内容 (原 assistantContent) */
  content: string;
  /** 推理内容 (原 reasoningContent) */
  reasoning: string;
  status: string;
  /** token 用量 (原 tokenUsage) */
  tokens: number;
  /** 错误消息 (原 errorMessage) */
  message: string;
  /** 思考用时毫秒 (原 thinkingTime) */
  thinking: number;
  modelUsed: string;
  agentRole: string;
  stepId: string;
  attempt: number;
  tokensPrompt: number;
  tokensCompletion: number;
  toolCallId: string;
  toolContent: string;
  vue: string;
  source: string;
  dsl: Record<string, any> | string;
  createdAt: string;
  updatedAt: string;
}

/** 回显 composable 依赖 */
export interface ReplayChatDeps {
  getChats: (topicId: string) => Promise<ChatRecord[]>;
  statusText: Ref<string>;
  statusType: Ref<'info' | 'warning' | 'success' | 'danger'>;
}
