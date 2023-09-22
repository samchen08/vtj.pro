import { App, InjectionKey, Plugin, DefineComponent } from 'vue';
import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  provideGlobalConfig
} from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { Router } from 'vue-router';
import { merge } from '@vtj/utils';
import { XStartup } from '@vtj/ui';
import { ServiceType, Service } from './Service';
// @ts-ignore
import __VTJ_PROVIDER_OPTIONS__ from '/.vtj';

import { Empty, IDELink, PageContainer, PreviewContainer } from './components';
import {
  createIdeLink,
  VUE,
  parseDependencies,
  loadCss,
  loadScripts,
  getLibs,
  parseApis,
  install,
  ProjectSchema,
  PageSchema,
  SummarySchema,
  getPages,
  addRoute,
  addRouteWithMask
} from './shared';

export interface ProjectProvider {
  // 项目id
  id: string;
  // 项目名称
  name: string;
  // 路由模式
  mode: 'hash' | 'history';
  // 路由前缀路径
  base: string;
  // 页面路由前缀路径
  page: string;
  // 区块预览路由前缀路径
  preview: string;
  // 首页路由
  home: string;

  // 项目启动页
  startup: string;
}

export interface IDEProvider extends Record<string, any> {
  // IDE 路径
  path?: string;
  // 链接按钮文本
  text?: string;
}

export interface ProviderBuiltinComponents {
  // 框架母版组件
  Mask?: any;

  // 404页面组件
  Empty?: any;

  // 启动页组件
  Startup?: any;

  // Ide入口组件
  IDELink?: any;
}

export interface ProviderOptions {
  //服务类型
  service: ServiceType;

  // 项目配置
  project: Partial<ProjectProvider>;

  // Vue应用
  app: App;

  // 路由实例
  router: Router;

  // 文件模块 service = file 是，需要传
  modules?: Record<string, () => Promise<any>>;

  // IDE 配置
  ide?: null | IDEProvider;

  // 显示启动页
  startup?: boolean;

  // 内置组件
  components?: ProviderBuiltinComponents;

  // 生成源码模式
  raw?: boolean;
  isProd?: boolean;
  // 开启debug
  debug?: boolean;
}

const defaults: Partial<ProviderOptions> = {
  service: 'storage',
  project: {
    id: 'demo',
    name: '示例项目',
    base: '/',
    mode: 'hash',
    page: '/page',
    preview: '/preview',
    home: '/',
    startup: '/startup'
  },
  components: {
    Empty,
    IDELink,
    Startup: XStartup
  },
  ide: undefined,
  raw: true,
  startup: true,
  debug: false
};

export const providerInjectKey: InjectionKey<Provider> = Symbol('$provider');

export class Provider {
  public options: ProviderOptions;
  public project: ProjectProvider;
  public service: Service;
  public dsl: ProjectSchema | null = null;
  public pages: PageSchema[] = [];
  public blocks: SummarySchema[] = [];
  public apis: Record<string, any> = {};
  public libs: Record<string, any> = {};
  public components: Record<string, any> = {};
  constructor(options: Partial<ProviderOptions> = {}) {
    const app = options.app as App;
    delete options.app;
    this.options = merge(defaults, __VTJ_PROVIDER_OPTIONS__, options);
    this.options.app = app;
    const { service, project, modules } = this.options;
    this.project = project as ProjectProvider;
    this.service = new Service(
      service,
      this.project.id,
      this.project.name,
      modules
    );
  }
  async init() {
    const { ide, app, components = {} } = this.options;
    this.dsl = await this.service.getProject();
    this.pages = getPages(this.dsl?.pages || []);
    this.blocks = this.dsl?.blocks || [];
    this.apis = parseApis(this.dsl?.apis || []);
    await this.setup();
    this.createRoutes();
    const { IDELink } = components;
    if (ide && IDELink) {
      createIdeLink(IDELink, ide);
    }
    app.use(this.install.bind(this));
  }

  private async setup() {
    const { options, dsl } = this;
    const { raw, isProd } = options;
    // 源码模式在生产环境不需要加依赖
    if (raw && isProd) return;

    const { dependencies = [], __VTJ_DATE__ } = dsl || {};
    const deps = dependencies.filter((n) => !!n.enabled && n.library !== VUE);
    const { scripts, css, assets, libraries } = parseDependencies(deps);
    loadCss(css, __VTJ_DATE__);
    await loadScripts(scripts, __VTJ_DATE__);
    await loadScripts(assets, __VTJ_DATE__);
    const { libs, components } = getLibs(libraries);
    install(options.app, libs);
    this.libs = libs;
    this.components = components;
  }

  private createRoutes() {
    const { options, project } = this;
    const { router, components = {}, raw = true, startup, ide } = options;

    const { Mask, Startup } = components;
    const homepage = this.getHomepage();
    if (startup && !homepage) {
      router.addRoute({
        path: project.startup,
        name: 'Startup',
        props: {
          link: ide?.path
        },
        component: Startup
      });
    }

    if (!Mask) {
      addRoute(router, 'VtjPage', project.page, PageContainer);
      addRoute(router, 'VtjPpreview', project.preview, PreviewContainer);
      return;
    }
    addRouteWithMask(
      router,
      'VtjPage',
      project.page,
      project.home,
      PageContainer
    );

    if (raw) {
      addRouteWithMask(
        router,
        'VtjPreview',
        project.preview,
        project.home,
        PreviewContainer
      );
    }
  }

  private install(app: App) {
    app.config.globalProperties.$provider = this;
    app.provide(providerInjectKey, this);
  }

  public go(id: string, query: Record<string, any> = {}) {
    const { router } = this.options;
    router.push({ name: 'VtjPage', params: { id }, query });
  }

  public getFile(id: string) {
    const { pages, blocks } = this;
    return pages.find((n) => id === n.id) || blocks.find((n) => id === n.id);
  }

  public getHomepage() {
    return this.pages.find((n) => !!n.home);
  }
}

function setStartup(provider: Provider) {
  const url = location.hash;
  if (url.includes('startup')) return;
  const { pages, blocks, project, options } = provider;
  const { Startup } = options.components || {};
  const { startup, router } = options;
  if (startup && Startup && pages.length === 0 && blocks.length === 0) {
    setTimeout(() => {
      router.push(project.startup);
    }, 100);
  }
}

export async function createProvider(options: Partial<ProviderOptions> = {}) {
  const { app } = options;
  if (app) {
    provideGlobalConfig({ locale: zhCn }, app);
    app.use(ElMessage);
    app.use(ElMessageBox);
    app.use(ElNotification);
  }
  const loading = ElLoading.service({
    body: true,
    fullscreen: true
  });
  const instance = new Provider(options);
  await instance.init();
  loading.close();
  setStartup(instance);

  return instance;
}
