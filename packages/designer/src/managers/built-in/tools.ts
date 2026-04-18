import type {
  PageFile,
  BlockFile,
  ApiSchema,
  EnvConfig,
  I18nMessage
} from '@vtj/core';
import { delay } from '@vtj/utils';
import { APP_LIFE_CYCLE } from '@vtj/uni';
import type { ToolConfig } from '../../framework';

const getSkills: ToolConfig = {
  name: 'getSkills',
  description: `获取技能文档, 调用示例：
\`\`\`json  
{
  "action": "getSkills",
  "parameters":["技能ID 1", "技能ID 2"]
}
\`\`\`
  `,
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '技能ID',
      required: true
    }
  ],
  createHandler:
    ({ config }) =>
    async (...ids: string[]) => {
      if (config.getSkills) {
        return await config.getSkills(ids);
      }
      return '';
    }
};

const getMenus: ToolConfig = {
  name: 'getMenus',
  description: '获取当前项目的页面菜单树结构',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      const pages = project.getPageTree() || [];
      return pages.map((page: any) => {
        const { id, name, title, layout, dir, icon, children } = page;
        return {
          id,
          name,
          title,
          layout,
          dir,
          icon,
          children
        };
      });
    }
};

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
        const { id, name, title, layout, dir, icon } = page;
        return {
          id,
          name,
          title,
          layout,
          dir,
          icon
        };
      });
    }
};

/**
 * 创建页面
 */
const createPage: ToolConfig = {
  name: 'createPage',
  description: `在当前项目新建页面。有层级的页面，需先创建父级，例如如先创建目录或布局类型的页面。示例：
\`\`\`json      
{
  "action": "createPage",
  "parameters": [
    {
      "name": "Dashboard",
      "title": "仪表盘",
      "icon": "DataAnalysis"
    },
    "2gqoc7vp"
  ]
}
\`\`\`
    `,
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
        icon: {
          type: 'string',
          description: '图标,可选ElementPlus图标或 @vtj/icons的图标名称',
          required: false
        },
        dir: {
          type: 'boolean',
          description: '是否目录,目录的子级可以包含目录或页面',
          required: false
        },
        layout: {
          type: 'boolean',
          description:
            '是否布局页面，布局页面的子级是子页面，需要以 RouterView 结合，UniApp平台不支持目录和布局类型',
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
      if (typeof page !== 'object') {
        throw new Error(
          '调用 createPage 工具参数错误，第一个参数要求是 PageFile 对象'
        );
      }
      const platform = project.platform;
      if (platform === 'uniapp') {
        page.dir = false;
        page.layout = false;
      }
      // 容错处理
      const _parentId = parentId || (page as any).parentId;
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
        _parentId
      );
      if (!newPage.dir) {
        project.active(newPage);
        await delay(config.activeDelayMs);
      }
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
          required: true
        },
        title: {
          type: 'string',
          description: '页面标题',
          required: true
        },
        icon: {
          type: 'string',
          description: '图标,可选ElementPlus图标或 @vtj/icons的图标名称',
          required: false
        }
      }
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (page: PageFile) => {
      if (typeof page !== 'object') {
        throw new Error(
          '调用 updatePage 工具参数错误，第一个参数要求是 PageFile 对象'
        );
      }
      const newPage = project.updatePage(page);
      await delay(config.activeDelayMs);
      if (newPage) {
        const { name, title, layout, dir, id } = newPage;
        return { name, title, layout, dir, id };
      }
      throw new Error('页面不存在');
    }
};

const movePage: ToolConfig = {
  name: 'movePage',
  description: '更改页面层级，布局和目录类型的页面可以有子级页面',
  parameters: [
    {
      name: 'id',
      type: 'string',
      description: '需要更改的页面ID',
      required: true
    },
    {
      name: 'parentId',
      type: 'string',
      description: '更改到该页面ID的子级, 为null即移到根目录',
      required: false
    }
  ],
  createHandler:
    ({ project }) =>
    async (id: string, parentId: string) => {
      return project.movePageTo(id, parentId);
    }
};

