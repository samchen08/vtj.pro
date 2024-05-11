import { type App } from 'vue';
import {
  type BlockSchema,
  type NodeSchema,
  type BlockModel,
  type NodeModel,
  type Service,
  emitter,
  EVENT_BLOCK_CHANGE,
  EVENT_NODE_CHANGE
} from '@vtj/core';
import { type SimulatorEnv } from './simulator';
import { Provider, type Context, ContextMode } from '@vtj/renderer';
import { ElNotification } from 'element-plus';
import { notify } from '../utils';
import { type Designer } from './designer';

export class Renderer {
  private app: App | null = null;
  private dsl: BlockSchema | null = null;
  private nodeChange: (this: Renderer, node: NodeModel) => void;
  private blockChange: (this: Renderer, block: BlockModel) => void;
  public context: Context | null = null;
  constructor(
    public env: SimulatorEnv,
    public service: Service,
    public provider: Provider,
    public designer: Designer | null = null
  ) {
    this.nodeChange = this.__onNodeChange.bind(this);
    this.blockChange = this.__onBlockChange.bind(this);
  }

  private install(app: App) {
    const { library, globals, VueRouter, locales } = this.env;
    if (VueRouter) {
      const router = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: []
      });
      app.use(router);
    }
    const plugins = Object.entries(library);
    Object.assign(app.config.globalProperties, globals);
    if (this.provider.options.install) {
      this.provider.options.install(app);
    }
    app.config.errorHandler = (err: any, instance, info) => {
      const name = instance?.$options.name;
      const msg = err?.message || err?.msg || '未知错误';
      const message = `[ ${name} ] ${msg}`;
      console.error({
        err,
        instance,
        info
      });
      ElNotification.error({
        title: '运行错误',
        message
      });
    };
    plugins.forEach(([name, plugin]) => {
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

  render(block: BlockModel) {
    const { window, container, library, Vue, components, apis } = this.env;
    const el = window.document.createElement('div');
    el.id = 'app';
    container.appendChild(el);

    this.dsl = Vue.reactive(block.toDsl()) as BlockSchema;
    const { renderer, context } = this.provider.createDslRenderer(this.dsl, {
      window,
      mode: ContextMode.Design,
      Vue,
      components,
      apis,
      libs: library
    });

    this.app = Vue.createApp(renderer) as App;
    this.install(this.app);
    try {
      this.app.mount(el);
    } catch (e: any) {
      notify(e.message || '未知错误', '运行时错误');
      console.error(e);
    }
    this.context = context;
    emitter.on(EVENT_NODE_CHANGE, this.nodeChange as any);
    emitter.on(EVENT_BLOCK_CHANGE, this.blockChange as any);
  }

  dispose() {
    if (this.app) {
      this.app.unmount();
      const container = this.app._container;
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
        this.app._container = null;
      }
      this.app = null;
    }
    this.dsl = null;
    this.context = null;
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
    this.dispose();
    this.render(block);
    // 恢复选中状态
    if (this.designer?.selected.value) {
      this.designer.setSelected(block);
    }
  }
}
