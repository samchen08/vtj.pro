import type { App } from 'vue';

import { INSTALLED_KEY } from '../constants';

export const makeInstaller = (components: any[] = []) => {
  const install = (app: App) => {
    if ((app as any)[INSTALLED_KEY]) return;

    (app as any)[INSTALLED_KEY] = true;
    components.forEach((c) => app.component(c.name, c));
  };
  return {
    install
  };
};
