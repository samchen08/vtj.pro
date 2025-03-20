import type { DefineComponent } from 'vue';
import type {
  NodeFrom,
  BlockSchema,
  NodeFromPlugin,
  BlockPlugin
} from '@vtj/core';
import { createRenderer, type CreateRendererOptions } from './block';
import { ContextMode } from '../constants';
import { loadCssUrl, loadScriptUrl, isJSUrl, isCSSUrl } from '../utils';
import { cloneDeep } from '@vtj/utils';

import * as globalVue from 'vue';

// 已注册的插件名称
let __plugins__: string[] = [];

// loader 结果缓存
let __loaders__: Record<string | symbol, any> = {};

export type BlockLoader = (
  name: string,
  from?: NodeFrom,
  Vue?: any
) => string | DefineComponent;

export const defaultLoader: BlockLoader = (name: string) => {
  // 默认不处理 from
  return name;
};

export async function getPlugin(
  from: NodeFromPlugin,
  global: any = window
): Promise<BlockPlugin | null> {
  const { urls = [], library } = from;
  const scripts = urls.filter((n) => isJSUrl(n));
  if (scripts.length === 0 || !library) return null;
  const css = urls.filter((n) => isCSSUrl(n));
  if (css.length) {
    loadCssUrl(css, global);
  }
  const component: any = await loadScriptUrl(scripts, library, global).catch(
    (e: any) => {
      console.warn('loadScriptUrl error', scripts, library, e);
      return null;
    }
  );
  return component;
}

export interface CreateLoaderOptions {
  getDsl: (id: string) => Promise<BlockSchema | null>;
  getDslByUrl: (url: string) => Promise<BlockSchema | null>;
  options: Partial<CreateRendererOptions>;
}

export function createLoader(opts: CreateLoaderOptions): BlockLoader {
  const { getDsl, getDslByUrl, options } = opts;

  // 重置插件
  if (options.window) {
    __plugins__.forEach((plugin) => {
      delete (options.window as any)[plugin];
    });
    __plugins__ = [];
  }

  return (name: string, from?: NodeFrom, Vue: any = globalVue) => {
    if (!from || typeof from === 'string') return name;
    if (from.type === 'Schema' && from.id) {
      let cache = __loaders__[from.id];
      if (cache) {
        return cloneDeep(cache);
      }
      cache = __loaders__[from.id] = Vue.defineAsyncComponent(async () => {
        const dsl = await getDsl(from.id);
        if (dsl) {
          dsl.name = name;
        }
        return dsl
          ? createRenderer({
              ...options,
              Vue,
              dsl,
              mode: ContextMode.Runtime,
              loader: createLoader(opts)
            }).renderer
          : null;
      });
      return cache;
    }

    if (from.type === 'UrlSchema' && from.url) {
      let cache = __loaders__[from.url];
      if (cache) {
        return cache;
      }
      cache = __loaders__[from.url] = Vue.defineAsyncComponent(async () => {
        const dsl = await getDslByUrl(from.url);
        if (dsl) {
          dsl.name = name;
        }
        return dsl
          ? createRenderer({
              ...options,
              Vue,
              dsl,
              mode: ContextMode.Runtime,
              loader: createLoader(opts)
            }).renderer
          : null;
      });
      return cache;
    }

    if (from.type === 'Plugin') {
      let cache = from.library ? __loaders__[from.library] : null;
      if (cache) {
        return cache;
      }

      // 记录插件名称
      if (from.library) {
        __plugins__.push(from.library);
      }
      cache = __loaders__[from.library || Symbol()] = Vue.defineAsyncComponent(
        async () => {
          const plugin = await getPlugin(from, options.window);
          if (plugin) {
            return plugin;
          } else {
            console.warn('getPlugin result is null', from);
          }
          return null;
        }
      );

      return cache;
    }

    return name;
  };
}

export function clearLoaderCache() {
  __loaders__ = {};
}
