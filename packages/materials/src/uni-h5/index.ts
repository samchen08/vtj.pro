import './style.scss';

import type { App } from 'vue';
//@ts-ignore
import { plugin, getApp, uni } from '@dcloudio/uni-h5';
//@ts-ignore
export * from '@dcloudio/uni-h5';

export function install(app: App) {
  app.use(plugin);
  const top: any = window.top || window;
  top.uni = (window as any).uni = uni;
  top.getApp = (window as any).getApp = getApp;
}
