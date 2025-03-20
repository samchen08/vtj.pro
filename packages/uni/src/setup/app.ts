import type { UniConfig, JSFunction } from '@vtj/core';
import type { Provider } from '@vtj/renderer';
import type { SetupUniAppOptions, UniRoute } from '../types';
import { mergeOptions } from '../utils';
import { APP_LIFE_CYCLE, ROUTE_PAGE_BASE_PATH } from '../constants';
import {
  injectUniConfig,
  injectUniGlobal,
  injectUniRoutes,
  injectUniFeatures,
  injectUniCSS
} from '../injects';

import { install } from './plugin';

export function setupUniApp(options: SetupUniAppOptions) {
  const opts = mergeOptions(options);
  const {
    Vue,
    App,
    UniH5,
    routes = [],
    pagesJson = {},
    manifestJson = {},
    window,
    css = ''
  } = opts;
  if (!UniH5) {
    return Vue.createApp(App);
  }
  const { plugin, setupApp } = UniH5;
  injectUniFeatures(opts, window);
  injectUniConfig(opts, window);
  injectUniGlobal(UniH5, window);
  injectUniRoutes(Vue, UniH5, routes, pagesJson, window);
  injectUniCSS(manifestJson.appid || Date.now(), css, window);
  const app = Vue.createApp(setupApp(App));
  app.use(install, UniH5);
  app.use(plugin);
  return app;
}

export function createUniAppComponent(
  uniConfig: UniConfig,
  parser: (script: JSFunction) => Function
) {
  const comp: Record<string, Function> = {};
  Object.entries(uniConfig).forEach(([name, value]) => {
    if (APP_LIFE_CYCLE.includes(name) && value) {
      comp[name] = parser(value);
    }
  });
  return comp;
}

export function createUniLoader(provider: Provider, id: string) {
  return async () => {
    const dsl = await provider.getDsl(id);
    if (dsl) {
      const { renderer } = provider.createDslRenderer(dsl);
      return renderer;
    }
    return null;
  };
}

export async function createUniRoutes(
  provider: Provider,
  includeBlock: boolean = false,
  basePath: string = ROUTE_PAGE_BASE_PATH
) {
  const pages = provider.project?.pages || [];
  const routes: UniRoute[] = [];
  for (const page of pages) {
    const home = provider.project?.homepage === page.id;
    routes.push({
      id: page.id,
      path: `${basePath}/${page.id}`,
      loader: createUniLoader(provider, page.id),
      style: {
        navigationBarTitleText: page.title,
        ...page.style
      },
      needLogin: page.needLogin,
      home
    });
  }

  const homeRoute = routes.find((route) => !!route.home) || routes[0];
  if (homeRoute) {
    const homePath = basePath === ROUTE_PAGE_BASE_PATH ? '/' : basePath;
    routes.unshift({
      ...homeRoute,
      path: homePath
    });
  }

  if (includeBlock) {
    const blocks = provider.project?.blocks || [];
    for (const block of blocks) {
      routes.push({
        id: block.id,
        path: `${basePath}/${block.id}`,
        loader: createUniLoader(provider, block.id),
        style: {
          navigationStyle: 'custom'
        }
      });
    }
  }

  return routes;
}