/**
 * 删除页面
 */
const removePage: ToolConfig = {
  name: 'removePage',
  description:
    '删除页面或目录文件, 如删除目录或布局类型的页面，需先删除子级页面',
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
      if (typeof block !== 'object') {
        throw new Error(
          '调用 createBlock 工具参数错误，第一个参数要求是 BlockFile 对象'
        );
      }
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
        const projectDsl = project.toDsl();
        const dsl = await service.getFile(file.id, projectDsl);
        dsl.__VERSION__ = 'version';
        return await service.genVueContent(projectDsl, dsl);
      }
      throw new Error('当前没有打开的文件');
    }
};

const refresh: ToolConfig = {
  name: 'refresh',
  description:
    '刷新当前页面或区块组件运行时，当需要检测代码是否存在运行时错误可调用',
  parameters: [],
  createHandler:
    ({ engine, config }) =>
    async () => {
      let error: any = null;
      engine.provider.errorHandler = (e) => {
        error = e;
      };
      engine.simulator.refresh();
      await delay(config.activeDelayMs);
      engine.provider.errorHandler = null;
      return error
        ? `运行时报错：\n${error.message}\n请检查页面代码并修复`
        : true;
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
 * 批量删除API
 */
const removeApis: ToolConfig = {
  name: 'removeApis',
  description: '批量删除API',
  parameters: [
    {
      name: 'apis',
      type: 'array',
      description: 'API名称或ID数组',
      required: true,
      items: {
        type: 'string',
        description: 'API名称或ID'
      }
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (apis: string[] = []) => {
      for (const id of apis) {
        project.removeApi(id);
      }
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
      const platform = project.platform;
      if (platform === 'uniapp') {
        project.setUniConfig('css', css as any);
      } else {
        project.setGloblas('css', css);
      }
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
      const platform = project.platform;
      if (platform === 'uniapp') {
        project.uniConfig.css || '';
      } else {
        return project.globals.css || '没有全局CSS';
      }
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
store的代码是一个js函数，函数接收的app参数是 Vue的应用实例，函数返回一个标准 Pinia Store。
你可以调用 getSkills 工具或取 pinia 的用法
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

/**
 * 获取应用全局状态
 */
const getGlobalStore: ToolConfig = {
  name: 'getGlobalStore',
  description: '获取应用的全局状态(Pinia Store)',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.store?.value || '当前没有配置全局状态';
    }
};

/**
 * 配置权限控制插件
 */
const setGlobalAccess: ToolConfig = {
  name: 'setGlobalAccess',
  description: `设置权限控制插件配置项, 配置样例：
\`\`\`javascript  
(app) => {
  return {
    session: false,
    authKey: 'Authorization',
    storageKey: 'ACCESS_STORAGE',
    auth: '/#/login',
    whiteList: (to) => true,
    redirectParam: 'r',
    unauthorizedCode: 401,
    unauthorizedMessage: '登录已经失效，请重新登录！',
    noPermissionMessage: '无权限访问该页面',
    statusKey: 'code'
  }
}
\`\`\`

权限控制配置的代码是一个js函数，函数接收的app参数是 Vue的应用实例，函数返回 AccessOptions 配置项对象
你可以调用 getSkills 工具或取 access 用法
  `,
  parameters: [
    {
      name: 'access',
      type: 'string',
      description: `配置函数代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (access: string) => {
      project.setGloblas('access', {
        type: 'JSFunction',
        value: access
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 查看权限配置
 */
const getGlobalAccess: ToolConfig = {
  name: 'getGlobalAccess',
  description: '查看权限控制插件配置项',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.access?.value || '当前没有配置权限控制插件';
    }
};

/**
 * 查看全局请求配置
 */
const getGlobalAxios: ToolConfig = {
  name: 'getGlobalAxios',
  description: '查看Axios请求工具配置项',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.axios?.value || '当前没有配置请求工具';
    }
};

/**
 * 配置全局请求
 */
const setGlobalAxios: ToolConfig = {
  name: 'setGlobalAxios',
  description: `
设置全局Axios请求工具配置项, 配置样例：
\`\`\`javascript  
(app) => {
  return {
    baseURL: '/',
    timeout: 60000,
    settings: {
      type: 'form',
      validSuccess: true,
      originResponse: false,
      loading: true,
      failMessage: true,
      validate: (res) => {
        return res.data?.code === 0 || !!res.data?.success;
      }
    }
  }
}
\`\`\`
设置全局Axios请求工具配置项的代码是一个js函数，函数接收的app参数是 Vue的应用实例，函数返回 IRequestOptions 配置项对象
你可以调用 getSkills 工具或取 axios 用法
  `,
  parameters: [
    {
      name: 'axios',
      type: 'string',
      description: `配置函代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (axios: string) => {
      project.setGloblas('axios', {
        type: 'JSFunction',
        value: axios
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 设置请求拦截器
 */
const setGlobalRequestInterceptor: ToolConfig = {
  name: 'setGlobalRequestInterceptor',
  description: `设置全局Axios全局请求拦截器, 代码样例：

\`\`\`javascript
(config, app) => {
  return config;
}
\`\`\`

axios请求拦截的代码是一个js函数，函数接收两个参数:
- config: 请求的配置
- app: 当前Vue应用的实例

函数需要返回请求配置
  
`,
  parameters: [
    {
      name: 'request',
      type: 'string',
      description: `配置函代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (request: string) => {
      project.setGloblas('request', {
        type: 'JSFunction',
        value: request
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 查看请求拦截器
 */
const getGlobalRequestInterceptor: ToolConfig = {
  name: 'getGlobalRequestInterceptor',
  description: '查看全局Axios全局请求拦截器',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.request?.value || '当前没有配置请求拦截器';
    }
};

/**
 * 设置响应拦截器
 */
const setGlobalResponseInterceptor: ToolConfig = {
  name: 'setGlobalResponseInterceptor',
  description: `设置全局Axios全局响应拦截器, 代码样例：

\`\`\`javascript
(res, app) => {
  return res;
}
\`\`\`

axios响应拦截的代码是一个js函数，函数接收两个参数:
- res: Axios原始响应对象
- app: 当前Vue应用的实例

函数需要返回响应对象
  
`,
  parameters: [
    {
      name: 'response',
      type: 'string',
      description: `配置函代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (response: string) => {
      project.setGloblas('response', {
        type: 'JSFunction',
        value: response
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 查看响应拦截器
 */
const getGlobalResponseInterceptor: ToolConfig = {
  name: 'getGlobalResponseInterceptor',
  description: '查看全局Axios全局响应拦截器',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.response?.value || '当前没有配置响应拦截器';
    }
};

/**
 * 查看路由前置守卫
 */
const getGlobalBeforeEach: ToolConfig = {
  name: 'getGlobalBeforeEach',
  description: '查看全局前置路由守卫',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.beforeEach?.value || '当前没有全局前置路由守卫';
    }
};

/**
 * 查看路由后置守卫
 */
const getGlobalAfterEach: ToolConfig = {
  name: 'getGlobalAfterEach',
  description: '查看全局后置路由守卫',
  parameters: [],
  createHandler:
    ({ project, config }) =>
    async () => {
      await delay(config.activeDelayMs);
      return project.globals.afterEach?.value || '当前没有全局后置路由守卫';
    }
};

/**
 * 设置路由后置守卫
 */
const setGlobalBeforeEach: ToolConfig = {
  name: 'setGlobalBeforeEach',
  description: `设置全局前置路由守卫, 代码样例：

\`\`\`javascript
(to, from, next, app) => {
  next();
}
\`\`\`

前置路由守卫的代码是一个js函数，函数接收4个参数:
- to: 即将要进入的目标
- from: 当前导航正要离开的路由
- next: 执行函数
- app: 当前Vue应用的实例

函数需要返回响应对象
  
`,
  parameters: [
    {
      name: 'value',
      type: 'string',
      description: `配置函代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (value: string) => {
      project.setGloblas('beforeEach', {
        type: 'JSFunction',
        value: value
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

/**
 * 设置路由后置守卫
 */
const setGlobalAfterEach: ToolConfig = {
  name: 'setGlobalAfterEach',
  description: `设置全局后置路由守卫, 代码样例：

\`\`\`javascript
(to, from, failure, app) => {

}
\`\`\`

前置路由守卫的代码是一个js函数，函数接收4个参数:
- to: 即将要进入的目标
- from: 当前导航正要离开的路由
- failure: 失败
- app: 当前Vue应用的实例

函数需要返回响应对象
  
`,
  parameters: [
    {
      name: 'value',
      type: 'string',
      description: `配置函代码`,
      required: true
    }
  ],
  createHandler:
    ({ project, config }) =>
    async (value: string) => {
      project.setGloblas('afterEach', {
        type: 'JSFunction',
        value: value
      });
      await delay(config.activeDelayMs);
      return true;
    }
};

const getSelectedPath: ToolConfig = {
  name: 'getNodeSelected',
  description:
    '获取当前页面选中的节点路径，用于定位当前选中的页面元素，路径最后一个是选中的元素名称',
  parameters: [],
  createHandler:
    ({ engine }) =>
    async () => {
      const designer = engine.simulator.designer.value;
      if (!designer) return null;
      const { path, indexes = [] } = designer.selected.value || {};
      if (!path) return null;
      return path
        .map((n, i) => {
          return `${n.name}[${indexes[i]}]`;
        })
        .reverse()
        .join('>');
    }
};

const getEnv: ToolConfig = {
  name: 'getEnv',
  description:
    '获取环境变量列表, 环境变量的值可用 `app.config.globalProperties.$provider.env.变量名` 或在组件中用 `this.$provider.env.变量名`获取',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      return project.env || [];
    }
};

const createEnv: ToolConfig = {
  name: 'createEnv',
  description: '新增环境变量',
  parameters: [
    {
      name: 'page',
      type: 'object',
      description: 'PageFile页面对象',
      required: true,
      properties: {
        name: {
          type: 'string',
          description: '变量名称, 如：BASE_URL',
          required: true
        },
        development: {
          type: 'string',
          description: '在开发环境中的值',
          required: true
        },
        production: {
          type: 'string',
          description: '在生产环境中的值',
          required: true
        }
      }
    }
  ],
  createHandler:
    ({ project }) =>
    async (config: EnvConfig) => {
      const env = [...project.env, config];
      project.setEnv(env);
      return true;
    }
};

const removeEnv: ToolConfig = {
  name: 'removeEnv',
  description: '删除环境变量',
  parameters: [
    {
      name: 'name',
      type: 'string',
      description: '环境变量名',
      required: true
    }
  ],
  createHandler:
    ({ project }) =>
    async (name: string) => {
      const env = (project.env || []).filter((n) => n.name !== name);
      project.setEnv(env);
      return true;
    }
};

const getI18nMessage: ToolConfig = {
  name: 'getI18nMessage',
  description:
    '获取 vue-i18n 的 message 中英对照词条, 在组件可用 `this.$t.key` 调用词条',
  parameters: [],
  createHandler:
    ({ project }) =>
    async () => {
      return project.i18n.messages || [];
    }
};

const createI18nMessage: ToolConfig = {
  name: 'createI18nMessage',
  description: '新增 vue-i18n 的 message 中英对照词条',
  parameters: [
    {
      name: 'message',
      type: 'object',
      description: 'message词条',
      required: true,
      properties: {
        key: {
          type: 'string',
          description: '词条Key',
          required: true
        },
        'zh-CN': {
          type: 'string',
          description: '中文内容',
          required: true
        },
        en: {
          type: 'string',
          description: '英文内容',
          required: true
        }
      }
    }
  ],
  createHandler:
    ({ project }) =>
    async (message: I18nMessage) => {
      project.i18n.messages?.push(message);
      project.setI18n(project.i18n);
      return true;
    }
};

const removeI18nMessage: ToolConfig = {
  name: 'removeI18nMessage',
  description: '删除 vue-i18n 的 message 词条',
  parameters: [
    {
      name: 'key',
      type: 'string',
      description: '词条标识key',
      required: true
    }
  ],
  createHandler:
    ({ project }) =>
    async (key: string) => {
      project.i18n.messages = project.i18n.messages?.filter(
        (n) => n.key !== key
      );
      project.setI18n(project.i18n);
      return true;
    }
};

const setUniConfig: ToolConfig = {
  name: 'setUniConfig',
  description:
    '设置uniapp全局配置，包括pages.json，manifest.json 应用配置，全局css，App.vue 应用生命周期等',
  parameters: [
    {
      name: 'key',
      type: 'string',
      enum: ['manifestJson', 'pagesJson', 'css', ...APP_LIFE_CYCLE],
      description: '配置类型名称, 名称只能从枚举值中取',
      required: true
    },
    {
      name: 'value',
      type: 'string',
      description: `配置内容，只内容有以下规则:      
1. 当key为manifestJson 或 pagesJson 时，value 为 JSON字符串；
2. 当key为css时，value为css代码字符串;
3. 当key为生命周期名称时，value为js函数代码块，默认值为：
\`\`\`js
() => {
}
\`\`\`
4. 当value值为null时，表示清除该名称的配置
`,

      required: true
    }
  ],
  createHandler:
    ({ project }) =>
    async (key: any, value: any) => {
      if (key === 'css') {
        project.setUniConfig(key, value || undefined);
      } else if (['manifestJson', 'pagesJson'].includes(key)) {
        if (value) {
          project.setUniConfig(key, value ? JSON.parse(value) : undefined);
        }
      } else {
        project.setUniConfig(
          key,
          value ? ({ type: 'JSFunction', value } as any) : undefined
        );
      }

      return true;
    }
};

const getUniConfig: ToolConfig = {
  name: 'getUniConfig',
  description:
    '获取uniapp全局配置，包括pages.json，manifest.json 应用配置，全局css，App.vue 应用生命周期等',
  parameters: [
    {
      name: 'key',
      type: 'string',
      enum: ['manifestJson', 'pagesJson', 'css', ...APP_LIFE_CYCLE],
      description: '配置类型名称, 名称只能从枚举值中取',
      required: true
    }
  ],
  createHandler:
    ({ project }) =>
    async (key: any) => {
      const uniConfig: Record<string, any> = project.uniConfig || {};
      if (key === 'css') {
        return uniConfig.css || '';
      } else if (['manifestJson', 'pagesJson'].includes(key)) {
        const value = uniConfig[key];
        return value ? JSON.stringify(value, null, 2) : null;
      } else {
        return uniConfig[key]?.value;
      }
    }
};
export const TOOL_CONFIGS: ToolConfig[] = [
  getSkills,
  getMenus,
  getPages,
  getBlocks,
  createPage,
  updatePage,
  movePage,
  removePage,
  createBlock,
  updateBlock,
  removeBlock,
  active,
  getCurrentFile,
  getCurrentFileContent,
  refresh,
  setApi,
  getApis,
  removeApi,
  removeApis,
  setHomepage,
  setGlobalCss,
  getGlobalCss,
  setGlobalStore,
  getGlobalStore,
  setGlobalAccess,
  getGlobalAccess,
  getGlobalAxios,
  setGlobalAxios,
  setGlobalRequestInterceptor,
  getGlobalRequestInterceptor,
  getGlobalResponseInterceptor,
  setGlobalResponseInterceptor,
  getGlobalBeforeEach,
  getGlobalAfterEach,
  setGlobalBeforeEach,
  setGlobalAfterEach,
  getSelectedPath,
  getEnv,
  createEnv,
  removeEnv,
  getI18nMessage,
  createI18nMessage,
  removeI18nMessage,
  setUniConfig,
  getUniConfig
];
