import type { App } from 'vue';
import { components } from './ui';
export * from './ui';
export * from './api';
export * from './hooks';
export * from './utils';

export function install(app: App) {
  Object.entries(components).forEach(([name, comp]) => {
    app.component(name, comp);
  });
}
