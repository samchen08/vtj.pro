import { type App } from 'vue';
import {
  type BlockSchema,
  type NodeSchema,
  type BlockModel,
  type NodeModel,
  type Service,
  type PageFile,
  type BlockFile,
  type ProjectModel,
  type PlatformType,
  emitter,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE
} from '@vtj/core';
import { type SimulatorEnv } from './simulator';
import {
  Provider,
  type Context,
  ContextMode,
  clearLoaderCache,
  parseFunction
} from '@vtj/renderer';
import { notify } from '../utils';
import { type Designer } from './designer';
import { Report } from './report';
import { setupUniApp, createUniAppComponent } from '@vtj/uni';

export class Renderer {
  public app: App | null = null;
  private dsl: BlockSchema | null = null;
  private nodeChange: (this: Renderer, node: NodeModel) => void;
  private blockChange: (this: Renderer, block: BlockModel) => void;
  public context: Context | null = null;
  private file?: PageFile | BlockFile | null;
  constructor(
    public env: SimulatorEnv,
    public service: Service,
    public provider: Provider,
    private report: Report,
    public project: ProjectModel | null = null,
    public designer: Designer | null = null
  ) {
    this.nodeChange = this.__onNodeChange.bind(this);
    this.blockChange = this.__onBlockChange.bind(this);
  }

  private install(app: App, platform: PlatformType) {
    // 记录环境，在扩展时可能需要用到
    (app as any).__vtj_env__ = this.env;

    const { library, globals, VueRouter, locales } = this.env;

    if (VueRouter && platform !== 'uniapp') {
      const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: []
      });
      app.use(router);
    }
    app.use(this.provider);

    const plugins = Object.entries(library);
    Object.assign(app.config.globalProperties, globals);
    plugins.forEach(([name, plugin]) => {
      if (!plugin) {
        console.warn(`plugin: ${name} is undefined`);
        return;
      }
      if (
        typeof plugin === 'function' ||
        typeof plugin.install === 'function'
      ) {
        let options: Record<string, any> = {};
        const locale = locales[name];
        if (locale) {
          options.locale = locale;
        }
        app?.use(plugin, options);
      }
    });
  }

  createUniApp(
    platform: PlatformType,
    file: PageFile | BlockFile,
    renderer: any
  ) {
    const { window, Vue } = this.env;
    const { uniConfig = {}, homepage } = this.project || {};
    const { manifestJson, pagesJson, css } = uniConfig;
    const AppComponent = createUniAppComponent(uniConfig, (v) =>
      parseFunction(v, window, false, true)
    );
    const navigationStyle = file.type === 'block' ? 'custom' : undefined;
    const app = setupUniApp({
      Vue,
      UniH5: (window as any).UniH5,
      window,
      App: AppComponent,
      manifestJson,
      pagesJson,
      css,
      routes: [
        {
          id: file.id,
          path: '/',
          component: renderer,
          style: {
            navigationStyle,
            navigationBarTitleText: file.title,
            ...(file as PageFile).style
          },
          needLogin: (file as PageFile).needLogin,
          home: file.id === homepage
        }
      ]
    }) as App;

    this.install(app, platform);
    app.mount(window.document.body);
    return app;
  }

  createApp(platform: PlatformType, file: PageFile | BlockFile, renderer: any) {
    const { window, container, Vue } = this.env;
    const el = window.document.createElement('div');
    el.id = 'app';
    if (file.type === 'page') {
      el.classList.add('is-page');
    }
    const isPure = (file as PageFile).pure;
    if (isPure) {
      el.classList.add('is-pure');
    }
    container.appendChild(el);

    const AppContainer = Vue.defineComponent({
      render() {
        return Vue.h(Vue.Suspense, [Vue.h(renderer)]);
      }
    });

    const app = Vue.createApp(AppContainer) as App;
    this.install(app, platform);
    Object.assign(
      app.config.globalProperties.$route.meta,
      (file as PageFile).meta || {}
    );
    app.mount(el);
    return app;
  }

  render(block: BlockModel, file?: PageFile | BlockFile | null) {
    if (!file) return;
    this.file = file;
    const { window, library, Vue, components, apis } = this.env;
    this.dsl = Vue.reactive(block.toDsl()) as BlockSchema;
    const { renderer, context } = this.provider.createDslRenderer(this.dsl, {
      window,
      mode: ContextMode.Design,
      Vue,
      components,
      apis,
      libs: library
    });
    const { platform = 'web' } = this.project || {};
    try {
      this.app =
        platform === 'uniapp'
          ? this.createUniApp(platform, file, renderer)
          : this.createApp(platform, file, renderer);
    } catch (e: any) {
      notify(e.message || '未知错误', '运行时错误');
      console.error(e);
      this.report.error(e, {
        project: this.project?.toDsl(),
        file: block.toDsl()
      });
    }
    this.context = context;
    emitter.on(EVENT_NODE_CHANGE, this.nodeChange as any);
    emitter.on(EVENT_BLOCK_CHANGE, this.blockChange as any);
  }

  dispose() {
    if (this.app) {
      const { platform = 'web' } = this.project || {};
      this.app.unmount();
      const $route = this.app.config.globalProperties.$route;
      if ($route) {
        $route.meta = {};
      }
      if (platform !== 'uniapp') {
        const container = this.app._container;
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
          this.app._container = null;
        }
      }
      this.app = null;
    }
    this.dsl = null;
    this.context = null;
    this.file = null;
    clearLoaderCache();
    emitter.off(EVENT_NODE_CHANGE, this.nodeChange as any);
    emitter.off(EVENT_BLOCK_CHANGE, this.blockChange as any);
  }

  updateChild(node: NodeSchema, parent: BlockSchema | NodeSchema) {
    const children =
      (parent as NodeSchema).children || (parent as BlockSchema).nodes || [];
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.id === node.id) {
          children.splice(i, 1, node);
          return;
        } else {
          this.updateChild(node, child);
        }
      }
    }
  }

  private __onNodeChange(node: NodeModel) {
    if (this.dsl) {
      this.updateChild(node.toDsl(), this.dsl);
    }
  }
  private __onBlockChange(block: BlockModel) {
    if (!this.app?._container || !this.isDesignerActive()) {
      return;
    }
    const file = this.file;
    this.dispose();
    this.render(block, file);
    // 恢复选中状态
    if (this.designer?.selected.value) {
      this.designer.setSelected(block);
    }
  }

  private isDesignerActive() {
    if (this.designer?.engine) {
      const region = this.designer.engine.skeleton?.getRegion('Workspace');
      if (region) {
        return region.regionRef.isDesignerActive();
      }
    }
    return false;
  }
}
