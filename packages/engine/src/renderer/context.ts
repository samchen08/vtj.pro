import type { BlockRendererInstance } from './block';
import type { BlockSchema, JSExpression, JSFunction, NodeFrom } from '../core';
import * as globalVue from 'vue';
import { parseExpression, parseFunction } from '../utils';
import { CONTEXT_HOST } from '../constants';
import { defaultLoader, type ComponentLoader } from './loader';

export enum ContextMode {
  // 运行时
  RUNTIME = 'runtime',
  // 设计模式
  DESIGN = 'design',
  // 源码模式
  RAW = 'raw',
  // 虚拟节点
  VNODE = 'vnode'
}

export interface IContextOptionsAttrs {
  $components?: Record<string, any>;
  $libs?: Record<string, any>;
  $apis?: Record<string, any>;
  [key: string]: any;
}

export interface IContextOptions {
  mode?: ContextMode;
  dsl?: BlockSchema;
  loader?: ComponentLoader;
  attrs?: IContextOptionsAttrs;
}

export class Context {
  __id: string | null = null;
  __name: string = '';
  __mode: ContextMode;
  __dsl: BlockSchema | null = null;
  __instance: BlockRendererInstance | null = null;
  __context_refs: Record<string, Context> = {};
  __loader: ComponentLoader = defaultLoader;
  __proto__: Context | null = null;

  props: Record<string, any> = {};
  state: Record<string, any> = {};
  context: Record<string, any> = {};
  refs: Record<string, any> = {};
  $refs: Record<string, any> = {};
  $el: any = null;
  $emit: any = null;
  $nextTick: any = null;
  $parent: any = null;
  $root: any = null;
  $attrs: any = null;
  $slots: any = null;
  $watch: any = null;
  $options: any = null;
  $forceUpdate: any = null;
  $components: Record<string, any> = {};
  $libs: Record<string, any> = {};
  $apis: Record<string, any> = {};
  private __transform: Record<string, string> = {};
  constructor(options: IContextOptions) {
    const { mode = ContextMode.RUNTIME, dsl, loader, attrs } = options;
    // this.__proto__ = global;
    this.__mode = mode;
    if (dsl) {
      this.__id = dsl.id || null;
      this.__name = dsl.name;
      this.__dsl = dsl;
      // 运行时模式才需要源码转换
      if (mode === ContextMode.RUNTIME) {
        this.__transform = dsl.transform || {};
      }
    }
    if (loader) {
      this.__loader = loader;
    }
    if (attrs) {
      Object.assign(this, attrs);
    }
  }

  setup(attrs: IContextOptionsAttrs = {}, Vue: any = globalVue) {
    const instance = Vue.getCurrentInstance();
    if (!instance) return;
    this.__instance = instance.proxy as BlockRendererInstance;
    const globalProperties = instance.appContext.config.globalProperties;
    Object.assign(this, globalProperties);
    Object.assign(this, attrs || {});
    this.__proxy();
    Vue.onMounted(() => {
      // 部分属性在 onMounted 后才生成，需要重新更新一次
      this.__proxy();
    });
    Vue.onUnmounted(() => {
      this.__cleanup();
    });
  }

  __clone(context: Record<string, any> = {}) {
    const _context = { ...this.context, ...context };
    const copy: Record<string, any> = {
      ..._context
      // context: _context
    };
    // copy.context.__proto__ = this.context;
    copy.__proto__ = this;
    return copy as Context;
  }
  __parseFunction(code?: JSFunction) {
    if (!code) return;
    if (this.__mode === ContextMode.RUNTIME) {
      const { id, type } = code;
      const value = id ? this.__transform[id] ?? code.value : code.value;
      return parseFunction({ type, value }, this);
    } else {
      return parseFunction(code, this);
    }
  }
  __parseExpression(code?: JSExpression | JSFunction) {
    if (!code) return;
    if (this.__mode === ContextMode.RUNTIME) {
      const { id, type } = code;
      const value = id ? this.__transform[id] ?? code.value : code.value;
      return parseExpression({ type, value }, this);
    } else {
      return parseExpression(code, this);
    }
  }
  __proxy() {
    if (!this.__instance) return;
    CONTEXT_HOST.forEach((name) => {
      (this as any)[name] = (this.__instance as any)?.[name];
    });
  }
  __cleanup() {
    CONTEXT_HOST.forEach((name) => {
      (this as any)[name] = null;
    });
  }
  __ref(id: string | null = null, ref?: string | Function) {
    // vnode 不能设置ref
    if (this.__mode === ContextMode.VNODE) {
      return undefined;
    }

    return (el: any) => {
      let dom = el?.$el || el;
      // 销毁时，无dom
      if (!dom) {
        if (typeof ref === 'string') {
          delete this.$refs[ref];
          if (id) {
            delete this.refs[id];
          }
        }
        return;
      }
      // 如果是text节点，取兄弟节点
      if (dom.nodeType === 3 && dom.nextSibling) {
        dom = dom.nextSibling;
      }

      dom.__vtj__ = id;
      // 设计模式记录上下文
      if (ContextMode.DESIGN === this.__mode) {
        dom.__context__ = this;
        if (id && id !== this.__id) {
          this.__context_refs[id] = this;
        }
      }
      if (id) {
        this.refs[id] = el;
      }

      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        const exist = this.$refs[ref];
        if (exist) {
          // 去重
          const sets = new Set([].concat(exist, el));
          this.$refs[ref] = Array.from(sets);
        } else {
          // todo: 嵌套block无法记录refs
          this.$refs[ref] = el;
        }
      }

      return el;
    };
  }
}
