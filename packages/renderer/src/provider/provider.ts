// Vue 相关依赖
import { type App, type InjectionKey, inject, defineAsyncComponent } from 'vue';
// 路由相关类型
import type {
  Router,
  RouteRecordName,
  RouteRecordRaw,
  RouteMeta
} from 'vue-router';
// 核心类型和工具
import {
  type ProjectSchema,
  type PageFile,
  type BlockFile,
  type Service,
  type Material,
  type BlockSchema,
  type NodeFromPlugin,
  Base,
  BUILT_IN_COMPONENTS
} from '@vtj/core';
// 工具函数
import {
  jsonp,
  loadScript,
  logger,
  request,
  url as urlUtils
} from '@vtj/utils';
// 本地模块
import { createSchemaApis, mockApis, mockCleanup } from './apis';
import { isVuePlugin, getMock } from '../utils';
import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent
} from '../utils';
// 常量定义
import {
  ContextMode,
  PAGE_ROUTE_NAME,
  HOMEPAGE_ROUTE_NAME
} from '../constants';
// 渲染相关
import {
  createRenderer,
  createLoader,
  getPlugin,
  type CreateRendererOptions
} from '../render';
// 页面容器组件
import { PageContainer } from './page';
import { StartupContainer } from './startup';
// 适配器类型
import { type ProvideAdapter } from './defaults';
// 版本信息
import { version } from '../version';

import { createMenus } from '../hooks';

export const providerKey: InjectionKey<Provider> = Symbol('Provider');

export interface ProviderOptions {
  service: Service;
  project?: Partial<ProjectSchema>;
  modules?: Record<string, () => Promise<any>>;
  mode?: ContextMode;
  adapter?: Partial<ProvideAdapter>;
  router?: Router;
  dependencies?: Record<string, () => Promise<any>>;
  materials?: Record<string, () => Promise<any>>;
  globals?: Record<string, any>;
  materialPath?: string;
  nodeEnv?: NodeEnv;
  install?: (app: App) => void;
  routeAppendTo?: RouteRecordName;
  pageRouteName?: string;
  routeMeta?: RouteMeta;
  enhance?: (app: App, provider: Provider) => void;
}

export enum NodeEnv {
  Production = 'production',
  Development = 'development'
}

/**
 * Provider 类是应用的核心提供者，负责:
 * - 管理项目配置和状态
 * - 加载依赖和资源
 * - 初始化路由
 * - 提供全局API和服务
 */
export class Provider extends Base {
  public mode: ContextMode; // 当前运行模式(设计/源码/预览等)
  public globals: Record<string, any> = {}; // 全局变量
  public modules: Record<string, () => Promise<any>> = {}; // 异步模块加载器
  public adapter: ProvideAdapter = { request, jsonp }; // 适配器接口
  public apis: Record<string, (...args: any[]) => Promise<any>> = {}; // API集合
  public dependencies: Record<string, () => Promise<any>> = {}; // 依赖项
  public materials: Record<string, () => Promise<any>> = {}; // 物料资源
  public library: Record<string, any> = {}; // 第三方库
  public service: Service; // 核心服务
  public project: ProjectSchema | null = null; // 当前项目配置
  public components: Record<string, any> = {}; // 组件集合
  public nodeEnv: NodeEnv = NodeEnv.Development; // 运行环境
  private router: Router | null = null; // 路由实例
  private materialPath: string = './'; // 物料路径
  private urlDslCaches: Record<string, any> = {}; // DSL缓存

  /**
   * 创建Provider实例
   * @param options 配置选项
   */
  constructor(public options: ProviderOptions) {
    super();
    const {
      service,
      mode = ContextMode.Raw,
      dependencies,
      materials,
      project = {},
      adapter = {},
      globals = {},
      modules = {},
      router = null,
      materialPath = './',
      nodeEnv = NodeEnv.Development
    } = options;
    this.mode = mode;
    this.modules = modules;
    this.service = service;
    this.router = router;
    this.materialPath = materialPath;
    this.nodeEnv = nodeEnv;
    if (dependencies) {
      this.dependencies = dependencies;
    }
    if (materials) {
      this.materials = materials;
    }

    Object.assign(this.globals, globals);
    Object.assign(this.adapter, adapter);

    const { access, request } = this.adapter;
    if (access) {
      access.connect({ mode, router, request });
    }

    // 设计模式在引擎已初始化了项目数据，这里不需要再次初始化
    if (project && mode !== ContextMode.Design) {
      this.load(project as ProjectSchema);
    } else {
      this.project = project as ProjectSchema;
    }
  }

