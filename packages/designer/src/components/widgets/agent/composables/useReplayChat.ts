/**
 * 历史交互记录回显
 * 从后端获取 topicId 对应的扁平 chat 记录，重建为 ConversationRound[] 分层结构
 */
import { reactive } from 'vue';
import type { Ref } from 'vue';
import type {
  ConversationRound,
  PlanResult,
  PlanStep,
  EditorStepResult,
  EditorTurn,
  ChatRecord,
  ReplayChatDeps
} from '../types/agent';
import { getApprovalRisk } from '../utils/approval';
import { parseOutput } from '../utils/outputParser';

/** 生成轮次唯一 ID */
function genRoundId(): string {
  return `round_replay_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

/** 从 architect chat 的 content 中提取 intent */
function extractIntent(content: string): string {
  if (!content) return '';
  // 优先尝试解析 JSON 获取 intent（新格式：原始 LLM 响应）
  const m = content.match(/\{[\s\S]*\}/);
  if (m) {
    try {
      const parsed = JSON.parse(m[0]);
      if (parsed.intent) return parsed.intent;
    } catch {
      // JSON 解析失败，继续尝试旧格式
    }
  }
  // 兼容旧格式: "[Architect 规划] xxx"
  const prefix = '[Architect 规划] ';
  if (content.startsWith(prefix)) {
    return content.slice(prefix.length).trim();
  }
  return content.trim();
}

/** 尝试从 content 中解析 JSON 计划 */
function tryParsePlan(content: string): PlanResult | null {
  const m = content.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const parsed = JSON.parse(m[0]) as PlanResult;
    if (parsed.intent && Array.isArray(parsed.steps)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 从 editor chat 的 prompt 中解析步骤元数据
 * prompt 格式: "步骤 {stepId}: {description}\n类型: {type}\n目标: {target}\n工具: {toolName}\n..."
 */
function parseStepFromPrompt(chat: ChatRecord, stepIdx: number): PlanStep {
  const prompt = chat.prompt || '';
  const step: PlanStep = {
    id: chat.stepId || `step_${stepIdx}`,
    type: 'text',
    description: '',
    target: undefined,
    toolName: undefined
  };

  // 解析 description: "步骤 {stepId}: {description}"
  const descMatch = prompt.match(/^步骤\s*[^\s:]*:\s*(.+)$/m);
  if (descMatch) {
    step.description = descMatch[1].trim();
  }

  // 解析 type: "类型: {type}"
  const typeMatch = prompt.match(/类型:\s*(\S+)/);
  if (typeMatch) {
    const t = typeMatch[1].trim();
    if (t === 'tool_call' || t === 'vue_code' || t === 'diff' || t === 'text') {
      step.type = t;
    }
  }

  // 解析 target: "目标: {target}"
  const targetMatch = prompt.match(/目标:\s*(.+)$/m);
  if (targetMatch) {
    step.target = targetMatch[1].trim();
  }

  // 解析 toolName: "工具: {toolName}"
  const toolMatch = prompt.match(/工具:\s*(.+)$/m);
  if (toolMatch) {
    step.toolName = toolMatch[1].trim();
  }

  return step;
}

interface ReplayToolInfo {
  action?: string;
  result?: unknown;
  parameters?: unknown[];
  success?: boolean;
  error?: string;
  duration?: number;
  resultSummary?: string;
  approval?: EditorTurn['approval'];
}

/** 解析 toolContent 和 toolCallId 为工具调用信息 */
function parseToolInfo(chat: ChatRecord): ReplayToolInfo {
  const info: ReplayToolInfo = {};

  // toolCallId 格式: "{stepId}_{action}"
  if (chat.toolCallId) {
    const parts = chat.toolCallId.split('_');
    if (parts.length >= 2) {
      info.action = parts.slice(1).join('_');
    }
  }

  // toolContent 是 JSON: { action, result }
  if (chat.toolContent) {
    try {
      const parsed = JSON.parse(chat.toolContent);
      if (parsed.action) info.action = parsed.action;
      if (parsed.result !== undefined) info.result = parsed.result;
      if (Array.isArray(parsed.parameters)) info.parameters = parsed.parameters;
      if (typeof parsed.success === 'boolean') info.success = parsed.success;
      if (parsed.error) info.error = parsed.error;
      if (typeof parsed.duration === 'number') info.duration = parsed.duration;
      if (parsed.resultSummary) info.resultSummary = parsed.resultSummary;
      if (parsed.approval) info.approval = parsed.approval;
    } catch {
      // 解析失败忽略
    }
  }

  return info;
}

/** 推断 editor turn 的类型 */
function inferTurnType(chat: ChatRecord, hasToolContent: boolean): string {
  if (hasToolContent) return 'tool_call';

  const content = chat.content || '';
  // 检查是否包含 ```vue 代码块
  if (content.includes('```vue') || content.includes('```diff')) {
    if (content.includes('```diff')) return 'diff';
    return 'vue_code';
  }

  return 'text';
}

