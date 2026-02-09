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
  ACTIVE_DELAY_MS: 500
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

  const parseOutput = (content: string): ParseResult | null => {
    // Early return for empty content
    if (!content || typeof content !== 'string') {
      return null;
    }

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
        ? `错误信息：\n\n\`\`\`text\n${error.message || '未知错误'}\n\`\`\``
        : '';
      return `O: 工具调用执行失败！${msg}`;
    }
    const res = result
      ? `结果:\n\n\`\`\`json\n${toJsonString(result)}\n\`\`\``
      : '';
    return `O: 工具调用执行成功。${res}`;
  };

  const applyPatch = (chat: AIChat) => {
    const source = chat.source || '';
    if (!source) return;
    try {
      const updated = codeIncrementalUpdater.parseIncrementalUpdate(
        chat.content
      );

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
          chat.message += `\n切换到全量生成代码模式重新生成`;
        }
      }
    } catch (e: any) {
      chat.status = 'Error';
      chat.message = e?.message || '增量更新错误';
      chat.message += `\n切换到全量生成代码模式重新生成`;
    }
  };

  const processOutput = async (chat: AIChat) => {
    const content = chat.content;
    const output = parseOutput(content);
    chat.status = 'Success';
    if (!output) return { ...chat };

    if (output.type === 'error') {
      chat.status = 'Error';
      chat.message = output.content;
    }

    if (output.type === 'json') {
      chat.toolContent = await callTool(output.content);
    }

    if (output.type === 'vue' || output.type === 'diff') {
      if (output.type === 'diff') {
        applyPatch(chat);
      } else {
        chat.vue = output.content;
      }
      const dsl = await convertVueToDsl(chat).catch((e: any) => {
        chat.message = collectErrorMessage(e);
        chat.status = 'Error';
        chat.toolContent = `O: ${output.label}执行失败`;
        return null;
      });
      if (dsl) {
        try {
          const _dsl = typeof dsl === 'object' ? dsl : JSON.parse(dsl);
          if (Array.isArray(_dsl)) {
            chat.status = 'Error';
            chat.message = collectErrorMessage(_dsl);
            chat.dsl = null;
            chat.toolContent = `O: ${output.label}执行失败`;
          } else {
            chat.dsl = _dsl;
            chat.toolContent = `O: ${output.label}执行成功`;
          }
        } catch (err: any) {
          chat.dsl = null;
          chat.status = 'Error';
          chat.message = collectErrorMessage(err.message);
          chat.toolContent = `O: ${output.label}执行失败`;
        }
      }
    }

    return {
      ...chat,
      toolCallId: output.type
    } as AIChat;
  };

  const shouldNext = (chat: AIChat) => {
    if (chat.content.includes('\nF:') || chat.content.includes('\nR:')) {
      return false;
    }
    if (chat.toolCallId && chat.toolContent) {
      return true;
    }
    if (chat.status === 'Error' && chat.message) {
      return true;
    }
    return false;
  };

  const createNextPrompt = (chat: AIChat) => {
    return chat.toolCallId
      ? chat.toolContent || '动作执行成功'
      : chat.status === 'Error'
        ? chat.message
        : '继续生成';
  };

  const getCurrentVue = async () => {
    const projectDsl = project.value?.toDsl();
    const dsl = engine.current.value?.toDsl();
    if (!dsl || !projectDsl) return '';
    return await service.genVueContent(projectDsl, dsl);
  };

  return {
    engine,
    parseOutput,
    callTool,
    processOutput,
    shouldNext,
    createNextPrompt,
    getCurrentVue
  };
}

// Export validation functions for external use
export { isValidVueSFC, isValidDiffFormat };
