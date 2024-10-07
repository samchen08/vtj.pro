import { delay } from '@vtj/utils';
import * as globalVue from 'vue';
import { ContextMode, CONTEXT_HOST } from '../constants';
import {
  type BlockSchema,
  type JSFunction,
  type JSExpression
} from '@vtj/core';
import { parseFunction, parseExpression } from '../utils';

export interface ContextOptions {
  mode: ContextMode;
  dsl?: BlockSchema;
  attrs?: ContextAttrs;
}

export interface ContextAttrs {
  $components?: Record<string, any>;
  $libs?: Record<string, any>;
  $apis?: Record<string, any>;
  [key: string]: any;
}

export class Context {
  __id: string | null = null;
  __mode: ContextMode;
  __instance: any | null = null;
  __contextRefs: Record<string, Context> = {};
  __refs: Record<string, any> = {};
  context: Record<string, any> = {};
  state: Record<string, any> = {};
  props: Record<string, any> = {};
  $props: Record<string, any> = {};
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
  constructor(options: ContextOptions) {
    const { mode, dsl, attrs } = options;
    this.__mode = mode;
    if (dsl) {
      this.__id = dsl.id || null;
      this.__transform = dsl.transform || {};
    }
    if (attrs) {
      Object.assign(this, attrs);
    }
  }
  setup(attrs: Record<string, any>, Vue: any = globalVue) {
    const instance = Vue.getCurrentInstance();
    if (!instance) return;
    this.__refs = {};
    this.$refs = {};
    this.context = {};
    this.__contextRefs = {};
    this.__instance = instance.proxy;
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
    Vue.onBeforeUpdate(() => {
      this.__refs = {};
      this.$refs = {};
      this.__contextRefs = {};
      this.context = {};
    });
  }
  private __proxy() {
    if (!this.__instance) return;
    CONTEXT_HOST.forEach((name) => {
      (this as any)[name] = (this.__instance as any)?.[name];
    });
  }
  private __cleanup() {
    CONTEXT_HOST.forEach((name) => {
      (this as any)[name] = null;
    });
  }
  __parseFunction(code?: JSFunction) {
    if (!code) return;
    if (this.__mode === ContextMode.Runtime) {
      const { id, type } = code;
      const value = id ? (this.__transform[id] ?? code.value) : code.value;
      return parseFunction({ type, value }, this);
    } else {
      return parseFunction(code, this);
    }
  }
  __parseExpression(code?: JSExpression | JSFunction) {
    if (!code) return;
    if (this.__mode === ContextMode.Runtime) {
      const { id, type } = code;
      const value = id ? (this.__transform[id] ?? code.value) : code.value;
      return parseExpression({ type, value }, this);
    } else {
      return parseExpression(code, this);
    }
  }
  __ref(id: string | null = null, ref?: string | Function) {
    // vnode 不能设置ref
    if (this.__mode === ContextMode.VNode) {
      return undefined;
    }

    // 记录节点上下文引用
    if (id && id !== this.__id) {
      this.__contextRefs[id] = this;
    }

    return async (el: any) => {
      // 异步组件需要等待渲染
      await delay(0);
      let dom = el?.$vtjEl || el?.$el || el?._?.vnode?.el || el;

      // 销毁时，无dom
      if (!dom) {
        if (typeof ref === 'string') {
          delete this.$refs[ref];
          if (id) {
            delete this.__refs[id];
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
      if (ContextMode.Design === this.__mode) {
        dom.__context__ = this;
        dom.draggable = true;
      }

      if (id) {
        this.__refs[id] = el;
      }

      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        const exist = this.$refs[ref];
        if (exist && el !== exist) {
          // 去重
          const sets = new Set([].concat(exist, el));
          this.$refs[ref] = Array.from(sets);
        } else {
          this.$refs[ref] = el;
        }
      }

      return el;
    };
  }

  __clone(context: Record<string, any> = {}) {
    const _context = { ...this.context, ...context };
    const copy: Record<string, any> = {
      ..._context,
      context: _context
    };
    copy.context.__proto__ = this.context;
    copy.__proto__ = this;
    return copy as Context;
  }
}
