import type { PageFile } from '@vtj/core';
import { delay } from '@vtj/utils';
import type { ToolConfig } from '../../framework';

const getPages: ToolConfig = {
  name: 'getPages',
  description: '获取当前项目的全部页面组件',
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
      return file;
    }
};

export const TOOL_CONFIGS: ToolConfig[] = [getPages, createPage, active];
