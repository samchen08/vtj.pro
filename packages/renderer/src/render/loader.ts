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

import * as globalVue from 'vue';

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
  let component;
  const mod: any = await loadScriptUrl(scripts, library, global).catch(
    () => null
  );
  if (mod?.plugin) {
    component = mod.plugin;
  }
  return component
    ? {
        component,
        css
      }
    : null;
}

export interface CreateLoaderOptions {
  getDsl: (id: string) => Promise<BlockSchema | null>;
  getDslByUrl: (url: string) => Promise<BlockSchema | null>;
  options: Partial<CreateRendererOptions>;
}


export function createLoader(opts: CreateLoaderOptions): BlockLoader {
  const { getDsl, getDslByUrl, options } = opts;

  return (name: string, from?: NodeFrom, Vue: any = globalVue) => {
    if (!from || typeof from === 'string') return name;

    if (from.type === 'Schema' && from.id) {
      return Vue.defineAsyncComponent(async () => {
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
    }

    if (from.type === 'UrlSchema' && from.url) {
      return Vue.defineAsyncComponent(async () => {
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
    }

    if (from.type === 'Plugin') {
      return Vue.defineAsyncComponent(async () => {
        const plugin = await getPlugin(from, options.window);
        if (plugin) {
          loadCssUrl(plugin.css);
          return plugin.component;
        }
        return null;
      });
    }

    return name;
  };
}
