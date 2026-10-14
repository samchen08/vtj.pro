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

import type { JSFunction } from '@vtj/core';
import type { App } from 'vue';
import { isJSFunction, parseFunction } from '@vtj/renderer';

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

export function injectEnhance(
  enhance: JSFunction,
  app: App,
  libs: Record<string, any> = {}
) {
  if (isJSFunction(enhance) && enhance.value) {
    const func = parseFunction(enhance, {}, false, false, true);
    func(app, libs);
  }
}