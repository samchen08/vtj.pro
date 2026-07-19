import type { DefineComponent } from 'vue';
import type {
  NodeFrom,
  BlockSchema,
  NodeFromPlugin,
  BlockPlugin
} from '@vtj/core';
import { cloneDeep, Queue } from '@vtj/utils';
import { createRenderer, type CreateRendererOptions } from './block';
import { ContextMode } from '../constants';
import { loadCssUrl, loadScriptUrl, isJSUrl, isCSSUrl } from '../utils';
import { nodeCache } from './cache';

import * as globalVue from 'vue';

export type BlockLoader = ((
  id: string,
  name: string,
  from?: NodeFrom,
  Vue?: any
) => string | DefineComponent) & { clear: () => void };

export const defaultLoader: BlockLoader = Object.assign(
  (_id: string, name: string) => name,
  { clear: () => undefined }
);

export async function getPlugin(
  from: NodeFromPlugin,
  global: any = globalThis
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
  const queue = new Queue();
  const loaders: Record<string | symbol, any> = {};
  const caches: Record<string | symbol, any> = {};

  const loader = (
    id: string,
    name: string,
    from?: NodeFrom,
    Vue: any = globalVue
  ) => {
    if (!from || typeof from === 'string') return name;

    let cacheKey: string | symbol = '';

    if (from.type === 'Schema' && from.id) {
      cacheKey = from.id + '_' + id;

      return (
        caches[cacheKey] ||
        (caches[cacheKey] = Vue.defineAsyncComponent(async () => {
          const dsl =
            loaders[from.id] ||
            (await queue.add<BlockSchema | null>(from.id, () =>
              getDsl(from.id)
            ));
          if (dsl) {
            dsl.name = name;
            loaders[from.id] = dsl;
          }
          return dsl
            ? createRenderer({
                Vue,
                mode: ContextMode.Runtime,
                ...options,
                dsl: cloneDeep(dsl),
                loader: loader as BlockLoader
              }).renderer
            : null;
        }))
      );
    }

    if (from.type === 'UrlSchema' && from.url) {
      cacheKey = from.url + '_' + id;
      return (
        caches[cacheKey] ||
        (caches[cacheKey] = Vue.defineAsyncComponent(async () => {
          const dsl = loaders[from.url] || (await getDslByUrl(from.url));
          if (dsl) {
            dsl.name = name;
            loaders[from.url] = dsl;
          }
          return dsl
            ? createRenderer({
                ...options,
                Vue,
                dsl: cloneDeep(dsl),
                mode: ContextMode.Runtime,
                loader: loader as BlockLoader
              }).renderer
            : null;
        }))
      );
    }

    if (from.type === 'Plugin') {
      let cache = from.library ? loaders[from.library] : null;
      if (cache) {
        return cache;
      }

      cache = loaders[from.library || Symbol()] = Vue.defineAsyncComponent(
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

  return Object.assign(loader, {
    clear() {
      for (const key of Reflect.ownKeys(loaders)) delete loaders[key];
      for (const key of Reflect.ownKeys(caches)) delete caches[key];
      queue.clearAllCache();
    }
  }) as BlockLoader;
}

export function clearLoaderCache(loader?: BlockLoader) {
  loader?.clear();
  nodeCache.clear();
}