function parseDsl(dsl: ChatRecord['dsl']): Record<string, any> | undefined {
  if (!dsl) return;
  if (typeof dsl !== 'string') return dsl;
  try {
    return JSON.parse(dsl);
  } catch {
    return;
  }
}

/**
 * 从扁平 chat 列表重建 EditorStepResult[]
 * 按 stepId 分组，排除 summary
 */
function buildEditorResults(chats: ChatRecord[]): EditorStepResult[] {
  // 按 stepId 分组（排除 summary），保持出现顺序
  const stepOrder: string[] = [];
  const stepMap = new Map<string, ChatRecord[]>();

  for (const chat of chats) {
    if (chat.agentRole !== 'editor') continue;
    if (chat.stepId === 'summary' || !chat.stepId) continue;

    if (!stepMap.has(chat.stepId)) {
      stepMap.set(chat.stepId, []);
      stepOrder.push(chat.stepId);
    }
    stepMap.get(chat.stepId)!.push(chat);
  }

  const results: EditorStepResult[] = [];

  stepOrder.forEach((stepId, stepIdx) => {
    const group = stepMap.get(stepId)!;
    // 按 attempt 升序排列
    group.sort((a, b) => (a.attempt || 1) - (b.attempt || 1));

    // 从第一条 chat 解析步骤元数据
    const step = parseStepFromPrompt(group[0], stepIdx);

    // 构建 turns
    const turns: EditorTurn[] = group.map((chat) => {
      const toolInfo = parseToolInfo(chat);
      const parsedOutput = parseOutput(chat.content || '');
      const hasToolContent = !!toolInfo.action;
      const turnType = inferTurnType(chat, hasToolContent);

      const turn: EditorTurn = {
        turn: (chat.attempt || 1) - 1,
        type: turnType,
        content: chat.content || '',
        reasoning: chat.reasoning || '',
        prompt: chat.prompt || '',
        vue: chat.vue || undefined,
        dsl: parseDsl(chat.dsl)
      };
      turn.resultSummary =
        toolInfo.resultSummary ||
        (turnType === 'vue_code'
          ? 'Vue → DSL 已应用'
          : turnType === 'diff'
            ? 'Diff 已应用'
            : undefined);
      turn.approval = toolInfo.approval;

      if (toolInfo.action) {
        turn.toolAction = toolInfo.action;
        turn.toolParams =
          toolInfo.parameters ||
          (parsedOutput.type === 'tool_call'
            ? parsedOutput.tool?.parameters
            : undefined);
        if (toolInfo.result !== undefined || toolInfo.error) {
          turn.toolResult = {
            success: toolInfo.success ?? chat.status === 'Success',
            result: toolInfo.result,
            error:
              toolInfo.error ||
              (chat.status === 'Success' ? undefined : chat.message),
            duration: toolInfo.duration || 0
          };
        }
        if (
          !turn.approval &&
          getApprovalRisk(toolInfo.action) &&
          turn.toolResult
        ) {
          turn.approval = {
            id: `replay_${chat.id}`,
            action: toolInfo.action,
            risk: getApprovalRisk(toolInfo.action)!,
            status: 'approved'
          };
        }
      }

      return turn;
    });

    // 拼接所有 attempt 的 reasoning
    const allReasoning = group.map((c) => c.reasoning || '').join('');
    // 第一条 attempt 的 content 作为 slot content
    const slotContent = group[0]?.content || '';

    results.push({
      stepIdx,
      step,
      content: slotContent,
      reasoning: allReasoning,
      error: group.some((c) => c.status && c.status !== 'Success')
        ? group.find((c) => c.message)?.message || '执行失败'
        : null,
      done: true,
      turns
    });
  });

  return results;
}

/**
 * 将扁平 chat 列表分组为轮次
 * architect chat 开启新轮次，editor chat 归入当前轮次
 * single chat 自成一轮
 */
function groupChatsIntoRounds(chats: ChatRecord[]): ChatRecord[][] {
  const rounds: ChatRecord[][] = [];
  let currentRound: ChatRecord[] | null = null;

  for (const chat of chats) {
    const role = chat.agentRole || 'single';

    if (role === 'architect') {
      // architect 开启新轮次
      if (currentRound) {
        rounds.push(currentRound);
      }
      currentRound = [chat];
    } else if (role === 'single') {
      // single 自成一轮
      if (currentRound) {
        rounds.push(currentRound);
        currentRound = null;
      }
      rounds.push([chat]);
    } else {
      // editor 归入当前轮次
      if (!currentRound) {
        // 没有前置 architect，创建一个空起始
        currentRound = [];
      }
      currentRound.push(chat);
    }
  }

  // 收尾
  if (currentRound) {
    rounds.push(currentRound);
  }

  return rounds;
}

