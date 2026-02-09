import type { PageFile, BlockFile, ApiSchema } from '@vtj/core';
import { delay } from '@vtj/utils';
import type { ToolConfig } from '../../framework';

const getPages: ToolConfig = {
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
};

const createPage: ToolConfig = {
  name: 'createPage',
  description: '在当前项目新建页面',
  parameters: [
    {
      name: 'page',
      type: 'object',
      description: 'PageFile页面对象',
      required: true,
      properties: {
        name: {
          type: 'string',
          description: '页面名称,如：PageName',
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
    ({ project, config }) =>
    async (page: PageFile, parentId?: string) => {
      const newPage = await project.createPage(page, parentId);
      project.active(newPage);
      await delay(config.activeDelayMs);
      const { name, title, layout } = page;
      return newPage
        ? {
            name,
            title,
            layout,
            id: newPage.id
          }
        : null;
    }
};

const getBlocks: ToolConfig = {
  name: 'getBlocks',
  description: '获取当前项目的全部区块组件',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      const blocks = project.blocks || [];
      return blocks.map((block: any) => {
        const { id, name, title } = block;
        return {
          id,
          name,
          title
        };
      });
    }
};

const createBlock: ToolConfig = {
  name: 'createBlock',
  description: '在当前项目新建区块组件',
  parameters: [
    {
      name: 'block',
      type: 'object',
      description: 'BlockFile区块组件对象',
      required: true,
      properties: {
        name: {
          type: 'string',
          description: '区块名称,如：BlockName',
          required: true
        },
        title: {
          type: 'string',
          description: '区块标题',
          required: true
        }
      }
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (block: BlockFile) => {
      const newBlock = await project.createBlock(block);
      project.active(newBlock);
      await delay(config.activeDelayMs);
      const { name, title } = block;
      return newBlock
        ? {
            name,
            title,
            id: newBlock.id
          }
        : null;
    }
};

const active: ToolConfig = {
  name: 'active',
  description: '打开一个文件（页面或区块组件）',
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '文件(页面组件、区块组件)ID',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (id: string) => {
      const file = project.getFile(id);
      if (!file) {
        return null;
      }
      project.active(file);
      await delay(config.activeDelayMs);
      return true;
    }
};

const getCurrentFile: ToolConfig = {
  name: 'getCurrentFile',
  description: '获取当前打开的文件(页面、区块)',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      const file = project.currentFile;
      if (file) {
        return file;
      }
      throw new Error('当前没有打开的文件');
    }
};

const getCurrentFileContent: ToolConfig = {
  name: 'getCurrentFileContent',
  description: '获取当前打开的文件(页面、区块)内容源码',
  parameters: [],
  createHandler:
    ({ engine, project, service }) =>
    async () => {
      const id = engine.current.value?.id;
      if (id) {
        const file = project.getFile(id);
        if (!file) return null;
        const dsl = await service.getFile(file.id);
        return await service.genVueContent(project.toDsl(), dsl);
      }
      throw new Error('当前没有打开的文件');
    }
};

const setApi: ToolConfig = {
  name: 'setApi',
  description: '新增或更新项目接口API',
  parameters: [
    {
      name: 'api',
      type: 'object',
      description: 'ApiSchema 对象',
      required: true,
      properties: {
        name: {
          type: 'string',
          description: '接口名称,如：apiName',
          required: true
        },
        label: {
          type: 'string',
          description: '接口描述说明'
        },
        url: {
          type: 'string',
          description: '接口请求url',
          required: true
        },
        method: {
          type: 'string',
          description:
            '接口请求方法, 可选值： get | post | put | delete | patch | jsonp'
        }
      }
    }
  ],
  createHandler({ project, config }) {
    return async (api: ApiSchema) => {
      const result = project.setApi(api);
      await delay(config.activeDelayMs);
      return result;
    };
  }
};

const getApis: ToolConfig = {
  name: 'getApis',
  description: '获取当前项目可用的APIs',
  parameters: [],
  createHandler({ project, config }) {
    return async () => {
      await delay(config.activeDelayMs);
      return project.apis;
    };
  }
};

export const TOOL_CONFIGS: ToolConfig[] = [
  getPages,
  getBlocks,
  createPage,
  createBlock,
  active,
  getCurrentFile,
  getCurrentFileContent,
  setApi,
  getApis
];
