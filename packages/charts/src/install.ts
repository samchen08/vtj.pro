import type { App } from 'vue';
import { components } from './index';
export const INSTALLED_KEY = Symbol('INSTALLED_KEY');
export function install(app: App) {
  if ((app as any)[INSTALLED_KEY]) return;

  (app as any)[INSTALLED_KEY] = true;
  components.forEach((c) => {
    if (c.name) {
      app.component(c.name, c);
    }
  });
}

export * from './index';