  public createMock(func: (...args: any) => any) {
    return async (...args: any[]) => {
      let template = {};
      if (func) {
        try {
          template = await func.apply(func, args);
        } catch (e) {
          logger.warn('模拟数据模版异常', e);
        }
      }
      const Mock = getMock();
      return Mock?.mock(template);
    };
  }

  /**
   * 加载项目配置并初始化
   * 1. 从模块或服务加载项目配置
   * 2. 根据运行模式加载依赖或资源
   * 3. 初始化Mock数据
   * 4. 创建API接口
   * 5. 初始化路由(非uniapp平台)
   * @param project 项目配置
   */
  async load(project: ProjectSchema) {
    // 尝试从模块缓存加载项目配置，否则从服务初始化
    const module =
      this.modules[`.vtj/projects/${project.id}.json`] ||
      this.modules[`/src/.vtj/projects/${project.id}.json`];
    this.project = module ? await module() : await this.service.init(project);
    if (!this.project) {
      throw new Error('project is null');
    }
    const { apis = [], meta = [] } = this.project as ProjectSchema;
    const _window = window as any;
    if (_window) {
      // 解决CkEditor错误提示问题
      _window.CKEDITOR_VERSION = undefined;
    }

    /**
     * 源码模式只加载原生代码依赖
     * 其他模式加载完整资源(包括物料等)
     */
    if (this.mode === ContextMode.Raw) {
      await this.loadDependencies(_window);
    } else {
      await this.loadAssets(_window);
    }

    // 初始化Mock配置
    this.initMock(_window);
    // 创建API接口
    this.apis = createSchemaApis(apis, meta, this.adapter);
    // 清理并设置Mock API
    mockCleanup(_window);
    mockApis(apis, _window);

    // 非uniapp平台需要初始化路由
    if (project.platform !== 'uniapp') {
      this.initRouter();
    }

    // 触发就绪事件
    this.triggerReady();
  }

  public initMock(global?: any) {
    const Mock = getMock(global);
    if (Mock) {
      Mock.setup({
        timeout: '50-500'
      });
    }
  }

  private async loadDependencies(_window: any) {
    const entries = Object.entries(this.dependencies);
    for (const [name, raw] of entries) {
      if (!_window[name]) {
        _window[name] = this.library[name] = await raw();
      }
    }
  }

  private async loadAssets(_window: any) {
    const { dependencies: deps = [] } = this.project as ProjectSchema;
    const { dependencies, library, components, materialPath, nodeEnv } = this;
    const {
      libraryExports,
      libraryMap,
      materials,
      materialExports,
      materialMapLibrary
    } = parseDeps(deps, materialPath, nodeEnv === NodeEnv.Development);
    for (const libraryName of libraryExports) {
      const raw = dependencies[libraryName];
      const lib = _window[libraryName];
      if (lib) {
        library[libraryName] = lib;
      } else if (raw) {
        _window[libraryName] = library[libraryName] = await raw();
      } else {
        const urls = libraryMap[libraryName] || [];

        for (const url of urls) {
          if (isCSSUrl(url)) {
            await loadCss(libraryName, urlUtils.append(url, { v: version }));
          }
          if (isJSUrl(url)) {
            await loadScript(urlUtils.append(url, { v: version }));
          }
        }
        library[libraryName] = _window[libraryName];
      }
    }

    // 生产环境不需要物料描述文件
    if (nodeEnv === NodeEnv.Development) {
      for (const materialUrl of materials) {
        await loadScript(urlUtils.append(materialUrl, { v: version }));
      }

      const materialMap = this.materials || {};
      for (const materialExport of materialExports) {
        const lib = _window[materialMapLibrary[materialExport]];
        const builtInComponents = BUILT_IN_COMPONENTS[materialExport];
        if (builtInComponents) {
          if (lib) {
            builtInComponents.forEach((name) => {
              components[name] = lib[name];
            });
          }
        } else {
          const material = materialMap[materialExport]
            ? ((await materialMap[materialExport]()).default as Material)
            : (_window[materialExport] as Material);

          if (material && lib) {
            (material.components || []).forEach((item) => {
              components[item.name] = getRawComponent(item, lib);
            });
          }
        }
      }
    }
  }

