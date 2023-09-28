import { SimulatorEnv } from './Simulator';
import { createBlockRenderer, createLoader } from '../renderer';
import { Block, Node, History } from '../models';
import { Service } from './services';
import { BlockSchema, NodeSchema, emitter, EVENT_NODE_CHANGE } from '../core';
import { App, Plugin, Ref } from 'vue';
import { isBlock } from '../utils';
import { ElNotification } from 'element-plus';

export class Renderer {
  private app: App | null = null;
  private dsl: BlockSchema | null = null;
  private onNodeChangeProxy: (this: Renderer, node: any) => void;
  constructor(
    public env: SimulatorEnv,
    public service: Service,
    public history: Ref<History | null>
  ) {
    this.onNodeChangeProxy = this.onNodeChange.bind(this);
  }

  install(libs: Record<string, any> = {}, globals: Record<string, any> = {}) {
    const plugins = Object.values(libs);
    if (this.app) {
      Object.assign(this.app.config.globalProperties, globals);
      this.app.config.errorHandler = (err, instance, info) => {
        const name = instance?.$options.name;
        const message = `[ ${name}] ${
          (err as any)?.message || err || '未知错误'
        }`;
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
      plugins.forEach((plugin) => {
        if (typeof plugin === 'function' || plugin.install) {
          this.app?.use(plugin);
        }
      });
    }
  }

  render(block: Block) {
    if (this.app) {
      this.dispose();
    }

    const { Vue, container, components, libs, apis, window, globals } =
      this.env;
    const loader = createLoader({
      getFile: this.service.getFile.bind(this.service),
      options: {
        Vue,
        block,
        components,
        libs,
        apis,
        window
      }
    });
    this.dsl = Vue.reactive(block.toDsl()) as BlockSchema;
    const Component = createBlockRenderer({
      Vue,
      dsl: this.dsl,
      block,
      components,
      libs,
      apis,
      window,
      loader
    });
    this.app = Vue.createApp(Component) as App;
    this.install(libs, globals);
    this.app.mount(container);
    emitter.on(EVENT_NODE_CHANGE, this.onNodeChangeProxy);
  }

  onNodeChange(node: Node | Block) {
    if (isBlock(node)) {
      this.render(node);
    } else {
      if (this.dsl) {
        const dsl = node.toDsl();
        this.updateChild(dsl, this.dsl);
      }
    }

    if (this.dsl && this.history.value) {
      this.history.value.push(this.dsl);
    }
  }

  updateChild(node: NodeSchema, parent: BlockSchema | NodeSchema) {
    const children = parent.children || [];
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

  dispose() {
    if (this.app) {
      this.app.unmount();
      this.app = null;
    }
    this.dsl = null;
    emitter.off(EVENT_NODE_CHANGE, this.onNodeChangeProxy);
  }
}
