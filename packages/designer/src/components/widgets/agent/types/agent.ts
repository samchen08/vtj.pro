/**
 * 双代理 (Architect + Editor) 页面的类型定义
 */
import type { Ref } from 'vue';
import type { Engine, TopicDto, ChatDto } from '../../../../framework';
import type { Access } from '@vtj/renderer';
import type { AgentStatusMessage } from '../utils/messages';

// ── 基础数据类型 ──

/** SSE 数据块（与框架 CompletionChunk 结构兼容，含服务端扩展的 vtj 字段） */
export interface SSEChunkData {
  id?: string;
  model?: string;
  choices?: Array<{
    delta?: {
      content?: string | null;
      reasoning_content?: string | null;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  } | null;
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
  /** 步骤依赖（服务端 HarnessPlan 协议字段，透传保留） */
  dependsOn?: string[];
}

/** Architect 返回的计划 */
export interface PlanResult {
  intent: string;
  safety: 'readonly' | 'write' | 'destructive';
  steps: PlanStep[];
  answer?: string;
  /** 计划上下文键（服务端 HarnessPlan 协议字段，透传保留） */
  contextKeys?: string[];
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
  /** 取消时产生的未完成槽位标记（断点恢复时定位用） */
  aborted?: boolean;
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

/** 附件展示信息（不含识别描述，描述仅用于提交请求） */
export interface AttachmentInfo {
  id: string;
  name: string;
  type: 'image' | 'json';
  /** 文件访问 URL（本地相对路径或 OSS 完整地址） */
  url?: string;
}

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
  /** Architect 规划失败原因（大模型输出无效/异常时记录，UI 与导出展示） */
  architectError?: string;
  /** Architect 规划自动重试次数（大模型输出无效时自动重发） */
  architectRetryCount?: number;
  editorResults: EditorStepResult[];
  summaryText: string;
  summaryReasoning: string;
  summaryError: string;
  summaryAttempt: number;
  /** 附件快照（气泡展示用，与输入框 files 解耦） */
  attachments?: AttachmentInfo[];
  /** 实际提交后端的完整 prompt（含文件识别描述），重试时复用 */
  promptSent?: string;
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
  /** Architect 规划失败原因 */
  architectError?: string;
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

/** 创建话题请求体（扩展自框架 TopicDto） */
export interface AgentTopicBody extends TopicDto {
  agent?: 'architect' | 'editor';
  userId?: string;
  userName?: string;
  files?: string;
  requestId?: string;
}

/** 创建聊天请求体（扩展自框架 ChatDto） */
export interface AgentChatBody extends ChatDto {
  agent?: 'architect' | 'editor';
  stepId?: string;
  attempt?: number;
  userId?: string;
  userName?: string;
  files?: string;
  requestId?: string;
}

/** 保存聊天记录请求体（chats 表字段） */
export interface SaveChatBody {
  id: string;
  topicId: string;
  userId: string;
  status?: string;
  content?: string;
  reasoning?: string;
  modelUsed?: string;
  tokens?: number;
  tokensPrompt?: number;
  tokensCompletion?: number;
  thinking?: number;
  toolCallId?: string;
  toolContent?: string;
  vue?: string;
  dsl?: string;
  source?: string;
}

/** 更新话题请求体 */
export interface UpdateTopicBody {
  id: string;
  status?: string;
  planJson?: PlanResult | null;
  traceId?: string;
  currentStepId?: string;
}

/** 保存 trace 请求体 */
export interface SaveTraceBody {
  traceId: string;
  topicId: string;
  planJson: PlanResult | null;
  stepsJson: StepRecord[];
  finalStatus: 'failed' | 'completed';
  totalTokens: number;
  totalDuration: number;
}

/** 基础设施依赖 */
export interface DualAgentInfrastructure {
  token: Ref<string>;
  model: Ref<string>;
  existingTopicId: Ref<string>;
  setTopicId: (id: string) => void;
  getEngine: () => Engine | null;
  registerTools: () => void;
  abortSse: () => void;
  access?: Access;
  setStatus: (message: AgentStatusMessage) => void;
}

/** API 依赖 */
export interface DualAgentApi {
  postTopic: (body: AgentTopicBody) => Promise<any>;
  postChat: (body: AgentChatBody) => Promise<any>;
  executeArchitectPlan: (
    topicId: string,
    architectChatId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    signal?: AbortSignal
  ) => Promise<void>;
  retryEditorPlan: (
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    stepIndex: number,
    signal?: AbortSignal
  ) => Promise<void>;
  resumeEditorPlan: (
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
    signal?: AbortSignal
  ) => Promise<void>;
  retrySummary: (
    topicId: string,
    userId: string,
    traceId: string,
    userMessage: string,
    round: ConversationRound,
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
  postChat: (body: AgentChatBody) => Promise<any>;
  saveChat: (body: SaveChatBody) => Promise<any>;
  updateTopic: (body: UpdateTopicBody) => Promise<any>;
  getEngine: () => Engine | null;
  setStatus: (message: AgentStatusMessage) => void;
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
  postChat: (body: AgentChatBody) => Promise<any>;
  saveChat: (body: SaveChatBody) => Promise<any>;
  updateTopic: (body: UpdateTopicBody) => Promise<any>;
  saveTrace: (body: SaveTraceBody) => Promise<any>;
  setStatus: (message: AgentStatusMessage) => void;
  executeEditorStep: (
    topicId: string,
    userId: string,
    step: PlanStep,
    stepIdx: number,
    allSteps: PlanStep[],
    stepStart: number,
    editorResults: EditorStepResult[],
    signal?: AbortSignal,
    retrySlot?: EditorStepResult
  ) => Promise<StepExecutionResult>;
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
  /** 附件信息（持久化到 chats.files） */
  files?: AttachmentInfo[];
  createdAt: string;
  updatedAt: string;
}

/** 回显 composable 依赖 */
export interface ReplayChatDeps {
  getChats: (topicId: string) => Promise<ChatRecord[]>;
  setStatus: (message: AgentStatusMessage) => void;
}
