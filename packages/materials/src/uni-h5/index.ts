import './style.scss';

import type { App } from 'vue';
//@ts-ignore
import { plugin, getApp, uni } from '@dcloudio/uni-h5';

//@ts-ignore
import * as UniH5 from '@dcloudio/uni-h5';

//@ts-ignore
export * from '@dcloudio/uni-h5';

export function injectUniGlobal(UniH5: any, global: any = window) {
  const {
    UniServiceJSBridge,
    UniViewJSBridge,
    getApp,
    uni,
    getCurrentPages,
    upx2px,
    setupPage
  } = UniH5;
  global.UniServiceJSBridge = UniServiceJSBridge;
  global.UniViewJSBridge = UniViewJSBridge;
  global.getApp = getApp;
  global.uni = uni;
  global.wx = uni;
  global.getCurrentPages = getCurrentPages;
  global.upx2px = upx2px;
  global.__setupPage = (comp: any) => setupPage(comp);
}

export function install(app: App) {
  app.use(plugin);
  const top: any = window.top || window;
  injectUniGlobal(UniH5, top);
}
injectUniGlobal(UniH5);
