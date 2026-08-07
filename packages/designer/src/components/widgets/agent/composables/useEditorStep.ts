/**
 * Editor 单步骤多轮执行
 * 管理一个计划步骤的工具调用循环（创建 chat → SSE 流 → 输出解析 → 类型分发）
 */
import { cloneDeep } from '@vtj/utils';
import {
  parseOutput,
  executeTool,
  formatToolFeedback,
  pickChat
} from '../utils';
import {
  createEditorTurn,
  getApprovalRisk,
  type ApprovalRisk
} from '../utils/approval';
import { Messages } from '../utils/messages';
import { genId } from '../utils/genId';
import { buildChatSaveBody } from '../utils/chat';
import { MAX_TURNS, TOOL_TIMEOUT_MS } from '../constants';
import type { Engine } from '../../../../framework';
import type {
  PlanStep,
  EditorStepResult,
  StreamCompletionResult,
  StepExecutionResult,
  EditorStepDeps,
  SaveChatBody
} from '../types/agent';

/** 正则转义 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 提取最新项目结构摘要（页面/API/区块）
 * 服务端 projectCache 为话题创建时的快照，多步骤执行中项目已被 applyAI 持续修改，
 * 此处以实时项目状态补充，缓解后续步骤对项目现状的认知滞后
 */
function getProjectContext(engine: Engine | null): string {
  try {
    if (!engine) return '';
    const project = engine.project.value;
    if (!project) return '';
    const pages = project.getPages().map((n) => n.name || n.id);
    const apis = (project.apis || []).map((n) => `${n.name}(${n.url || ''})`);
    const blocks = (project.blocks || []).map((n) => n.name || n.id);
    const lines: string[] = [];
    if (pages.length) lines.push(`页面: ${pages.join(', ')}`);
    if (apis.length) lines.push(`API: ${apis.join(', ')}`);
    if (blocks.length) lines.push(`区块: ${blocks.join(', ')}`);
    return lines.length ? `\n当前项目结构:\n${lines.join('\n')}` : '';
  } catch {
    return '';
  }
}

/** 获取当前文件源码（供 LLM 上下文注入），失败返回空串 */
async function getCurrentSourceContext(engine: Engine | null): Promise<string> {
  try {
    if (!engine) return '';
    const projectDsl = engine.project.value?.toDsl();
    const curDsl = engine.current.value?.toDsl();
    if (!projectDsl || !curDsl) return '';
    const source = await engine.service.genVueContent(
      projectDsl as any,
      curDsl as any
    );
    return source ? `\n当前文件源码:\n\`\`\`vue\n${source}\n\`\`\`` : '';
  } catch {
    return '';
  }
}

