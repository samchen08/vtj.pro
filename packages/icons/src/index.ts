import './style.scss';
export { version as VTJ_ICONS_VERSION } from './version';
import * as svgIcons from './components';
import * as Icons from './icons';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
export * from './components';
export * from './icons';
export * from '@element-plus/icons-vue';

export interface Icon {
  label: string;
  value: string;
  unicode: string;
}

const icons: Record<string, any> = {
  ...ElementPlusIconsVue,
  ...svgIcons,
  ...Icons
};

// const install = (app: App) => {
//   const installed = (app as any).__VTJ_ICONS_INSTALLED__;
//   if (installed) return;
//   for (const [key, component] of Object.entries(components)) {
//     app.component(key, component as any);
//   }
//   (app as any).__VTJ_ICONS_INSTALLED__ = true;
// };

export { icons };
