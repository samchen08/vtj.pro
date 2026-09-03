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
import { stripFileDescBlocks } from '../utils/filePrompt';
import { parseJsonObject } from '../utils/json';
import { parsePlanOutput } from '../utils/plan';
import { Messages } from '../utils/messages';
import { genId } from '../utils/genId';

/** 从 architect chat 的 content 中提取 intent */
function extractIntent(content: string): string {
  if (!content) return '';
  // 优先尝试解析 JSON 获取 intent（新格式：原始 LLM 响应）
  const parsed = parseJsonObject(content);
  if (parsed?.intent) return parsed.intent;
  // 兼容旧格式: "[Architect 规划] xxx"
  const prefix = '[Architect 规划] ';
  if (content.startsWith(prefix)) {
    return content.slice(prefix.length).trim();
  }
  return content.trim();
}

/**
 * 从 editor chat 中解析步骤元数据
 * 优先读取持久化的 stepMeta 快照（新记录）；旧记录回退到正则解析 prompt
 * prompt 格式: "步骤 {stepId}: {description}\n类型: {type}\n目标: {target}\n工具: {toolName}\n..."
 */
function parseStepFromPrompt(chat: ChatRecord, stepIdx: number): PlanStep {
  // 新记录：直接使用随 chat 持久化的结构化快照
  if (chat.stepMeta) {
    const meta = chat.stepMeta;
    return {
      id: meta.stepId || chat.stepId || `step_${stepIdx}`,
      type: ['tool_call', 'vue_code', 'diff', 'text'].includes(meta.type)
        ? (meta.type as PlanStep['type'])
        : 'text',
      description: meta.description || '',
      target: meta.target || undefined,
      toolName: meta.toolName || undefined,
      parameters: meta.parameters
    };
  }

  // 旧记录：回退正则解析
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
  direct?: boolean;
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
      info.direct = parsed.direct?.mode === 'on';
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
        direct: toolInfo.direct,
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
    const latestChat = group[group.length - 1];
    // 中断/取消的步骤标记 aborted 槽位（与执行期 cancelResult 语义一致），
    // 供刷新后断点恢复定位（resumeEditorPlan 依赖 last?.aborted）
    const aborted = latestChat?.status === 'Canceled';

    results.push({
      stepIdx,
      step,
      content: latestChat?.content || '',
      reasoning: allReasoning,
      error:
        latestChat?.status && latestChat.status !== 'Success'
          ? latestChat.message || Messages.replayStepFailed.text
          : null,
      done: true,
      aborted: aborted || undefined,
      turns,
      tokens: group.reduce((sum, item) => sum + (item.tokens || 0), 0)
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
      const previousArchitect = currentRound
        ?.filter((item) => item.agentRole === 'architect')
        .pop();
      if (
        previousArchitect &&
        parsePlanOutput(previousArchitect.content || '').preflight
      ) {
        currentRound!.push(chat);
        continue;
      }
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

/** 从一组 chat 重建一个 ConversationRound（空组返回 null，供上层过滤） */
function buildRound(chats: ChatRecord[]): ConversationRound | null {
  if (!chats.length) return null;

  const round: ConversationRound = {
    id: genId('round_replay'),
    userMessage: '',
    architectChatId: '',
    architectPlan: null,
    architectAnswer: '',
    architectStreamText: '',
    reasoningText: '',
    editorResults: [],
    summaryText: '',
    summaryReasoning: '',
    summaryError: '',
    summaryAttempt: 0
  };

  // 分类 chat
  const architectChats = chats.filter((c) => c.agentRole === 'architect');
  const firstArchitectChat = architectChats[0];
  const architectChat =
    [...architectChats]
      .reverse()
      .find((chat) => parsePlanOutput(chat.content || '').plan) ||
    architectChats[architectChats.length - 1];
  const summaryChat = chats
    .filter((c) => c.agentRole === 'editor' && c.stepId === 'summary')
    .pop();
  const editorChats = chats.filter(
    (c) => c.agentRole === 'editor' && c.stepId !== 'summary'
  );

  // 处理 single 模式
  const singleChat = chats.find((c) => c.agentRole === 'single');

  if (architectChat) {
    round.userMessage = stripFileDescBlocks(firstArchitectChat?.prompt || '');
    round.architectChatId = architectChat.id || '';
    round.architectStreamText = architectChat.content || '';
    round.reasoningText = architectChat.reasoning || '';
    round.attachments = firstArchitectChat?.files || undefined;
    round.promptSent = firstArchitectChat?.prompt || '';

    // 与运行时使用相同的解析规则，兼容没有 steps 的直接回答
    const parsedPlan = parsePlanOutput(architectChat.content || '');
    round.architectPlan = parsedPlan.plan;

    // 若 plan 解析失败，从 editor chats 重建最小 plan
    if (!round.architectPlan && editorChats.length > 0) {
      const stepIds = [...new Set(editorChats.map((c) => c.stepId))];
      const steps: PlanStep[] = stepIds.map((sid, idx) => {
        const firstChat = editorChats.find((c) => c.stepId === sid)!;
        return parseStepFromPrompt(firstChat, idx);
      });
      // 从工具调用记录推断安全等级：存在 destructive 审批记录则标记为 destructive
      let safety: PlanResult['safety'] = 'write';
      for (const chat of editorChats) {
        try {
          const parsed = JSON.parse(chat.toolContent || '');
          if (parsed?.approval?.risk === 'destructive') {
            safety = 'destructive';
            break;
          }
        } catch {
          // 解析失败忽略
        }
      }
      round.architectPlan = {
        intent: extractIntent(architectChat.content || ''),
        safety,
        steps
      };
    }

    // 若无 editor steps，且有 plan.answer，作为直接回答
    if (editorChats.length === 0 && round.architectPlan?.answer) {
      round.architectAnswer = round.architectPlan.answer;
    } else if (editorChats.length === 0 && !round.architectPlan) {
      const content = architectChat.content || '';
      // 模型自报错误（{"error": "..."}）→ 还原为具体规划失败原因
      if (parsedPlan.error) {
        round.architectError = parsedPlan.error;
      } else if (content.trim()) {
        // 无法解析 plan 且无 steps，content 作为直接回答
        round.architectAnswer = content;
      } else {
        // 大模型输出为空/无效（如流式中断、模型异常），记录规划失败
        round.architectError = Messages.planInvalid.text;
      }
    }

    // 服务端记录的 architect 错误状态（如 SSE 失败、模型输出异常）
    if (
      !round.architectError &&
      architectChat.status &&
      architectChat.status !== 'Success'
    ) {
      round.architectError = architectChat.message || Messages.planInvalid.text;
    }
  } else if (singleChat) {
    // 单代理模式
    round.userMessage = stripFileDescBlocks(singleChat.prompt || '');
    round.architectAnswer = singleChat.content || '';
    round.reasoningText = singleChat.reasoning || '';
    round.architectStreamText = singleChat.content || '';
    round.attachments = singleChat.files || undefined;
    round.promptSent = singleChat.prompt || '';
  }

  // 构建 editor results
  round.editorResults = buildEditorResults(editorChats);

  // 处理 summary
  if (summaryChat) {
    round.summaryAttempt = summaryChat.attempt || 1;
    round.summaryText = summaryChat.content || '';
    round.summaryReasoning = summaryChat.reasoning || '';
    if (summaryChat.status && summaryChat.status !== 'Success') {
      round.summaryError =
        summaryChat.message || Messages.replaySummaryFailed.text;
    }
  }

  return round;
}

export function useReplayChat(
  deps: ReplayChatDeps,
  conversationRounds: Ref<ConversationRound[]>
) {
  const { getChats, setStatus } = deps;

  async function loadChatHistory(topicId: string): Promise<void> {
    if (!topicId) {
      setStatus(Messages.replayTopicIdMissing);
      return;
    }

    // 加载成功前保留现有轮次；失败时不清空旧数据
    setStatus(Messages.loadingHistory);

    try {
      const chats = await getChats(topicId);

      if (!Array.isArray(chats)) {
        console.error('[useReplayChat]', '接口返回数据格式异常', chats);
        setStatus(Messages.historyFormatInvalid(typeof chats));
        return;
      }

      if (chats.length === 0) {
        conversationRounds.value = [];
        setStatus(Messages.historyEmpty);
        return;
      }

      // 分组为轮次，过滤空轮次（无 architect 起始的孤儿 editor chat）
      const rounds = groupChatsIntoRounds(chats);
      const reconstructedRounds = rounds
        .map((group) => buildRound(group))
        .filter((r): r is ConversationRound => r !== null)
        .map((round) => reactive(round));

      conversationRounds.value = reconstructedRounds;

      setStatus(Messages.historyLoaded(reconstructedRounds.length));
    } catch (e: any) {
      console.error('[useReplayChat]', '加载失败:', e);
      setStatus(Messages.historyLoadFailed(e.message));
    }
  }

  return { loadChatHistory };
}
