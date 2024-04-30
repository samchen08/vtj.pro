import * as Vue from 'vue';
import * as core from '@vtj/core';
import * as designer from '@vtj/designer';
import * as renderer from '@vtj/renderer';
import * as VtjIcons from '@vtj/icons';
import * as ElementPlus from 'element-plus';

import type { EngineOptions } from '@vtj/designer';

export interface ExtensionOptions {
  urls: string[];
  library: string;
}

export class Extension {
  private urls: string[] = [];
  private library: string = '';
  constructor(options: ExtensionOptions) {
    const __VTJ_PRO__ = {
      ...core,
      ...designer,
      ...renderer
    };

    (window as any).Vue = Vue;
    (window as any).__VTJ_PRO__ = __VTJ_PRO__;
    (window as any).VtjIcons = VtjIcons;
    (window as any).ElementPlus = ElementPlus;
    const { urls, library } = options;
    this.urls = urls;
    this.library = library;
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
        return output();
      }
    }
  }
}