/** 从一组 chat 重建一个 ConversationRound */
function buildRound(chats: ChatRecord[]): ConversationRound {
  const round: ConversationRound = {
    id: genRoundId(),
    userMessage: '',
    architectChatId: '',
    architectPlan: null,
    architectAnswer: '',
    architectStreamText: '',
    reasoningText: '',
    editorResults: [],
    summaryText: '',
    summaryReasoning: '',
    summaryError: ''
  };

  // 分类 chat
  const architectChat = chats.find((c) => c.agentRole === 'architect');
  const summaryChat = chats.find(
    (c) => c.agentRole === 'editor' && c.stepId === 'summary'
  );
  const editorChats = chats.filter(
    (c) => c.agentRole === 'editor' && c.stepId !== 'summary'
  );

  // 处理 single 模式
  const singleChat = chats.find((c) => c.agentRole === 'single');

  if (architectChat) {
    round.userMessage = architectChat.prompt || '';
    round.architectChatId = architectChat.id || '';
    round.architectStreamText = architectChat.content || '';
    round.reasoningText = architectChat.reasoning || '';

    // 尝试解析 plan
    round.architectPlan = tryParsePlan(architectChat.content || '');

    // 若 plan 解析失败，从 editor chats 重建最小 plan
    if (!round.architectPlan && editorChats.length > 0) {
      const stepIds = [...new Set(editorChats.map((c) => c.stepId))];
      const steps: PlanStep[] = stepIds.map((sid, idx) => {
        const firstChat = editorChats.find((c) => c.stepId === sid)!;
        return parseStepFromPrompt(firstChat, idx);
      });
      round.architectPlan = {
        intent: extractIntent(architectChat.content || ''),
        safety: 'write',
        steps
      };
    }

    // 若无 editor steps，且有 plan.answer，作为直接回答
    if (editorChats.length === 0 && round.architectPlan?.answer) {
      round.architectAnswer = round.architectPlan.answer;
    } else if (editorChats.length === 0 && !round.architectPlan) {
      // 无法解析 plan 且无 steps，content 作为直接回答
      round.architectAnswer = architectChat.content || '';
    }
  } else if (singleChat) {
    // 单代理模式
    round.userMessage = singleChat.prompt || '';
    round.architectAnswer = singleChat.content || '';
    round.reasoningText = singleChat.reasoning || '';
    round.architectStreamText = singleChat.content || '';
  }

  // 构建 editor results
  round.editorResults = buildEditorResults(editorChats);

  // 处理 summary
  if (summaryChat) {
    round.summaryText = summaryChat.content || '';
    round.summaryReasoning = summaryChat.reasoning || '';
    if (summaryChat.status && summaryChat.status !== 'Success') {
      round.summaryError = summaryChat.message || '总结生成失败';
    }
  }

  return round;
}

export function useReplayChat(
  deps: ReplayChatDeps,
  conversationRounds: Ref<ConversationRound[]>
) {
  const { apiGet, statusText, statusType } = deps;

  async function loadChatHistory(topicId: string): Promise<void> {
    if (!topicId) {
      statusText.value = '缺少 Topic ID';
      statusType.value = 'danger';
      return;
    }

    statusText.value = '加载历史记录...';
    statusType.value = 'info';
    conversationRounds.value = [];

    try {
      const chats = await apiGet<ChatRecord[]>('/api/open/chat/list/:token', {
        id: topicId
      });

      if (!Array.isArray(chats)) {
        const msg = `接口返回数据格式异常 (期望数组，收到 ${typeof chats})`;
        console.error('[useReplayChat]', msg, chats);
        statusText.value = msg;
        statusType.value = 'danger';
        return;
      }

      if (chats.length === 0) {
        statusText.value = '未找到交互记录';
        statusType.value = 'warning';
        return;
      }

      // 分组为轮次
      const rounds = groupChatsIntoRounds(chats);

      // 重建每个轮次
      const reconstructedRounds = rounds.map((group) =>
        reactive(buildRound(group))
      );

      conversationRounds.value = reconstructedRounds;

      statusText.value = `已加载 ${reconstructedRounds.length} 轮对话记录`;
      statusType.value = 'success';
    } catch (e: any) {
      const errMsg = `加载失败: ${e.message}`;
      console.error('[useReplayChat]', errMsg, e);
      statusText.value = errMsg;
      statusType.value = 'danger';
    }
  }

  return { loadChatHistory };
}
