import type { PageFile, ProjectModel, Service } from '@vtj/core';
import { delay } from '@vtj/utils';
import {
  useEngine,
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

interface AgentConfig {
  activeDelayMs?: number;
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

export function useAgent(config?: AgentConfig) {
  const engine = useEngine();
  const { project, service, toolRegistry } = engine;

  const activeDelayMs = config?.activeDelayMs ?? DEFAULT_CONFIG.ACTIVE_DELAY_MS;

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

  return {
    engine,
    parseOutput
  };
}

// Export validation functions for external use
export { isValidVueSFC, isValidDiffFormat };
