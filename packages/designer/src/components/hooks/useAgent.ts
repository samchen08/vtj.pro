import type { PageFile } from '@vtj/core';
import { delay } from '@vtj/utils';
import { useEngine } from '../../framework';

export function useAgent() {
  const engine = useEngine();
  const { project, service, toolRegistry } = engine;

  const vueRegex = /```vue\r?\n([\s\S]*?)(?:\r?\n```|$)/;
  const diffRegex = /```diff\r?\n([\s\S]*?)(?:\r?\n```|$)/;
  const jsonRegex = /```json\r?\n([\s\S]*?)(?:\r?\n```|$)/;

  toolRegistry.register({
    name: 'getPages',
    description: '获取当前项目的全部页面',
    parameters: [],
    handler: async () => {
      const pages = project.value?.getPages() || [];
      return pages.map((n) => {
        const { id, name, title, layout } = n;
        return {
          id,
          name,
          title,
          layout
        };
      });
    }
  });

  toolRegistry.register({
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
    handler: async (page: PageFile, parentId?: string) => {
      const newPage = await project.value?.createPage(page, parentId);
      return newPage
        ? {
            ...page,
            id: newPage.id
          }
        : null;
    }
  });

  toolRegistry.register({
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
    handler: async (id: string) => {
      const file = project.value?.getFile(id);
      if (file) {
        project.value?.active(file);

        await delay(300);
        const projectDsl = project.value?.toDsl();
        const fileDsl = await service.getFile(id).catch(() => null);
        if (projectDsl && fileDsl) {
          return await service
            .genVueContent(projectDsl, fileDsl)
            .catch(() => null);
        }
        return null;
      }
      return null;
    }
  });

  const parseOutput = (content: string) => {
    let matches = content.match(vueRegex);
    if (matches?.[1]) {
      return {
        type: 'vue',
        content: matches[1]
      };
    }

    matches = content.match(diffRegex);
    if (matches?.[1]) {
      return {
        type: 'diff',
        content: matches[1]
      };
    }

    matches = content.match(jsonRegex);
    if (matches?.[1]) {
      try {
        const json = JSON.parse(matches[1]);
        return {
          type: 'json',
          content: json
        };
      } catch (e) {
        return {
          type: 'error',
          content: JSON.stringify(e)
        };
      }
    }
    return null;
  };

  return {
    engine,
    parseOutput
  };
}