  private initRouter() {
    const { router, project, options, adapter } = this;
    if (!router) return;
    const defaultPageRouteName =
      project?.platform === 'uniapp' ? 'pages' : 'page';
    const {
      routeAppendTo,
      pageRouteName = defaultPageRouteName,
      routeMeta
    } = options;
    const pathStart = routeAppendTo ? '' : '/';

    const pageRoute: RouteRecordRaw = {
      path: `${pathStart}${pageRouteName}/:id`,
      name: PAGE_ROUTE_NAME,
      component: PageContainer
    };
    const homeRoute: RouteRecordRaw = {
      path: pathStart,
      name: HOMEPAGE_ROUTE_NAME,
      component: project?.homepage
        ? PageContainer
        : adapter.startupComponent || StartupContainer,
      meta: routeMeta
    };
    if (router.hasRoute(PAGE_ROUTE_NAME)) {
      router.removeRoute(PAGE_ROUTE_NAME);
    }
    if (router.hasRoute(HOMEPAGE_ROUTE_NAME)) {
      router.removeRoute(HOMEPAGE_ROUTE_NAME);
    }
    if (routeAppendTo) {
      router.addRoute(routeAppendTo, pageRoute);
      router.addRoute(routeAppendTo, homeRoute);
    } else {
      router.addRoute(pageRoute);
      router.addRoute(homeRoute);
    }
  }

  /**
   * Vue 插件安装方法
   * 1. 安装所有第三方库插件
   * 2. 执行自定义安装函数(如果提供)
   * 3. 安装访问适配器
   * 4. 提供全局 Provider 实例
   * 5. 设计模式下设置错误处理器
   * 6. 执行增强函数(如果提供)
   * @param app Vue 应用实例
   */
  install(app: App) {
    // 记录已安装的插件
    const installed = app.config.globalProperties.installed || {};

    // 安装所有第三方库插件
    for (const [name, library] of Object.entries(this.library)) {
      if (!installed[name] && isVuePlugin(library)) {
        app.use(library);
        installed[name] = true;
      }
    }

    // 执行自定义安装函数
    if (this.options.install) {
      app.use(this.options.install);
    }

    // 安装访问适配器
    if (this.adapter.access) {
      app.use(this.adapter.access);
    }

    // 提供全局 Provider 实例
    app.provide(providerKey, this);
    app.config.globalProperties.$provider = this;
    app.config.globalProperties.installed = installed;

    // 设计模式下设置错误处理器
    if (this.mode === ContextMode.Design) {
      app.config.errorHandler = (err: any, instance, info) => {
        const name = instance?.$options.name;
        const msg =
          typeof err === 'string'
            ? err
            : err?.message || err?.msg || '未知错误';
        const message = `[ ${name} ] ${msg} ${info}`;
        console.error(
          '[VTJ Error]:',
          {
            err,
            instance,
            info
          },
          err?.stack
        );

        if (this.adapter.notify) {
          this.adapter.notify(message, '组件渲染错误', 'error');
        }
      };
    }

    // 执行增强函数
    if (this.options.enhance) {
      app.use(this.options.enhance, this);
    }
  }

  getFile(id: string): PageFile | BlockFile | null {
    const { blocks = [] } = this.project || {};
    return this.getPage(id) || blocks.find((item) => item.id === id) || null;
  }
  getPage(id: string): PageFile | null {
    const { pages = [] } = this.project || {};
    const finder = (
      id: string,
      pages: PageFile[] = []
    ): PageFile | undefined => {
      for (const page of pages) {
        if (page.id === id) {
          return page;
        } else {
          if (page.children && page.children.length) {
            const match = finder(id, page.children);
            if (match) {
              return match;
            }
          }
        }
      }
    };
    return finder(id, pages) || null;
  }
  getMenus(name: string = 'page', prefix: string = '') {
    return createMenus(prefix, name, this.project?.pages || []);
  }
  getHomepage(): PageFile | null {
    const { homepage } = this.project || {};
    if (!homepage) return null;
    return this.getPage(homepage);
  }
  async getDsl(id: string): Promise<BlockSchema | null> {
    const module =
      this.modules[`.vtj/files/${id}.json`] ||
      this.modules[`/src/.vtj/files/${id}.json`];
    return module
      ? await module()
      : this.service.getFile(id, this.project || undefined).catch(() => null);
  }

  async getDslByUrl(url: string): Promise<BlockSchema | null> {
    const cache = this.urlDslCaches[url];
    if (cache) return cache;
    if (!this.adapter.request) return null;
    return (this.urlDslCaches[url] = this.adapter.request
      .send({
        url,
        method: 'get',
        settings: {
          validSuccess: false,
          originResponse: true
        }
      })
      .then((res) => res.data as BlockSchema)
      .catch(() => null));
  }