export function useEditorStep(deps: EditorStepDeps) {
  const {
    streamCompletion,
    postChat,
    saveChat: saveRemoteChat,
    updateTopic,
    getEngine,
    setStatus,
    requestApproval
  } = deps;

  /** 查询工具显式声明的风险等级，未声明时按规则推断 */
  function riskOf(action: string): ApprovalRisk | null {
    const engine = getEngine();
    const declared = engine?.toolRegistry.get(action)?.risk;
    return getApprovalRisk(action, declared ?? null);
  }

  async function approve(
    turnInfo: EditorStepResult['turns'][0],
    action: string,
    risk: ApprovalRisk
  ): Promise<boolean> {
    const id = genId('approval');
    turnInfo.approval = {
      id,
      action,
      risk,
      status: 'pending'
    };
    setStatus(Messages.awaitingApproval(action, risk));
    const allowed = await requestApproval(id);
    turnInfo.approval.status = allowed ? 'approved' : 'rejected';
    setStatus(
      allowed
        ? Messages.executingAction(action)
        : Messages.actionRejected(action)
    );
    return allowed;
  }

  /**
   * 在流回调中将内容追加到正确目标
   */
  function appendContent(
    turn: number,
    targetSlot: EditorStepResult,
    turnInfo: EditorStepResult['turns'][0],
    text: string
  ) {
    if (turn === 0) targetSlot.content += text;
    turnInfo.content += text;
  }

  /**
   * 轻量重试：保存失败后重试一次（服务端按 id 合并更新，幂等）
   */
  async function saveWithRetry<T>(
    fn: () => Promise<T>
  ): Promise<T | undefined> {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await fn();
      } catch (e) {
        if (attempt === 0) continue;
        throw e;
      }
    }
  }

  /**
   * 保存助手聊天记录
   */
  async function saveChat(
    edChatId: string,
    topicId: string,
    userId: string,
    content: string,
    result: StreamCompletionResult,
    tokens: number,
    status = 'Success'
  ) {
    const body = buildChatSaveBody({
      id: edChatId,
      topicId,
      userId,
      status,
      content,
      result,
      tokens
    });
    try {
      await saveWithRetry(() => saveRemoteChat(body));
    } catch (e) {
      // 保存聊天记录失败不影响主流程
      console.warn('保存 chat 记录失败:', e);
    }
  }

  /**
   * 回写工具执行结果到 chat.toolContent / toolCallId
   * 替代 userContent 中的"前序步骤结果"累加，由后端 createMessages 注入为独立消息
   */
  async function saveChatToolContent(
    chatId: string,
    topicId: string,
    userId: string,
    action: string,
    parameters: unknown[],
    result: {
      success: boolean;
      result?: any;
      error?: string;
      duration: number;
    },
    approval: EditorStepResult['turns'][0]['approval'],
    stepId: string
  ) {
    try {
      await saveWithRetry(() =>
        saveRemoteChat({
          id: chatId,
          topicId,
          userId,
          toolCallId: `${stepId}_${action}`,
          toolContent: JSON.stringify({
            action,
            parameters,
            result: result.result,
            success: result.success,
            error: result.error,
            duration: result.duration,
            approval
          })
        })
      );
    } catch {
      // 保存 toolContent 失败不影响主流程
    }
  }

  /**
   * 回写代码产出物到 chat.vue / chat.dsl / chat.source
   */
  async function saveChatArtifacts(
    chatId: string,
    topicId: string,
    userId: string,
    vueCode: string,
    dslObj: Record<string, any>,
    sourceCode?: string
  ) {
    try {
      const body: SaveChatBody = {
        id: chatId,
        topicId,
        userId,
        vue: vueCode,
        dsl: JSON.stringify(dslObj)
      };
      if (sourceCode !== undefined) {
        body.source = sourceCode;
      }
      await saveWithRetry(() => saveRemoteChat(body));
    } catch {
      // 保存 artifacts 失败不影响主流程
    }
  }

  /**
   * 执行一个 Editor 步骤（含多轮工具调用循环）
   */
  async function executeEditorStep(
    topicId: string,
    userId: string,
    step: PlanStep,
    stepIdx: number,
    allSteps: PlanStep[],
    stepStart: number,
    editorResults: EditorStepResult[],
    signal?: AbortSignal,
    retrySlot?: EditorStepResult
  ): Promise<StepExecutionResult> {
    let totalTokens = 0;
    const isCancelled = () => signal?.aborted ?? false;
    const cancelResult = (slot?: EditorStepResult) => {
      if (slot) {
        slot.done = true;
        // 标记取消产生的未完成槽位，供断点恢复定位
        slot.aborted = true;
      }
      return okResult('', totalTokens, stepStart);
    };

    /** 审批拒绝收尾：取消则标记断点槽位，否则写失败结果 */
    function buildRejection(
      slot: EditorStepResult,
      message: string,
      content: string
    ): StepExecutionResult | null {
      // 停止打断审批：按取消处理并标记断点槽位，供恢复时定位
      if (isCancelled()) return cancelResult(slot);
      slot.error = message;
      slot.done = true;
      return errResult(message, totalTokens, stepStart, content);
    }

    if (isCancelled()) return cancelResult();

    setStatus(
      Messages.editorExecuting(step.description, stepIdx + 1, allSteps.length)
    );

    await updateTopic({
      id: topicId,
      currentStepId: step.id,
      status: 'executing'
    });
    if (isCancelled()) return cancelResult();

    // 构建步骤提示词（工具结果上下文已由后端 createMessages 从 toolContent 注入）
    let stepPrompt =
      `步骤 ${step.id}: ${step.description}\n` +
      `类型: ${step.type}\n` +
      (step.target ? `目标: ${step.target}\n` : '') +
      (step.toolName ? `工具: ${step.toolName}\n` : '');

    // 注入最新项目结构摘要（服务端 projectCache 为话题创建时快照，实时状态在此补充）
    const projectContext = getProjectContext(getEngine());
    if (projectContext) {
      stepPrompt += projectContext;
    }

    // diff 类型步骤：预取当前文件源码注入 prompt，确保 SEARCH 块基于最新代码
    if (step.type === 'diff') {
      const sourceContext = await getCurrentSourceContext(getEngine());
      if (sourceContext) {
        stepPrompt += sourceContext;
      }
    }

    // 重试保留旧轮次；首次执行创建新展示槽位
    const attemptOffset = retrySlot
      ? Math.max(-1, ...retrySlot.turns.map((item) => item.turn)) + 1
      : 0;
    if (retrySlot) {
      retrySlot.content = '';
      retrySlot.reasoning = '';
      retrySlot.error = null;
      retrySlot.done = false;
      // 续跑成功后清除取消标记，避免残留影响后续断点定位
      retrySlot.aborted = false;
    } else {
      editorResults.push({
        stepIdx,
        step,
        content: '',
        reasoning: '',
        error: null,
        done: false,
        turns: []
      });
    }
    const slot = retrySlot || editorResults[editorResults.length - 1];
    const exposeTurn = (turnInfo: EditorStepResult['turns'][0]) => {
      if (!slot.turns.includes(turnInfo)) slot.turns.push(turnInfo);
    };

    // ── 多轮循环 ──
    const ctx: { nextPrompt?: string; needsRefreshVerify?: boolean } = {};

    /**
     * ReAct: 修复后自动调用 refresh 验证运行时错误是否消除
     * @returns true = 仍有错误需继续修复，false = 验证通过或无需验证
     */
    async function applyFixAndVerify(): Promise<boolean> {
      if (!ctx.needsRefreshVerify || isCancelled()) return false;

      const verifyResult = await executeTool(
        getEngine()!,
        'refresh',
        [],
        TOOL_TIMEOUT_MS,
        signal
      );
      if (isCancelled()) return false;
      if (verifyResult.success && verifyResult.result === true) {
        // 验证通过：无运行时错误
        ctx.needsRefreshVerify = false;
        return false;
      }

      // 仍有错误，自动获取源码并反馈给 LLM 继续修复
      const errMsg =
        typeof verifyResult.result === 'string'
          ? verifyResult.result
          : verifyResult.error || '未知错误';
      const sourceContext = await getCurrentSourceContext(getEngine());
      ctx.nextPrompt = `O: 修复已应用，但 refresh 仍检测到运行时错误${sourceContext}\n\n错误信息:\n${errMsg}\n\n请根据上述错误和源码继续修复。`;
      return true;
    }

    /**
     * vue_code / diff 共用尾部：审批 → 应用 → 回写产物 → 验证
     * @returns StepExecutionResult（完成/失败）或 'retry'（需继续修复循环）
     */
    async function approveAndApply(opts: {
      ti: EditorStepResult['turns'][0];
      content: string;
      edChatId: string;
      action: 'applyVue' | 'applyDiff';
      rejectMessage: string;
      engine: Engine;
      vueCode: string;
      dsl: any;
      getOriginalSource: () => Promise<string>;
    }): Promise<StepExecutionResult | 'retry'> {
      // turn 已在多轮循环开头入列（exposeTurn），此处无需重复
      // applyVue / applyDiff 非注册工具，风险恒为 write（见 getApprovalRisk 兜底规则）
      if (!(await approve(opts.ti, opts.action, 'write'))) {
        const rejected = buildRejection(slot, opts.rejectMessage, opts.content);
        if (rejected) return rejected;
      }
      if (isCancelled()) return cancelResult(slot);

      opts.ti.vue = opts.vueCode;
      opts.ti.dsl = opts.dsl;

      // 获取改前的当前文件源码（用于 chat.source 审计追溯，须在 applyAI 前）
      const originalSource = await opts.getOriginalSource();
      const applied = await opts.engine.applyAI(opts.dsl);
      if (!applied) {
        slot.error = Messages.lockedProject.text;
        slot.done = true;
        return errResult(
          Messages.lockedProject.text,
          totalTokens,
          stepStart,
          opts.content
        );
      }
      if (isCancelled()) return cancelResult(slot);

      // 回写产出的 Vue 源码和 DSL 到 chat（source 记录改前源码）
      await saveChatArtifacts(
        opts.edChatId,
        topicId,
        userId,
        opts.vueCode,
        opts.dsl,
        originalSource
      );

      // ReAct: 修复后自动 refresh 验证
      if (await applyFixAndVerify()) return 'retry';

      slot.content = opts.content;
      slot.done = true;
      return okResult(opts.content, totalTokens, stepStart);
    }

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      if (isCancelled()) return cancelResult(slot);
      const attempt = attemptOffset + turn;
      const ti = createEditorTurn(attempt);

      // 提前 push，确保首轮流式过程也能立即展示
      exposeTurn(ti);

      // 确定本轮 prompt
      let prompt: string;
      if (turn === 0) {
        prompt = stepPrompt;
      } else if (ctx.nextPrompt) {
        prompt = ctx.nextPrompt;
        ctx.nextPrompt = undefined;
      } else {
        prompt = '继续';
      }
      ti.prompt = prompt;

      // 创建 chat
      let chatRes: any;
      try {
        chatRes = await postChat({
          topicId,
          prompt,
          agent: 'editor',
          stepId: step.id,
          attempt: attempt + 1,
          userId: userId || '',
          userName: ''
        });
      } catch (e: any) {
        slot.error = Messages.chatCreateFailed(e.message).text;
        slot.done = true;
        return errResult(slot.error!, totalTokens, stepStart);
      }

      const edChatId = pickChat(chatRes).chatId;
      if (isCancelled()) return cancelResult(slot);

      // 流式调用 LLM
      let result: StreamCompletionResult;
      try {
        result = await streamCompletion(
          topicId,
          edChatId,
          (text) => appendContent(turn, slot, ti, text),
          (r) => {
            ti.reasoning += r;
            slot.reasoning += r;
          }
        );
        if (isCancelled()) return cancelResult(slot);

        const fullContent =
          (turn === 0 ? slot.content : ti.content) || '(空输出)';
        const stepTokens = result.usage?.total_tokens || 0;
        totalTokens += stepTokens;

        const parsed = parseOutput(fullContent);

        // ── 类型分发 ──
        if (parsed.type === 'tool_call' && parsed.tool) {
          ti.type = 'tool_call';
          ti.content = fullContent;
          ti.toolAction = parsed.tool.action;
          ti.toolParams = parsed.tool.parameters;

          await saveChat(
            edChatId,
            topicId,
            userId,
            fullContent,
            result,
            stepTokens
          );

          // 深拷贝参数，防止 toolRegistry.execute 内部修改原对象
          const execParams = cloneDeep(parsed.tool.parameters);
          const risk = riskOf(parsed.tool.action);
          if (risk) exposeTurn(ti);
          if (risk && !(await approve(ti, parsed.tool.action, risk))) {
            ti.toolResult = {
              success: false,
              error: '用户拒绝执行',
              duration: 0
            };
            await saveChatToolContent(
              edChatId,
              topicId,
              userId,
              parsed.tool.action,
              parsed.tool.parameters,
              ti.toolResult,
              ti.approval,
              step.id
            );
            exposeTurn(ti);
            const rejected = buildRejection(
              slot,
              Messages.userRejectedTool.text,
              fullContent
            );
            if (rejected) return rejected;
          }
          if (isCancelled()) return cancelResult(slot);
          const execResult = await executeTool(
            getEngine()!,
            parsed.tool.action,
            execParams,
            TOOL_TIMEOUT_MS,
            signal
          );
          if (isCancelled()) return cancelResult(slot);

          ti.toolResult = {
            success: execResult.success,
            result: execResult.result,
            error: execResult.error,
            duration: execResult.duration
          };

          // 回写工具执行结果到 toolContent，供后续步骤的 LLM 上下文使用
          await saveChatToolContent(
            edChatId,
            topicId,
            userId,
            parsed.tool.action,
            parsed.tool.parameters,
            execResult,
            ti.approval,
            step.id
          );

          exposeTurn(ti);

          // tool_call 类型步骤：成功则立即结束
          if (step.type === 'tool_call' && execResult.success) {
            // refresh 工具特殊处理：result 为字符串（非 true）表示检测到运行时错误，需反馈给 LLM 修复
            if (
              parsed.tool.action === 'refresh' &&
              typeof execResult.result === 'string'
            ) {
              // 自动获取当前文件源码，与错误信息一并反馈，避免 LLM 额外调用 getCurrentFileContent
              const sourceContext = await getCurrentSourceContext(getEngine());
              ctx.needsRefreshVerify = true;
              ctx.nextPrompt = `O: refresh 检测到运行时错误${sourceContext}\n\n错误信息:\n${execResult.result}\n\n请根据上述错误信息和源码，分析错误原因并修复代码。`;
              continue;
            }

            // 若步骤指定了目标工具（step.toolName），且当前调用的不是目标工具，
            // 说明 LLM 正在为修复错误而调用辅助工具（如 getCurrentFileContent），
            // 此时不应结束步骤，而是继续循环让 LLM 完成修复
            if (step.toolName && parsed.tool.action !== step.toolName) {
              ctx.nextPrompt = formatToolFeedback(execResult);
              continue;
            }

            slot.content = fullContent;
            slot.done = true;
            return okResult(fullContent, totalTokens, stepStart, {
              action: parsed.tool.action,
              result: execResult.result
            });
          }

          // 工具执行后，将反馈传给下一轮
          ctx.nextPrompt = formatToolFeedback(execResult);
          continue;
        }

        if (parsed.type === 'vue_code' && parsed.code) {
          ti.type = 'vue_code';
          ti.content = fullContent;
          ti.resultSummary = 'Vue → DSL 已应用';

          await saveChat(
            edChatId,
            topicId,
            userId,
            fullContent,
            result,
            stepTokens
          );

          try {
            const engine = getEngine()!;
            const projectDsl = engine.project.value?.toDsl();
            if (!projectDsl) throw new Error(Messages.projectNotReady.text);

            const curDsl = engine.current.value?.toDsl();
            const blockDsl = await engine.service.parseVue(projectDsl as any, {
              id: curDsl?.id || 'ai_gen',
              name: curDsl?.name || 'AiGenFile',
              source: parsed.code
            });

            // 返回数组代表解析错误，反馈给模型重试
            if (Array.isArray(blockDsl)) {
              const errorList = blockDsl
                .map((e: unknown) => `- ${String(e)}`)
                .join('\n');
              ctx.nextPrompt = `O: Vue 代码解析失败\n错误信息:\n${errorList}\n\n请根据上述错误修改代码。常见限制：不支持顶层 const x = null、不支持 NullLiteral 等。请改用 ref()、reactive()、computed() 或函数声明。`;
              ti.resultSummary = `解析错误 (${blockDsl.length} 项)，等待重试`;
              continue;
            }

            const outcome = await approveAndApply({
              ti,
              content: fullContent,
              edChatId,
              action: 'applyVue',
              rejectMessage: Messages.userRejectedVue.text,
              engine,
              vueCode: parsed.code,
              dsl: blockDsl,
              getOriginalSource: async () => {
                try {
                  return (
                    (await engine.service.genVueContent(
                      projectDsl as any,
                      curDsl as any
                    )) || ''
                  );
                } catch {
                  return '';
                }
              }
            });
            if (outcome === 'retry') continue;
            return outcome;
          } catch (e: any) {
            // 必须回写槽位错误与完成标记，否则上层 toStepRecord 会丢失失败信息
            const message = Messages.vueToDslFailed(e.message).text;
            slot.error = message;
            slot.done = true;
            return errResult(message, totalTokens, stepStart, fullContent);
          }
        }

        if (
          parsed.type === 'diff' &&
          parsed.patches &&
          parsed.patches.length > 0
        ) {
          ti.type = 'diff';
          ti.content = fullContent;
          ti.resultSummary = `Diff 已应用: ${parsed.patches.length} 处修改`;

          await saveChat(
            edChatId,
            topicId,
            userId,
            fullContent,
            result,
            stepTokens
          );

          try {
            const engine = getEngine()!;
            const projectDsl = engine.project.value?.toDsl();
            const curDsl = engine.current.value?.toDsl();
            if (!projectDsl || !curDsl)
              throw new Error(Messages.fileNotReady.text);

            const originalVue = await engine.service.genVueContent(
              projectDsl as any,
              curDsl as any
            );
            if (!originalVue) throw new Error(Messages.sourceUnavailable.text);

            // 归一化换行符（CRLF → LF），避免 SEARCH 块因换行不一致匹配失败
            let modifiedVue = originalVue.replace(/\r\n/g, '\n');
            for (const patch of parsed.patches) {
              const search = patch.search.replace(/\r\n/g, '\n');
              const replace = patch.replace.replace(/\r\n/g, '\n');
              const count = (
                modifiedVue.match(new RegExp(escapeRegExp(search), 'g')) || []
              ).length;
              if (count === 0) {
                ctx.nextPrompt = `O: diff 执行失败\n错误: SEARCH 块未找到匹配\n\n当前文件源码:\n\`\`\`vue\n${originalVue}\n\`\`\`\n\n找不到以下代码:\n\`\`\`\n${patch.search}\n\`\`\`\n\n请基于上述当前源码重新构造 SEARCH 块，确保缩进、空行、字符完全一致，或使用全量代码模式。`;
                throw new Error('SEARCH_NOT_FOUND');
              }
              if (count > 1) {
                ctx.nextPrompt = `O: diff 执行失败\n错误: SEARCH 块匹配到 ${count} 处\n\n当前文件源码:\n\`\`\`vue\n${originalVue}\n\`\`\`\n\n请提供更具体的上下文，确保 SEARCH 块在当前文件中是唯一的。`;
                throw new Error('SEARCH_DUPLICATE');
              }
              modifiedVue = modifiedVue.replace(search, replace);
            }

            const newDsl = await engine.service.parseVue(projectDsl as any, {
              id: curDsl?.id || 'ai_gen',
              name: curDsl?.name || 'AiGenFile',
              source: modifiedVue
            });
            const outcome = await approveAndApply({
              ti,
              content: fullContent,
              edChatId,
              action: 'applyDiff',
              rejectMessage: Messages.userRejectedDiff.text,
              engine,
              vueCode: modifiedVue,
              dsl: newDsl,
              getOriginalSource: async () => originalVue
            });
            if (outcome === 'retry') continue;
            return outcome;
          } catch (e: any) {
            if (
              e.message === 'SEARCH_NOT_FOUND' ||
              e.message === 'SEARCH_DUPLICATE'
            ) {
              continue;
            }
            // 必须回写槽位错误与完成标记，否则上层 toStepRecord 会丢失失败信息
            const message = Messages.diffApplyFailed(e.message).text;
            slot.error = message;
            slot.done = true;
            return errResult(message, totalTokens, stepStart, fullContent);
          }
        }

        // 文本输出 / 未知
        const isText =
          parsed.error === '未找到代码块' && fullContent.length > 0;
        ti.type = isText ? 'text' : 'unknown';
        ti.content = fullContent;
        exposeTurn(ti);
        slot.content = fullContent;
        slot.done = true;

        await saveChat(
          edChatId,
          topicId,
          userId,
          fullContent,
          result,
          stepTokens,
          isText ? 'Success' : 'Error'
        );

        return {
          content: fullContent,
          error: isText ? null : parsed.error || '无法识别输出格式',
          tokens: totalTokens,
          duration: Date.now() - stepStart
        };
      } catch (e: any) {
        slot.error = e.message;
        slot.done = true;
        return errResult(e.message, totalTokens, stepStart);
      }
    }

    // 超过 MAX_TURNS
    const maxTurnsError = Messages.maxTurnsReached(MAX_TURNS).text;
    slot.error = maxTurnsError;
    slot.done = true;
    return errResult(maxTurnsError, totalTokens, stepStart);
  }

  return { executeEditorStep };
}

// ── 内部辅助 ──

function okResult(
  content: string,
  tokens: number,
  start: number,
  toolResult?: StepExecutionResult['toolResult']
): StepExecutionResult {
  return {
    content,
    error: null,
    tokens,
    duration: Date.now() - start,
    toolResult: toolResult ?? null
  };
}

function errResult(
  error: string,
  tokens: number,
  start: number,
  content = ''
): StepExecutionResult {
  return { content, error, tokens, duration: Date.now() - start };
}
