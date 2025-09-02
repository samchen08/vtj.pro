import type { App } from 'vue';
import type { GlobalConfig, JSFunction } from '@vtj/core';
import { adoptedStyleSheets, parseFunction, isJSFunction } from '../utils';
import { type ProvideAdapter } from './defaults';
import { Access } from '../plugins';
import { ContextMode } from '../constants';

export interface InitGlobalsOptions {
  app: App;
  window: Window;
  adapter: ProvideAdapter;
  library: Record<string, any>;
  mode: ContextMode;
}

export function initRuntimeGlobals(
  globals: GlobalConfig = {},
  options: InitGlobalsOptions
) {
  const { css, store, enhance } = globals;
  const { window, app, library = {}, adapter, mode } = options;
  const { Pinia } = library;
  app.config.globalProperties.$libs = library;

  // 1. 设置全局样式
  adoptedStyleSheets(window, 'global-css', css || '');

  // 2. 设置全局状态
  if (Pinia && store) {
    createStore(store, app, Pinia);
  }

  // 3. 配置请求默认设置、拦截器
  setAxios(app, adapter, globals);

  // 4. 设置Access， 优先使用adapter传入的aceess
  if (!adapter.access && globals.access) {
    createAccess(globals.access, app, mode, adapter);
  }

  // 5. 设置路由守卫
  setRouterGuard(app, globals);

  // 最后. 设置应用增强函数
  if (enhance) {
    createEnhance(enhance, app, library);
  }
}

function createStore(store: JSFunction, app: App, Pinia: any) {
  const pinia = Pinia.createPinia();
  app.use(pinia);
  if (isJSFunction(store) && store.value) {
    const storeFunc = parseFunction(store, {}, false, false, true);
    const useStore = Pinia.defineStore('$store', storeFunc(app) || {});
    app.config.globalProperties.$store = useStore();
  }
}

function createAccess(
  access: JSFunction,
  app: App,
  mode: ContextMode,
  adapter: ProvideAdapter
) {
  if (isJSFunction(access) && access.value) {
    const accessOptions = parseFunction(access, {}, false, false, true);
    const { alert, request } = adapter;
    const instance = new Access({
      alert,
      storagePrefix: '__VTJ_APP_',
      ...accessOptions(app)
    });
    const router = app.config.globalProperties.$router;
    instance.connect({ mode, router, request });
    app.use(instance);
  }
}

function setAxios(app: App, adapter: ProvideAdapter, globals: GlobalConfig) {
  if (!adapter.request) return;

  const { axios, request, response } = globals;
  if (axios && isJSFunction(axios) && axios.value) {
    const func = parseFunction(axios, {}, false, false, true);
    adapter.request.setConfig(func(app));
  }

  if (request && isJSFunction(request) && request.value) {
    const func = parseFunction(request, {}, false, false, true);
    const _request = adapter.request as any;
    if (_request.__unReq) {
      _request.__unReq();
    }
    _request.__unReq = adapter.request.useRequest((req) => func(req, app));
  }

  if (response && isJSFunction(response) && response.value) {
    const func = parseFunction(response, {}, false, false, true);
    const _request = adapter.request as any;
    if (_request.__unRes) {
      _request.__unRes();
    }
    _request.__unRes = adapter.request.useResponse((res) => func(res, app));
  }
}

function setRouterGuard(app: App, globals: GlobalConfig) {
  const { beforeEach, afterEach } = globals;
  const router = app.config.globalProperties.$router;
  if (beforeEach && isJSFunction(beforeEach) && beforeEach.value) {
    const func = parseFunction(beforeEach, {}, false, false, true);
    if (router) {
      router.beforeEach((to, from, next) => func(to, from, next, app));
    }
  }

  if (afterEach && isJSFunction(afterEach) && afterEach.value) {
    const func = parseFunction(afterEach, {}, false, false, true);
    if (router) {
      router.afterEach((to, from, failure) => func(to, from, failure, app));
    }
  }
}

function createEnhance(
  enhance: JSFunction,
  app: App,
  libs: Record<string, any> = {}
) {
  if (isJSFunction(enhance) && enhance.value) {
    const func = parseFunction(enhance, {}, false, false, true);
    func(app, libs);
  }
}
