import type { App } from 'vue';

import { INSTALLED_KEY } from '../constants';
import { ADAPTER_KEY, type Adapter } from '../adapter';

export interface InstallerOptions {
  adapter?: Adapter;
}

export const makeInstaller = (components: any[] = []) => {
  const install = (app: App, options: InstallerOptions = {}) => {
    if ((app as any)[INSTALLED_KEY]) return;

    (app as any)[INSTALLED_KEY] = true;
    components.forEach((c) => {
      if (c.name) {
        app.component(c.name, c);
      }
    });
    if (options.adapter) {
      app.provide(ADAPTER_KEY, options.adapter);
    }
  };
  return {
    install
  };
};
