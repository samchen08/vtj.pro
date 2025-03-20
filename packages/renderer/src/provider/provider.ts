import { type App, type InjectionKey, inject, defineAsyncComponent } from 'vue';
import type {
  Router,
  RouteRecordName,
  RouteRecordRaw,
  RouteMeta
} from 'vue-router';
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
import {
  jsonp,
  loadScript,
  logger,
  request,
  url as urlUtils
} from '@vtj/utils';
import { createSchemaApis, mockApis, mockCleanup } from './apis';
import { isVuePlugin, getMock } from '../utils';
import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent
} from '../utils';
import {
  ContextMode,
  PAGE_ROUTE_NAME,
  HOMEPAGE_ROUTE_NAME
} from '../constants';
import {
  createRenderer,
  createLoader,
  getPlugin,
  type CreateRendererOptions
} from '../render';
import { PageContainer } from './page';
import { StartupContainer } from './startup';
import { type ProvideAdapter } from './defaults';
import { version } from '../version';

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
}

export enum NodeEnv {
  Production = 'production',
  Development = 'development'
}

export class Provider extends Base {
  public mode: ContextMode;
  public globals: Record<string, any> = {};
  public modules: Record<string, () => Promise<any>> = {};
  public adapter: ProvideAdapter = { request, jsonp };
  public apis: Record<string, (...args: any[]) => Promise<any>> = {};
  public dependencies: Record<string, () => Promise<any>> = {};
  public materials: Record<string, () => Promise<any>> = {};
  public library: Record<string, any> = {};
  public service: Service;
  public project: ProjectSchema | null = null;
  public components: Record<string, any> = {};
  public nodeEnv: NodeEnv = NodeEnv.Development;
  private router: Router | null = null;
  private materialPath: string = './';
  private urlDslCaches: Record<string, any> = {};
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

  async load(project: ProjectSchema) {
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
     */
    if (this.mode === ContextMode.Raw) {
      await this.loadDependencies(_window);
    } else {
      await this.loadAssets(_window);
    }
    this.initMock(_window);
    this.apis = createSchemaApis(apis, meta, this.adapter);
    mockCleanup(_window);
    mockApis(apis, _window);
    if (project.platform !== 'uniapp') {
      this.initRouter();
    }
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

  install(app: App) {
    const installed = app.config.globalProperties.installed || {};
    for (const [name, library] of Object.entries(this.library)) {
      if (!installed[name] && isVuePlugin(library)) {
        app.use(library);
        installed[name] = true;
      }
    }
    if (this.options.install) {
      app.use(this.options.install);
    }
    if (this.adapter.access) {
      app.use(this.adapter.access);
    }
    app.provide(providerKey, this);
    app.config.globalProperties.$provider = this;
    app.config.globalProperties.installed = installed;
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

  createDslRenderer(
    dsl: BlockSchema,
    opts: Partial<CreateRendererOptions> = {}
  ) {
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

    const loader = createLoader({
      getDsl: async (id: string) => {
        return (await this.getDsl(id)) || null;
      },
      getDslByUrl: async (url: string) => {
        return (await this.getDslByUrl(url)) || null;
      },
      options
    });

    return createRenderer({
      ...options,
      dsl,
      loader
    });
  }

  async getRenderComponent(
    id: string,
    output?: (file: BlockFile | PageFile) => void
  ) {
    const file = this.getFile(id);
    if (!file) {
      logger.warn(`Can not find file: ${id}`);
      return null;
    }
    if (output) {
      output(file);
    }
    const rawPath = `.vtj/vue/${id}.vue`;
    const rawModule =
      this.modules[rawPath] || this.modules[`/src/pages/${id}.vue`];
    if (rawModule) {
      return (await rawModule())?.default;
    }

    const dsl = await this.getDsl(file.id);
    if (!dsl) {
      logger.warn(`Can not find dsl: ${id}`);
      return null;
    }
    return this.createDslRenderer(dsl).renderer;
  }

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

  definePluginComponent(from: NodeFromPlugin) {
    return defineAsyncComponent(async () => {
      return (await getPlugin(from, window)) as any;
    });
  }
}

export function createProvider(options: ProviderOptions) {
  const provider = new Provider(options);
  const onReady = (callback: () => void) => provider.ready(callback);
  return {
    provider,
    onReady
  };
}

export interface UseProviderOptions {
  id?: string;
  version?: string;
}

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
