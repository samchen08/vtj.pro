import type { ProjectModel, ProjectSchema } from '@vtj/core';
import {
  useEngine,
  codeIncrementalUpdater,
  type AIChat,
  type AgentConfig,
  type ParseResult,
  type ParseRule,
  type ToolCall,
  type ToolContext
} from '../../framework';
import { TOOL_CONFIGS } from '../../managers';

// Constants
const PARSER_REGEX = {
  VUE: /```vue\r?\n([\s\S]*?)(?:\r?\n```|$)/,
  DIFF: /```diff\r?\n([\s\S]*?)(?:\r?\n```|$)/,
  JSON: /```json\r?\n([\s\S]*?)(?:\r?\n```|$)/
} as const;

const DEFAULT_CONFIG = {
  ACTIVE_DELAY_MS: 1500
} as const;

// Validation functions
function isValidVueSFC(vueContent: string): boolean {
  // Check if contains template tag (attributes allowed)
  const hasTemplate = /<template[\s\S]*?>[\s\S]*?<\/template>/i.test(
    vueContent
  );
  // Check if contains script tag (attributes allowed, but don't validate <script setup>)
  const hasScript = /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(vueContent);
  // Check if contains style tag (attributes allowed)
  const hasStyle = /<style[\s\S]*?>[\s\S]*?<\/style>/i.test(vueContent);
  return hasTemplate && hasScript && hasStyle;
}

function isValidDiffFormat(diffContent: string): boolean {
  // Validate format structure: allow comments and multiple SEARCH/REPLACE blocks
  const diffBlockPattern =
    /^\s*------- SEARCH\s*(?:.*\n)*?\s*=======\s*(?:.*\n)*?\s*\+\+\+\+\+\+\+ REPLACE\s*$/gm;
  return diffBlockPattern.test(diffContent);
}

function isToolCall(toolCall: any): boolean {
  if (!toolCall) return false;
  return typeof toolCall === 'object' && !!toolCall.action;
}

function toJsonString(json: any) {
  if (typeof json === 'object') {
    return JSON.stringify(json, null, 2);
  }
  return json;
}

