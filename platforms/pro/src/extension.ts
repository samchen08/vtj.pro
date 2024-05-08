import * as Vue from 'vue';
import * as core from '@vtj/core';
import * as VtjUtils from '@vtj/utils';
import * as VtjUI from '@vtj/ui';
import * as designer from '@vtj/designer';
import * as renderer from '@vtj/renderer';
import * as VtjIcons from '@vtj/icons';
import * as ElementPlus from 'element-plus';

import type { EngineOptions } from '@vtj/designer';

export interface ExtensionOptions {
  urls: string[];
  library: string;
  params?: any[];
}

export type ExtensionFactory = () => Partial<EngineOptions> | void;

export class Extension {
  private urls: string[] = [];
  private library: string = '';
  private params: any[] = [];
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
    const { urls, library, params = [] } = options;
    this.urls = urls;
    this.library = library;
    this.params = params;
  }
  async load(): Promise<Partial<EngineOptions> | undefined> {
    const css = this.urls.filter((n) => renderer.isCSSUrl(n));
    const scripts = this.urls.filter((n) => renderer.isJSUrl(n));
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
