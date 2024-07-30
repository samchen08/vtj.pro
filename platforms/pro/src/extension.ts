import * as Vue from 'vue';
import * as core from '@vtj/core';
import * as VtjUtils from '@vtj/utils';
import * as VtjUI from '@vtj/ui';
import * as designer from '@vtj/designer';
import * as renderer from '@vtj/renderer';
import * as VtjIcons from '@vtj/icons';
import * as ElementPlus from 'element-plus';
import type { ExtensionConfig } from '@vtj/core';
import type { EngineOptions } from '@vtj/designer';

export type ExtensionOptions = ExtensionConfig;
export type ExtensionFactory = () => Partial<EngineOptions> | void;

export class Extension {
  private urls: string[] = [];
  private library: string = '';
  private params: any[] = [];
  private __BASE_PATH__: string = '/';
  constructor(options: ExtensionOptions) {
    const __VTJ_PRO__ = {
      ...core,
      ...designer,
      ...renderer
    };

    (window as any).Vue = Vue;
    (window as any).__VTJ_PRO__ = __VTJ_PRO__;
    (window as any).VtjUtils = VtjUtils;
    (window as any).VtjIcons = VtjIcons;
    (window as any).VtjUI = VtjUI;
    (window as any).ElementPlus = ElementPlus;
    const { urls = [], library, params = [], __BASE_PATH__ = '/' } = options;
    this.urls = urls;
    this.library = library;
    this.params = params;
    this.__BASE_PATH__ = __BASE_PATH__;
  }
  async load(): Promise<Partial<EngineOptions> | undefined> {
    if (!this.library) return;
    const base = this.__BASE_PATH__;
    const css = this.urls
      .filter((n) => renderer.isCSSUrl(n))
      .map((n) => `${base}${n}`);
    const scripts: string[] = this.urls
      .filter((n) => renderer.isJSUrl(n))
      .map((n) => `${base}${n}`);
    renderer.loadCssUrl(css);
    if (scripts.length) {
      const output = await renderer
        .loadScriptUrl(scripts, this.library)
        .catch(() => null);
      if (output && typeof output === 'function') {
        return output.apply(output, this.params);
      }
    }
  }
}