  /**
   * 创建 DSL 渲染器
   * 1. 合并默认选项和自定义选项
   * 2. 创建 DSL 加载器
   * 3. 返回渲染器实例
   * @param dsl 区块 DSL 配置
   * @param opts 渲染选项
   * @returns 渲染器实例
   */
  createDslRenderer(
    dsl: BlockSchema,
    opts: Partial<CreateRendererOptions> = {}
  ) {
    // 合并默认渲染选项
    const { library, components, mode, apis } = this;
    const options = {
      mode,
      Vue: library.Vue,
      components,
      libs: library,
      apis,
      window,
      ...opts
    };

    // 创建 DSL 加载器，用于动态加载依赖的 DSL
    const loader = createLoader({
      getDsl: async (id: string) => {
        return (await this.getDsl(id)) || null;
      },
      getDslByUrl: async (url: string) => {
        return (await this.getDslByUrl(url)) || null;
      },
      options
    });

    // 创建并返回渲染器实例
    return createRenderer({
      ...options,
      dsl,
      loader
    });
  }

  /**
   * 获取渲染组件
   * 1. 根据ID查找文件(页面或区块)
   * 2. 如果找到文件且提供了output回调，则调用它
   * 3. 尝试从模块缓存加载原始Vue组件
   * 4. 如果找不到原始组件，则获取DSL并创建渲染器
   * @param id 文件ID
   * @param output 找到文件时的回调函数
   * @returns Promise<Vue组件>
   */
  async getRenderComponent(
    id: string,
    output?: (file: BlockFile | PageFile) => void
  ) {
    // 根据ID查找文件
    const file = this.getFile(id);
    if (!file) {
      logger.warn(`Can not find file: ${id}`);
      return null;
    }

    // 调用输出回调(如果提供)
    if (output) {
      output(file);
    }

    // 尝试从模块缓存加载原始Vue组件
    const rawPath = `.vtj/vue/${id}.vue`;
    const rawModule =
      this.modules[rawPath] || this.modules[`/src/pages/${id}.vue`];
    if (rawModule) {
      return (await rawModule())?.default;
    }

    // 获取DSL配置并创建渲染器
    const dsl = await this.getDsl(file.id);
    if (!dsl) {
      logger.warn(`Can not find dsl: ${id}`);
      return null;
    }

    return this.createDslRenderer(dsl).renderer;
  }

  /**
   * 定义基于URL的异步组件
   * 1. 根据URL获取DSL配置
   * 2. 如果获取成功，设置组件名称
   * 3. 创建并返回DSL渲染器
   * @param url DSL配置URL
   * @param name 可选的自定义组件名称
   * @returns Vue异步组件
   */
  defineUrlSchemaComponent(url: string, name?: string) {
    return defineAsyncComponent(async () => {
      const dsl = await this.getDslByUrl(url);
      if (dsl) {
        dsl.name = name || dsl.name;
        return this.createDslRenderer(dsl).renderer;
      }
      return null;
    });
  }

  /**
   * 定义基于插件的异步组件
   * 1. 根据插件来源获取插件实例
   * 2. 返回插件组件
   * @param from 插件来源配置
   * @returns Vue异步组件
   */
  definePluginComponent(from: NodeFromPlugin) {
    return defineAsyncComponent(async () => {
      return (await getPlugin(from, window)) as any;
    });
  }
}

/**
 * 创建 Provider 实例
 * @param options Provider 配置选项
 * @returns 包含 provider 实例和 onReady 回调的对象
 */
export function createProvider(options: ProviderOptions) {
  const provider = new Provider(options);
  const onReady = (callback: () => void) => provider.ready(callback);
  return {
    provider,
    onReady
  };
}

export interface UseProviderOptions {
  id?: string; // 组件ID
  version?: string; // 组件版本
}

/**
 * 在组件中使用 Provider 实例
 * 1. 从Vue上下文中获取注入的Provider
 * 2. 开发环境下检查组件版本一致性
 * @param options 使用选项
 * @returns Provider 实例
 * @throws 如果找不到Provider会抛出错误
 */
export function useProvider(options: UseProviderOptions = {}): Provider {
  const provider = inject(providerKey, null);
  if (!provider) {
    throw new Error('Can not find provider');
  }
  if (provider.nodeEnv === 'development') {
    const { id, version } = options;
    if (id && version) {
      (async () => {
        const dsl = await provider.getDsl(id);
        if (dsl?.__VERSION__ !== version)
          if (provider.adapter.notify) {
            provider.adapter.notify(
              `[ ${dsl?.name} ] 组件源码版本与运行时版本不一致，请重新发布组件`,
              '版本不一致',
              'warning'
            );
          }
      })();
    }
  }
  return provider;
}