function replaceCodeBlock(content: any) {
  if (typeof content === 'string') {
    return content.replace(/\`\`\`/g, '\\`\\`\\`');
  }
  return content;
}

function createResultContent(result: any) {
  if (typeof result === 'object') {
    return `\n\n\`\`\`json\n${replaceCodeBlock(toJsonString(result))}\n\`\`\`\n`;
  } else if (isValidVueSFC(result)) {
    return `\n\n\`\`\`vue\n${replaceCodeBlock(result)}\n\`\`\`\n`;
  } else {
    return `\n\n\`\`\`diff\n${replaceCodeBlock(result)}\n\`\`\`\n`;
  }
}

const PARSE_RULES: readonly ParseRule[] = [
  {
    type: 'vue',
    label: '全量生成',
    regex: PARSER_REGEX.VUE,
    validate: isValidVueSFC
  },
  {
    type: 'diff',
    label: '增量更新',
    regex: PARSER_REGEX.DIFF,
    validate: isValidDiffFormat
  },
  {
    type: 'json',
    label: '工具调用',
    regex: PARSER_REGEX.JSON,
    parse: (content: string) => JSON.parse(content)
  }
] as const;

function collectErrorMessage(msg: any) {
  let message = '';
  if (Array.isArray(msg)) {
    message += '页面存在以下错误，请检查并修复：\n';
    message += msg.join(';\n');
  }
  return message
    ? message
    : '请检查代码是否有错误，是否符合模版和规则要求，并改正';
}

export function useAgent(config: AgentConfig) {
  const engine = useEngine();
  const { project, service, toolRegistry } = engine;

  const activeDelayMs = config.activeDelayMs || DEFAULT_CONFIG.ACTIVE_DELAY_MS;
  const currentTopic = config.currentTopic;

  const convertVueToDsl = async (chat: AIChat) => {
    if (!currentTopic.value) return;
    const projectDsl = project.value?.toDsl() as ProjectSchema;
    const { name = '', id = '' } = engine.current.value || {};
    const source = chat.vue;
    if (!source) return;
    return await service.parseVue(projectDsl, {
      id,
      name,
      source
    });
  };

  // Create tool context
  const toolContext: ToolContext = {
    engine,
    project: project.value as ProjectModel,
    service,
    toolRegistry,
    config: { activeDelayMs, ...config }
  };

  // Register all tools using configuration
  TOOL_CONFIGS.forEach((toolConfig) => {
    toolRegistry.register({
      name: toolConfig.name,
      description: toolConfig.description,
      parameters: toolConfig.parameters,
      handler: toolConfig.createHandler(toolContext)
    });
  });

  const parseOutput = (content: string, flag?: string): ParseResult | null => {
    // Early return for empty content
    if (!content || typeof content !== 'string') {
      return null;
    }

    if (flag && !content.includes(flag)) return null;

    // Check for code block markers to skip unnecessary regex matching
    const hasVueBlock = content.includes('```vue');
    const hasDiffBlock = content.includes('```diff');
    const hasJsonBlock = content.includes('```json');

    for (const rule of PARSE_RULES) {
      // Skip rule if content doesn't contain markers for this type
      if (rule.type === 'vue' && !hasVueBlock) continue;
      if (rule.type === 'diff' && !hasDiffBlock) continue;
      if (rule.type === 'json' && !hasJsonBlock) continue;

      // Use test() for quick existence check (fast path)
      if (!rule.regex.test(content)) continue;

      // Now do the full match
      const matches = rule.regex.exec(content);
      if (!matches?.[1]) continue;

      const extractedContent = matches[1];

      if (rule.type === 'json') {
        try {
          const toolCall = JSON.parse(extractedContent);
          if (!isToolCall(toolCall)) {
            continue;
          }
        } catch (_e) {
          // Not valid JSON, skip this match
          continue;
        }
      }

      // Execute validation if applicable
      if (
        'validate' in rule &&
        rule.validate &&
        !rule.validate(extractedContent)
      ) {
        return {
          type: 'error',
          label: rule.label,
          content: `Invalid ${rule.type} format`
        };
      }

      // Parse content if applicable
      if ('parse' in rule) {
        try {
          return {
            type: rule.type,
            label: rule.label,
            content: rule.parse(extractedContent)
          };
        } catch (error) {
          return {
            type: 'error',
            label: rule.label,
            content: error instanceof Error ? error.message : String(error)
          };
        }
      }

      return {
        type: rule.type,
        label: rule.label,
        content: extractedContent
      };
    }

    return null;
  };

  const callTool = async (tool: ToolCall) => {
    let error: any = null;
    const result = await engine.toolRegistry
      .execute(tool.action, tool.parameters)
      .catch((e) => {
        error = e;
      });
    if (error) {
      const msg = error?.message
        ? `错误信息：${createResultContent(error.message || '未知错误')}`
        : '';
      return `O: 工具调用执行失败！${msg}`;
    }
    const res = result ? `结果:${createResultContent(result)}` : '';
    return `O: 工具调用执行成功。${res}`;
  };

  const getSource = (content: string) => {
    if (content.startsWith('O:')) {
      const result = parseOutput(content);
      if (result?.type === 'vue') {
        return result.content;
      }
    }
    return '';
  };

  const getCurrentVue = async () => {
    if (!engine.current.value) return '';
    const projectDsl = project.value?.toDsl();
    const dsl = engine.current.value.toDsl();
    if (!dsl || !projectDsl) return '';
    dsl.__VERSION__ = 'version';
    return await service.genVueContent(projectDsl, dsl);
  };

  const applyPatch = async (chat: AIChat) => {
    if (chat.status === 'Error' || chat.status === 'Failed') {
      throw new Error(chat.message || '增量更新错误');
    }
    const source = getSource(chat.prompt) || (await getCurrentVue());
    if (!source) {
      throw new Error('缺少基准代码');
    }
    const updated = codeIncrementalUpdater.parseIncrementalUpdate(chat.content);

    if (updated) {
      const result = codeIncrementalUpdater.applyIncrementalUpdate(
        source,
        updated
      );
      if (result.success) {
        chat.vue = result.updatedCode;
      } else {
        chat.status = 'Error';
        chat.message = result.error || '增量更新错误';
        throw new Error(chat.message);
      }
    } else {
      throw new Error('检测不到增量更新内容');
    }
  };

  const processOutput = async (chat: AIChat) => {
    const content = chat.content || chat.reasoning;
    const output = parseOutput(content, 'A:');
    chat.status = 'Success';

    if (!output) return { ...chat };

    if (output.type === 'error') {
      chat.status = 'Error';
      chat.message = output.content;
      chat.toolContent = `O: ${output.label}执行失败, 错误信息：${createResultContent(chat.message)}`;
    }

    if (output.type === 'json') {
      chat.toolContent = await callTool(output.content);
    }

    if (output.type === 'vue' || output.type === 'diff') {
      if (output.type === 'diff') {
        try {
          await applyPatch(chat);
        } catch (e: any) {
          chat.status = 'Error';
          chat.toolContent = `O: ${output.label}执行失败, 错误信息：${createResultContent(e.message)} \n需要全量生成代码`;
        }
      } else {
        chat.vue = output.content;
      }
      chat.source = chat.vue;
      const dsl = await convertVueToDsl(chat).catch((e: any) => {
        chat.message = collectErrorMessage(e);
        chat.status = 'Error';
        chat.toolContent = `O: ${output.label}执行失败, 错误信息：${createResultContent(chat.message)}`;
        return null;
      });
      if (dsl) {
        try {
          const _dsl = typeof dsl === 'object' ? dsl : JSON.parse(dsl);
          if (Array.isArray(_dsl)) {
            chat.status = 'Error';
            chat.message = collectErrorMessage(_dsl);
            chat.dsl = null;
            chat.toolContent = `O: ${output.label}执行失败, 错误信息：${createResultContent(chat.message)}`;
          } else {
            chat.dsl = _dsl;
            chat.toolContent = `O: ${output.label}执行成功`;
          }
        } catch (err: any) {
          chat.dsl = null;
          chat.status = 'Error';
          chat.message = collectErrorMessage(err.message);
          chat.toolContent = `O: ${output.label}执行失败, 错误信息：${createResultContent(chat.message)}`;
        }
      }
    }

    return {
      ...chat,
      toolCallId: output.type
    } as AIChat;
  };

  const shouldNext = (chat: AIChat) => {
    const content = chat.content || chat.reasoning || '';
    if (content.includes('F:') || content.includes('R:')) {
      return false;
    }
    if (chat.toolCallId && (chat.toolContent || chat.message)) {
      return true;
    }

    if (chat.status === 'Error' || chat.status === 'Failed') {
      // 是否错误信息开头 400 413 500 等状态码，如果是模型API报错，停止运行
      return (
        chat.message &&
        !chat.message.startsWith('4') &&
        !chat.message.startsWith('5')
      );
    }
    return false;
  };

  const createNextPrompt = (chat: AIChat) => {
    if (chat.toolCallId) {
      return chat.toolContent || chat.message || 'O: 动作执行成功';
    }
    if (chat.status === 'Error' || chat.status === 'Failed') {
      return chat.toolContent || chat.message || 'O: 动作执行失败';
    }
    return '执行计划';
  };

  return {
    engine,
    parseOutput,
    callTool,
    processOutput,
    shouldNext,
    createNextPrompt,
    getCurrentVue,
    convertVueToDsl
  };
}

export { isValidVueSFC, isValidDiffFormat };
