import * as Vue from 'vue';
import * as core from '@vtj/core';
import * as VtjUtils from '@vtj/utils';
import * as VtjUI from '@vtj/ui';
import * as designer from '@vtj/designer';
import * as renderer from '@vtj/renderer';
import * as VtjIcons from '@vtj/icons';
import * as ElementPlus from 'element-plus';
import type { VTJConfig } from '@vtj/core';
import type { EngineOptions } from '@vtj/designer';

export type ExtensionFactory =
  | Partial<EngineOptions>
  | ((config: VTJConfig, ...args: any) => Partial<EngineOptions>);

export type ExtensionOutput = Partial<EngineOptions>;

export class Extension {
  private urls: string[] = [];
  private library: string = '';
  private params: any[] = [];
  private __BASE_PATH__: string = '/';
  constructor(private config: VTJConfig) {
    const __VTJ_PRO__ = {
      ...core,
      ...designer,
      ...renderer
    };
    const globals: Record<string, any> = {
      Vue,
      __VTJ_PRO__,
      VtjUtils,
      VtjIcons,
      VtjUI,
      ElementPlus
    };
    for (const [name, value] of Object.entries(globals)) {
      (window as any)[name] = value;
    }
    const { extension, __BASE_PATH__ = '/' } = config || {};
    const { urls = [], library, params = [] } = extension || {};
    if (library) {
      this.urls = urls;
      this.library = library;
      this.params = params;
      this.__BASE_PATH__ = __BASE_PATH__;
    }
  }
  async load(): Promise<ExtensionOutput> {
    let options: Partial<EngineOptions> = {};
    if (this.library) {
      const base = this.__BASE_PATH__;
      const css = this.urls
        .filter((n) => renderer.isCSSUrl(n))
        .map((n) => `${base}${n}`);
      const scripts: string[] = this.urls
        .filter((n) => renderer.isJSUrl(n))
        .map((n) => `${base}${n}`);
      renderer.loadCssUrl(css);
      if (scripts.length) {
        const output: ExtensionFactory = await renderer
          .loadScriptUrl(scripts, this.library)
          .catch(() => null);
        if (output && typeof output === 'function') {
          options = output.call(output, this.config, ...this.params);
        } else {
          options = output || {};
        }
      }
    }
    return options;
  }
}
