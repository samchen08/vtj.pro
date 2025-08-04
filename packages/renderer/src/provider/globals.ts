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
  if (css) {
    adoptedStyleSheets(window, 'global-css', css);
  }
  if (Pinia && store) {
    createStore(store, app, Pinia);
  }

  setAxios(app, adapter, globals);

  // 没有在adapter传入aceess，但有全局配置，采用全局配置
  if (!adapter.access && globals.access) {
    createAccess(globals.access, app, mode, adapter);
  }

  setRouterGuard(app, globals);

  if (enhance) {
    createEnhance(enhance, app);
  }
}

export function initRawGlobals(
  globals: Record<string, any>,
  options: InitGlobalsOptions
) {
  console.log(globals, options);
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
    const instance = new Access(accessOptions(app));
    const router = app.config.globalProperties.$router;
    const request = adapter.request;
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
    adapter.request.useRequest((req) => func(req, app));
  }

  if (response && isJSFunction(response) && response.value) {
    const func = parseFunction(response, {}, false, false, true);
    adapter.request.useResponse((res) => func(res, app));
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

function createEnhance(enhance: JSFunction, app: App) {
  if (isJSFunction(enhance) && enhance.value) {
    const func = parseFunction(enhance, {}, false, false, true);
    func(app);
  }
}
