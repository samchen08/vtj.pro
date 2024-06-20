import { type App, type InjectionKey, inject, defineAsyncComponent } from 'vue';
import { type Router } from 'vue-router';
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
  type IStaticRequest,
  type Jsonp,
  jsonp,
  loadScript,
  logger,
  url as urlUtils
} from '@vtj/utils';
import { ElNotification } from 'element-plus';
import { request } from './defaults';
import { createSchemaApis, mockApis, mockCleanup } from './apis';
import { isVuePlugin } from '../utils';
import { version } from '../version';
import {
  parseDeps,
  isCSSUrl,
  isJSUrl,
  loadCss,
  getRawComponent,
  loadCssUrl
} from '../utils';
import { ContextMode } from '../constants';
import {
  createRenderer,
  createLoader,
  getPlugin,
  type CreateRendererOptions
} from '../render';
import { PageContainer } from './page';
import { StartupContainer } from './startup';

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
  nodeEnv?: 'development' | 'production';
  install?: (app: App) => void;
}

export interface ProvideAdapter {
  request: IStaticRequest;
  jsonp: Jsonp;
  metaQuery?: (...args: any[]) => Promise<any>;
  [index: string]: any;
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
  public nodeEnv: 'development' | 'production' = 'development';
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
      nodeEnv = 'development'
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
    // 设计模式在引擎已初始化了项目数据，这里不需要再次初始化
    if (mode !== ContextMode.Design) {
      this.load(project as ProjectSchema);
    }
  }

  async load(project: ProjectSchema) {
    const module = this.modules[`.vtj/projects/${project.id}.json`];
    this.project = module ? await module() : await this.service.init(project);
    if (!this.project) {
      throw new Error('project is null');
    }
    const { apis = [], meta = [] } = this.project as ProjectSchema;
    const _window = window as any;
    // 解决CkEditor错误提示问题
    _window.CKEDITOR_VERSION = undefined;

    if (this.nodeEnv !== 'production') {
      await this.loadAssets(_window);
    }

    this.apis = createSchemaApis(apis, meta, this.adapter);
    mockCleanup();
    if (this.project.config?.mock) {
      mockApis(apis);
    }

    this.initRouter();
    this.triggerReady();
  }

  private async loadAssets(_window: any) {
    const { dependencies: deps = [] } = this.project as ProjectSchema;
    const { dependencies, library, components, materialPath } = this;
    const {
      libraryExports,
      libraryMap,
      materials,
      materialExports,
      materialMapLibrary
    } = parseDeps(deps, materialPath);
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

    // 生产环境不需要物料
    for (const materialUrl of materials) {
      await loadScript(urlUtils.append(materialUrl, { v: version }));
    }

    const materialMap = this.materials || {};
    // console.log(materialExports, materialMap);

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

  private initRouter() {
    const { router, project } = this;
    if (!router) return;
    router.addRoute({
      path: '/page/:id',
      name: 'VtjPage',
      component: PageContainer
    });

    router.addRoute({
      path: '/',
      name: 'VtjHomepage',
      component: project?.homepage ? PageContainer : StartupContainer
    });
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
    app.provide(providerKey, this);
    app.config.globalProperties.installed = installed;
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
    const module = this.modules[`.vtj/files/${id}.json`];
    return module ? await module() : this.service.getFile(id).catch(() => null);
  }

  async getDslByUrl(url: string): Promise<BlockSchema | null> {
    const cache = this.urlDslCaches[url];
    if (cache) return cache;
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

  async getRenderComponent(id: string) {
    const file = this.getFile(id);
    if (!file) {
      logger.warn(`Can not find file: ${id}`);
      return null;
    }
    const rawPath = `.vtj/vue/${id}.vue`;
    const rawModule = this.modules[rawPath];
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
      const plugin = await getPlugin(from, window);
      if (plugin) {
        loadCssUrl(plugin.css);
        return plugin.component as any;
      }
      return null;
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
  const provider = inject(providerKey);
  if (!provider) {
    throw new Error('Can not find provider');
  }
  if (provider.nodeEnv === 'development') {
    const { id, version } = options;
    if (id && version) {
      (async () => {
        const dsl = await provider.getDsl(id);
        if (dsl?.__VERSION__ !== version)
          ElNotification.warning({
            title: dsl?.name,
            message: '当前组件源码版本与运行时版本不一致，请重新发布组件'
          });
      })();
    }
  }
  return provider;
}
