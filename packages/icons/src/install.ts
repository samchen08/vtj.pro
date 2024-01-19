import { type App } from 'vue';
import { icons } from './index';
export * from './index';

export const install = (app: App) => {
  const installed = (app as any).__VTJ_ICONS_INSTALLED__;
  if (installed) return;
  for (const [key, component] of Object.entries(icons)) {
    app.component(key, component as any);
  }
  (app as any).__VTJ_ICONS_INSTALLED__ = true;
};
