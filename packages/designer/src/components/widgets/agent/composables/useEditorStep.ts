/**
 * Editor 单步骤多轮执行
 * 管理一个计划步骤的工具调用循环（创建 chat → SSE 流 → 输出解析 → 类型分发）
 */
import { nextTick, type Ref } from 'vue';
import { cloneDeep } from '@vtj/utils';
import { parseOutput, executeTool, formatToolFeedback } from '../utils';
import { createEditorTurn, getApprovalRisk } from '../utils/approval';
import type {
  PlanStep,
  EditorStepResult,
  StreamCompletionResult,
  StepExecutionResult,
  EditorStepDeps
} from '../types/agent';

const MAX_TURNS = 10;

/** 正则转义 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function useEditorStep(deps: EditorStepDeps) {
  const {
    streamCompletion,
    apiPost,
    getEngine,
    statusText,
    statusType,
    requestApproval
  } = deps;

  async function approve(
    turnInfo: EditorStepResult['turns'][0],
    action: string
  ): Promise<boolean> {
    const risk = getApprovalRisk(action) || 'write';
    const id = `approval_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    turnInfo.approval = {
      id,
      action,
      risk,
      status: 'pending'
    };
    statusText.value = `等待批准: ${action}`;
    statusType.value = risk === 'destructive' ? 'danger' : 'warning';
    const allowed = await requestApproval(id);
    turnInfo.approval.status = allowed ? 'approved' : 'rejected';
    statusText.value = allowed ? `正在执行: ${action}` : `已拒绝: ${action}`;
    statusType.value = allowed ? 'warning' : 'info';
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
   * 保存助手聊天记录
   */
  async function saveChat(
    edChatId: string,
    topicId: string,
    userId: string,
    content: string,
    result: StreamCompletionResult,
    tokens: number,
    status = 'Success',
    toolContent?: string
  ) {
    const body: any = {
      id: edChatId,
      topicId,
      userId,
      status,
      content: content || ' ',
      reasoning: result.reasoning || '',
      modelUsed: result.modelUsed || '',
      tokens,
      tokensPrompt: result.usage?.prompt_tokens || 0,
      tokensCompletion: result.usage?.completion_tokens || 0,
      thinking: result.reasoningTime || 0
    };
    if (toolContent !== undefined) {
      body.toolContent = toolContent;
    }
    await apiPost('/api/open/chat/save/:token', body);
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
      await apiPost('/api/open/chat/save/:token', {
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
      });
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
      const body: any = {
        id: chatId,
        topicId,
        userId,
        vue: vueCode,
        dsl: JSON.stringify(dslObj)
      };
      if (sourceCode !== undefined) {
        body.source = sourceCode;
      }
      await apiPost('/api/open/chat/save/:token', body);
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
    editorResults: Ref<EditorStepResult[]>,
    signal?: AbortSignal
  ): Promise<StepExecutionResult> {
    let totalTokens = 0;
    const isCancelled = () => signal?.aborted ?? false;
    const cancelResult = (slot?: EditorStepResult) => {
      if (slot) slot.done = true;
      return okResult('', totalTokens, stepStart);
    };

    if (isCancelled()) return cancelResult();

    statusText.value = `Editor 执行中: ${step.description} (${stepIdx + 1}/${allSteps.length})`;
    statusType.value = 'warning';

    await apiPost('/api/open/topic/update/:token', {
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

    // diff 类型步骤：预取当前文件源码注入 prompt，确保 SEARCH 块基于最新代码
    if (step.type === 'diff') {
      try {
        const engine = getEngine();
        if (engine) {
          const projectDsl = engine.project.value?.toDsl();
          const curDsl = engine.current.value?.toDsl();
          if (projectDsl && curDsl) {
            const source = await engine.service.genVueContent(
              projectDsl as any,
              curDsl as any
            );
            if (source) {
              stepPrompt += `\n当前文件源码:\n\`\`\`vue\n${source}\n\`\`\``;
            }
          }
        }
      } catch {
        // 获取源码失败不影响主流程
      }
    }

    // 初始化展示槽位（push 后从响应式数组取引用，确保 .done 等修改能触发 Vue 渲染）
    editorResults.value.push({
      stepIdx,
      step,
      content: '',
      reasoning: '',
      error: null,
      done: false,
      turns: []
    });
    const slot = editorResults.value[editorResults.value.length - 1];
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

      const verifyResult = await executeTool(getEngine()!, 'refresh', []);
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

      let sourceContext = '';
      try {
        const engine = getEngine();
        if (engine) {
          const projectDsl = engine.project.value?.toDsl();
          const curDsl = engine.current.value?.toDsl();
          if (projectDsl && curDsl) {
            const source = await engine.service.genVueContent(
              projectDsl as any,
              curDsl as any
            );
            if (source) {
              sourceContext = `\n当前文件源码:\n\`\`\`vue\n${source}\n\`\`\``;
            }
          }
        }
      } catch {
        // ignore
      }

      ctx.nextPrompt = `O: 修复已应用，但 refresh 仍检测到运行时错误${sourceContext}\n\n错误信息:\n${errMsg}\n\n请根据上述错误和源码继续修复。`;
      return true;
    }

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      if (isCancelled()) return cancelResult(slot);
      const ti = createEditorTurn(turn);

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
        chatRes = await apiPost('/api/open/chat/post/:token', {
          topicId,
          prompt,
          agent: 'editor',
          stepId: step.id,
          attempt: turn + 1,
          userId: userId || '',
          userName: ''
        });
      } catch (e: any) {
        slot.error = `创建 chat 失败: ${e.message}`;
        return errResult(slot.error!, totalTokens, stepStart);
      }

      const edChatId =
        (chatRes.chat || chatRes).id || (chatRes.chat || chatRes).chatId || '';
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
            nextTick();
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
          if (getApprovalRisk(parsed.tool.action)) exposeTurn(ti);
          if (
            getApprovalRisk(parsed.tool.action) &&
            !(await approve(ti, parsed.tool.action))
          ) {
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
            slot.error = '用户拒绝执行此操作';
            slot.done = true;
            return errResult(slot.error, totalTokens, stepStart, fullContent);
          }
          if (isCancelled()) return cancelResult(slot);
          const execResult = await executeTool(
            getEngine()!,
            parsed.tool.action,
            execParams
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
              let sourceContext = '';
              try {
                const engine = getEngine();
                if (engine) {
                  const projectDsl = engine.project.value?.toDsl();
                  const curDsl = engine.current.value?.toDsl();
                  if (projectDsl && curDsl) {
                    const source = await engine.service.genVueContent(
                      projectDsl as any,
                      curDsl as any
                    );
                    if (source) {
                      sourceContext = `\n当前文件源码:\n\`\`\`vue\n${source}\n\`\`\``;
                    }
                  }
                }
              } catch {
                // 获取源码失败不影响主流程
              }

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
            if (!projectDsl) throw new Error('项目未就绪');

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

            ti.vue = parsed.code;
            ti.dsl = blockDsl;

            exposeTurn(ti);
            if (!(await approve(ti, 'applyVue'))) {
              slot.error = '用户拒绝应用 Vue 变更';
              slot.done = true;
              return errResult(slot.error, totalTokens, stepStart, fullContent);
            }
            if (isCancelled()) return cancelResult(slot);

            // 获取改前的当前文件源码（用于 chat.source 审计追溯，须在 applyAI 前）
            let currentSource = '';
            try {
              currentSource =
                (await engine.service.genVueContent(
                  projectDsl as any,
                  curDsl as any
                )) || '';
            } catch {
              /* ignore */
            }

            await engine.applyAI(blockDsl);
            if (isCancelled()) return cancelResult(slot);

            // 回写产出的 Vue 源码和 DSL 到 chat
            await saveChatArtifacts(
              edChatId,
              topicId,
              userId,
              parsed.code,
              blockDsl,
              currentSource
            );

            exposeTurn(ti);

            // ReAct: 修复后自动 refresh 验证
            if (await applyFixAndVerify()) continue;

            slot.content = fullContent;
            slot.done = true;
            return okResult(fullContent, totalTokens, stepStart);
          } catch (e: any) {
            return errResult(
              `Vue→DSL 失败: ${e.message}`,
              totalTokens,
              stepStart,
              fullContent
            );
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
            if (!projectDsl || !curDsl) throw new Error('当前文件未就绪');

            const originalVue = await engine.service.genVueContent(
              projectDsl as any,
              curDsl as any
            );
            if (!originalVue) throw new Error('无法获取当前文件源码');

            let modifiedVue = originalVue;
            for (const patch of parsed.patches) {
              const count = (
                modifiedVue.match(
                  new RegExp(escapeRegExp(patch.search), 'g')
                ) || []
              ).length;
              if (count === 0) {
                ctx.nextPrompt = `O: diff 执行失败\n错误: SEARCH 块未找到匹配\n\n当前文件源码:\n\`\`\`vue\n${originalVue}\n\`\`\`\n\n找不到以下代码:\n\`\`\`\n${patch.search}\n\`\`\`\n\n请基于上述当前源码重新构造 SEARCH 块，确保缩进、空行、字符完全一致，或使用全量代码模式。`;
                throw new Error('SEARCH_NOT_FOUND');
              }
              if (count > 1) {
                ctx.nextPrompt = `O: diff 执行失败\n错误: SEARCH 块匹配到 ${count} 处\n\n当前文件源码:\n\`\`\`vue\n${originalVue}\n\`\`\`\n\n请提供更具体的上下文，确保 SEARCH 块在当前文件中是唯一的。`;
                throw new Error('SEARCH_DUPLICATE');
              }
              modifiedVue = modifiedVue.replace(patch.search, patch.replace);
            }

            exposeTurn(ti);
            if (!(await approve(ti, 'applyDiff'))) {
              slot.error = '用户拒绝应用 Diff';
              slot.done = true;
              return errResult(slot.error, totalTokens, stepStart, fullContent);
            }
            if (isCancelled()) return cancelResult(slot);

            const newDsl = await engine.service.parseVue(projectDsl as any, {
              id: curDsl?.id || 'ai_gen',
              name: curDsl?.name || 'AiGenFile',
              source: modifiedVue
            });
            ti.vue = modifiedVue;
            ti.dsl = newDsl;
            if (isCancelled()) return cancelResult(slot);
            await engine.applyAI(newDsl);
            if (isCancelled()) return cancelResult(slot);

            // 回写 diff 产出的最终 Vue 源码和 DSL 到 chat（source 记录改前源码）
            await saveChatArtifacts(
              edChatId,
              topicId,
              userId,
              modifiedVue,
              newDsl,
              originalVue
            );

            exposeTurn(ti);

            // ReAct: 修复后自动 refresh 验证
            if (await applyFixAndVerify()) continue;

            slot.content = fullContent;
            slot.done = true;
            return okResult(fullContent, totalTokens, stepStart);
          } catch (e: any) {
            if (
              e.message === 'SEARCH_NOT_FOUND' ||
              e.message === 'SEARCH_DUPLICATE'
            ) {
              continue;
            }
            return errResult(
              `Diff 应用失败: ${e.message}`,
              totalTokens,
              stepStart,
              fullContent
            );
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

        await apiPost('/api/open/chat/save/:token', {
          id: edChatId,
          topicId,
          userId,
          status: isText ? 'Success' : 'Error',
          content: fullContent || ' ',
          reasoning: result.reasoning || '',
          modelUsed: result.modelUsed || '',
          tokens: stepTokens,
          tokensPrompt: result.usage?.prompt_tokens || 0,
          tokensCompletion: result.usage?.completion_tokens || 0,
          thinking: result.reasoningTime || 0
        });

        return {
          content: fullContent,
          error: isText ? null : parsed.error || '无法识别输出格式',
          tokens: totalTokens,
          duration: Date.now() - stepStart
        };
      } catch (e: any) {
        slot.error = e.message;
        return errResult(e.message, totalTokens, stepStart);
      }
    }

    // 超过 MAX_TURNS
    slot.error = `超过最大轮次 (${MAX_TURNS})`;
    slot.done = true;
    return errResult(`超过最大轮次 (${MAX_TURNS})`, totalTokens, stepStart);
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
