// import {
//   UniServiceJSBridge,
//   UniViewJSBridge,
//   getApp,
//   uni,
//   getCurrentPages,
//   upx2px,
//   setupPage
//   //@ts-ignore
// } from '@dcloudio/uni-h5';

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
