import type { PageFile, BlockFile, ApiSchema } from '@vtj/core';
import { delay } from '@vtj/utils';
import type { ToolConfig } from '../../framework';

/**
 * 获取项目页面列表
 */
const getPages: ToolConfig = {
  name: 'getPages',
  description: '获取当前项目的全部页面',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      const pages = project.getPages() || [];
      return pages.map((page: any) => {
        const { id, name, title, layout, dir } = page;
        return {
          id,
          name,
          title,
          layout,
          dir
        };
      });
    }
};

/**
 * 创建页面
 */
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
        dir: {
          type: 'boolean',
          description: '是否目录,目录的子级可以包含目录或页面',
          required: false
        },
        layout: {
          type: 'boolean',
          description:
            '是否布局页面，布局页面的子级是子页面，需要以 RouterView 结合',
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
      const newPage = await project.createPage(
        Object.assign(
          {
            cache: false,
            dir: false,
            layout: false,
            hidden: false,
            icon: '',
            mask: false,
            meta: '',
            needLogin: false,
            pure: true,
            raw: false,
            style: null,
            page: 'page'
          },
          page
        ),
        parentId
      );
      project.active(newPage);
      await delay(config.activeDelayMs);
      const { name, title, layout, dir } = page;
      return newPage
        ? {
            name,
            title,
            layout,
            dir,
            id: newPage.id
          }
        : null;
    }
};

/**
 * 更新页面信息
 */
const updatePage: ToolConfig = {
  name: 'updatePage',
  description: '更改页面文件元信息',
  parameters: [
    {
      name: 'page',
      type: 'object',
      description: 'PageFile页面对象',
      required: true,
      properties: {
        id: {
          type: 'string',
          description: '页面ID, 必须',
          required: true
        },
        name: {
          type: 'string',
          description: '页面名称,如：PageName',
          required: false
        },
        title: {
          type: 'string',
          description: '页面标题',
          required: false
        }
      }
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (page: PageFile) => {
      const newPage = project.updatePage(page);
      await delay(config.activeDelayMs);
      if (newPage) {
        const { name, title, layout, dir, id } = newPage;
        return { name, title, layout, dir, id };
      }
      throw new Error('页面不存在');
    }
};

/**
 * 删除页面
 */
const removePage: ToolConfig = {
  name: 'removePage',
  description: '删除页面或目录文件',
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '页面文件ID',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (id: string) => {
      project.removePage(id);

      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 获取区块列表
 */
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

/**
 * 创建区块
 */
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

/**
 * 更新区块
 */
const updateBlock: ToolConfig = {
  name: 'updateBlock',
  description: '更改区块文件元信息',
  parameters: [
    {
      name: 'block',
      type: 'object',
      description: 'BlockFile区块组件对象',
      required: true,
      properties: {
        id: {
          type: 'string',
          description: '区块文件ID，必须',
          required: true
        },
        name: {
          type: 'string',
          description: '区块名称,如：BlockName',
          required: false
        },
        title: {
          type: 'string',
          description: '区块标题',
          required: false
        }
      }
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (block: BlockFile) => {
      const newBlock = project.updateBlock(block);
      await delay(config.activeDelayMs);
      if (newBlock) {
        const { name, title, id } = block;
        return {
          name,
          title,
          id
        };
      }
      throw new Error('区块文件不存在');
    }
};

/**
 * 删除区块
 */
const removeBlock: ToolConfig = {
  name: 'removeBlock',
  description: '删除区块文件',
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '区块文件ID',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (id: string) => {
      project.removeBlock(id);

      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 打开文件
 */
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

/**
 * 获取当前打开的文件信息
 */
const getCurrentFile: ToolConfig = {
  name: 'getCurrentFile',
  description: '获取当前打开的文件(页面、区块)元信息',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      const file = project.currentFile;
      if (file) {
        const { name, title, id } = file;
        return {
          name,
          title,
          id
        };
      }
      throw new Error('当前没有打开的文件');
    }
};

/**
 * 获取当前打开的文件内容
 */
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

/**
 * 设置API
 */
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

/**
 * 获取项目可用API清单
 */
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

/**
 * 删除API
 */
const removeApi: ToolConfig = {
  name: 'removeApi',
  description: '删除API',
  parameters: [
    {
      name: 'name',
      type: 'string',
      description: 'API名称或ID',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (name: string) => {
      project.removeApi(name);
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 设置应用主页
 */
const setHomepage: ToolConfig = {
  name: 'setHomepage',
  description: '设置应用主页, 把页面设置为应用的主页',
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '页面ID',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (id: string) => {
      project.setHomepage(id);
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 设置全局样式
 */
const setGlobalCss: ToolConfig = {
  name: 'setGlobalCss',
  description: '设置应用的全局css代码',
  parameters: [
    {
      name: 'css',
      type: 'string',
      description: 'css代码',
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (css: string) => {
      project.setGloblas('css', css);
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 获取应用全局css
 */
const getGlobalCss: ToolConfig = {
  name: 'getGlobalCss',
  description: '获取应用的全局css代码',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.css || '';
    }
};

/**
 * 设置应用全局状态
 */
const setGlobalStore: ToolConfig = {
  name: 'setGlobalStore',
  description: '设置应用的全局Pinia状态',
  parameters: [
    {
      name: 'store',
      type: 'string',
      description: `pinia store js代码, 代码样例：
\`\`\`javascript      
(app) => {
  return {
    state: () => {
      return {
        // 在这里定义状态
      }
    },
    getters: {
        // 在这里编写getter函数
    },
    actions: {
       // 在这里编写action函数
    }
  }
}
\`\`\`
store的代码是一个js函数，函数接收的app参数是 Vue的应用实例，函数返回一个标准 Pinia Store
      `,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (store: string) => {
      project.setGloblas('store', {
        type: 'JSFunction',
        value: store
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

const getGlobalStore: ToolConfig = {
  name: 'getGlobalStore',
  description: '获取应用的全局状态(Pinia Store)',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.store?.value || '';
    }
};

export const TOOL_CONFIGS: ToolConfig[] = [
  getPages,
  getBlocks,
  createPage,
  updatePage,
  removePage,
  createBlock,
  updateBlock,
  removeBlock,
  active,
  getCurrentFile,
  getCurrentFileContent,
  setApi,
  getApis,
  removeApi,
  setHomepage,
  setGlobalCss,
  getGlobalCss,
  setGlobalStore,
  getGlobalStore
];
