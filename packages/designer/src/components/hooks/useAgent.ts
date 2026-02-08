import { type Ref } from 'vue';
import type { PageFile, ProjectModel, Service, ProjectSchema } from '@vtj/core';
import { delay } from '@vtj/utils';
import {
  useEngine,
  codeIncrementalUpdater,
  type AIChat,
  type AITopic,
  type ToolParameter,
  type ToolRegistry
} from '../../framework';

// Constants
const PARSER_REGEX = {
  VUE: /```vue\r?\n([\s\S]*?)(?:\r?\n```|$)/,
  DIFF: /```diff\r?\n([\s\S]*?)(?:\r?\n```|$)/,
  JSON: /```json\r?\n([\s\S]*?)(?:\r?\n```|$)/
} as const;

const DEFAULT_CONFIG = {
  ACTIVE_DELAY_MS: 300
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
  return typeof toolCall === 'object' && !!toolCall.action;
}

interface AgentConfig {
  activeDelayMs?: number;
  currentTopic: Ref<AITopic | null>;
}

interface ParseResult {
  type: 'vue' | 'diff' | 'json' | 'error';
  content: any;
}

type ParseRule =
  | {
      type: 'vue';
      regex: RegExp;
      validate: (content: string) => boolean;
    }
  | {
      type: 'diff';
      regex: RegExp;
      validate: (content: string) => boolean;
    }
  | {
      type: 'json';
      regex: RegExp;
      parse: (content: string) => any;
    };

const PARSE_RULES: readonly ParseRule[] = [
  {
    type: 'vue',
    regex: PARSER_REGEX.VUE,
    validate: isValidVueSFC
  },
  {
    type: 'diff',
    regex: PARSER_REGEX.DIFF,
    validate: isValidDiffFormat
  },
  {
    type: 'json',
    regex: PARSER_REGEX.JSON,
    parse: (content: string) => JSON.parse(content)
  }
] as const;

// Tool context interface
interface ToolContext {
  engine: ReturnType<typeof useEngine>;
  project: ProjectModel;
  service: Service;
  toolRegistry: ToolRegistry;
  config: AgentConfig & { activeDelayMs: number };
}

// Tool configuration interface
interface ToolConfig {
  name: string;
  description: string;
  parameters: ToolParameter[];
  createHandler: (context: ToolContext) => (...args: any[]) => Promise<any>;
}

interface ToolCall {
  action: string;
  parameters: any[];
}

// Tool configurations
const TOOL_CONFIGS: ToolConfig[] = [
  {
    name: 'getPages',
    description: '获取当前项目的全部页面',
    parameters: [],
    createHandler:
      ({ project }) =>
      async () => {
        const pages = project.getPages() || [];
        return pages.map((page: any) => {
          const { id, name, title, layout } = page;
          return {
            id,
            name,
            title,
            layout
          };
        });
      }
  },
  {
    name: 'createPage',
    description: '新建页面',
    parameters: [
      {
        name: 'page',
        type: 'object',
        description: 'PageFile页面对象',
        required: true,
        properties: {
          name: {
            type: 'string',
            description: '页面名称',
            required: true
          },
          title: {
            type: 'string',
            description: '页面标题',
            required: true
          },
          layout: {
            type: 'boolean',
            description: '是否布局页面',
            required: false
          }
        }
      },
      {
        name: 'parentId',
        type: 'string',
        description: '父页面ID（可选）',
        required: false
      }
    ],
    createHandler:
      ({ project }) =>
      async (page: PageFile, parentId?: string) => {
        const newPage = await project.createPage(page, parentId);
        return newPage
          ? {
              ...page,
              id: newPage.id
            }
          : null;
      }
  },
  {
    name: 'active',
    description: '打开文件',
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: '文件(页面、区块)ID',
        required: true
      }
    ],
    createHandler:
      ({ project, service, config }) =>
      async (id: string) => {
        const file = project.getFile(id);
        if (!file) {
          return null;
        }

        project.active(file);

        await delay(config.activeDelayMs);
        const projectDsl = project.toDsl();
        const fileDsl = await service.getFile(id).catch(() => null);

        if (projectDsl && fileDsl) {
          return await service
            .genVueContent(projectDsl, fileDsl)
            .catch(() => null);
        }
        return null;
      }
  }
];

function collectErrorMesssage(msg: any) {
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

  const vue2Dsl = async (chat: AIChat) => {
    if (!currentTopic.value) return;
    const id = currentTopic.value?.fileId as string;
    const projectDsl = project.value?.toDsl() as ProjectSchema;
    const { name = '' } = engine.current.value || {};
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
    for (const rule of PARSE_RULES) {
      const matches = content.match(rule.regex);
      if (!matches?.[1]) {
        continue;
      }
      const extractedContent = matches[1];

      if (rule.type === 'diff') {
        try {
          const toolCall = JSON.parse(extractedContent);
          if (!isToolCall(toolCall)) {
            continue;
          }
        } catch (_e) {}
      }

      // Execute validation if applicable
      if (
        'validate' in rule &&
        rule.validate &&
        !rule.validate(extractedContent)
      ) {
        return {
          type: 'error',
          content: `Invalid ${rule.type} format`
        };
      }

      // Parse content if applicable
      if ('parse' in rule) {
        try {
          return {
            type: rule.type,
            content: rule.parse(extractedContent)
          };
        } catch (error) {
          return {
            type: 'error',
            content: error instanceof Error ? error.message : String(error)
          };
        }
      }

      return {
        type: rule.type,
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
        ? `错误信息：${error.message || '未知错误'}`
        : '';
      return `O: 动作执行失败！${msg}`;
    }
    const res = result ? `结果:\n${result}` : '';
    return `O: 动作执行成功。${res}`;
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

    if (!output) return chat;

    // chat.toolCallId = output.type;

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
      const dsl = await vue2Dsl(chat).catch((e) => {
        chat.message = collectErrorMesssage(e);
        chat.status = 'Error';
        chat.toolContent = '动作执行失败';
        return null;
      });
      if (dsl) {
        try {
          const _dsl = typeof dsl === 'object' ? dsl : JSON.parse(dsl);
          if (Array.isArray(_dsl)) {
            chat.status = 'Error';
            chat.message = collectErrorMesssage(_dsl);
            chat.dsl = null;
            chat.toolContent = '动作执行失败';
          } else {
            chat.dsl = _dsl;
            chat.toolContent = '动作执行成功';
          }
        } catch (err: any) {
          chat.dsl = null;
          chat.status = 'Error';
          chat.message = collectErrorMesssage(err.message);
          chat.toolContent = '动作执行失败';
        }
      }
    }

    return {
      ...chat,
      toolCallId: output.type
    } as AIChat;
  };

  const shouldNext = (chat: AIChat) => {
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

  return {
    engine,
    parseOutput,
    callTool,
    processOutput,
    shouldNext,
    createNextPrompt
  };
}

// Export validation functions for external use
export { isValidVueSFC, isValidDiffFormat };
