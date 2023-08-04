import {
  createBlockRenderer,
  PageSchema,
  Dependencie,
  isJSUrl,
  isCSSUrl,
  ApiSchema,
  createApiHandler,
  StorageService,
  VUE,
  createLoader,
  ProjectSchema,
  BlockSchema,
  Context,
  ContextMode,
  SummarySchema,
  version
} from '@vtj/engine/runtime';

import { markRaw, App, createApp } from 'vue';
import { Router } from 'vue-router';

export {
  version,
  createBlockRenderer,
  StorageService,
  VUE,
  createLoader,
  Context,
  ContextMode,
  type ProjectSchema,
  type BlockSchema,
  type PageSchema,
  type SummarySchema
};

export function createIdeLink(IDELink: any, props: Record<string, any>) {
  const app = createApp(IDELink, props);
  const el = document.createElement('div');
  document.body.appendChild(el);
  app.mount(el);
}

export function isPage(schema: unknown): schema is PageSchema {
  return typeof (schema as PageSchema)?.isDir === 'boolean';
}

export function loadCss(css: string[], timestamp?: string) {
  const head = document.head;
  for (let href of css) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href + '?t=' + (timestamp || Date.now());
    head.appendChild(link);
  }
}

export function loadScript(src: string, timestamp?: string) {
  return new Promise((resolve, reject) => {
    const body = document.body;
    const script = document.createElement('script');
    script.src = src + '?t=' + (timestamp || Date.now());
    script.onload = resolve;
    script.onerror = reject;
    body.appendChild(script);
  });
}

export async function loadScripts(scripts: string[], timestamp?: string) {
  for (let src of scripts) {
    await loadScript(src, timestamp);
  }
}

export function getLibs(libraries: Record<string, any>) {
  const libs: Record<string, any> = {};
  const components: Record<string, any> = {};
  for (const key of Object.keys(libraries)) {
    const lib = (libs[key] = (window as any)[key]);
    if (!lib) continue;
    const assetsLibrary = libraries[key];
    if (assetsLibrary) {
      const items = (window as any)[assetsLibrary]?.components || [];
      for (const item of items) {
        components[item.name] = markRaw(lib[item.name]);
      }
    }
  }
  return {
    libs,
    components
  };
}

export function parseDependencies(packages: Dependencie[]) {
  const scripts: string[] = [];
  const css: string[] = [];
  const assets: string[] = [];
  const libraries: Record<string, any> = {};
  packages.forEach(({ urls, assetsUrl, library, assetsLibrary }) => {
    urls?.forEach((url) => {
      if (isJSUrl(url)) {
        scripts.push(url);
      }
      if (isCSSUrl(url)) {
        css.push(url);
      }
    });
    if (assetsUrl) {
      assets.push(assetsUrl);
    }
    if (library) {
      libraries[library] = assetsLibrary || null;
    }
  });
  return {
    scripts,
    css,
    assets,
    libraries
  };
}

export function parseApis(apis: ApiSchema[]) {
  return apis.reduce((res, current) => {
    res[current.name] = createApiHandler(current);
    return res;
  }, {} as Record<string, any>);
}

export function install(app: App, libs: Record<string, any> = {}) {
  Object.values(libs).forEach((value) => {
    if (
      value &&
      (typeof value === 'function' || typeof value.install === 'function')
    ) {
      app.use(value);
    }
  });
  app.config.globalProperties.$libs = libs;
}

export function isMask(schema: unknown): boolean {
  return !!(schema as PageSchema)?.mask;
}

export function findPage(pages: PageSchema[], id: string) {
  const finder = (
    id: string,
    pages: PageSchema[] = []
  ): PageSchema | undefined => {
    for (const page of pages) {
      if (page.id === id) {
        return page;
      } else {
        if (page.children && page.children.length) {
          const match = finder(id, page.children);
          if (match) {
            return match;
          }
        }
      }
    }
  };
  return finder(id, pages);
}

export function getPages(pages: PageSchema[] = []) {
  let result: PageSchema[] = [];
  for (const page of pages) {
    if (page.isDir) {
      if (page.children && page.children.length) {
        result = result.concat(getPages(page.children));
      }
    } else {
      result.push(page);
    }
  }
  return result;
}

export function addRoute(
  router: Router,
  name: string,
  path: string,
  component: any
) {
  router.addRoute({
    path: `${path}/:id`,
    name,
    props: (route: any) => route.query,
    component
  });
}

export function addRouteWithMask(
  router: Router,
  name: string,
  path: string,
  mask: any,
  component: any
) {
  router.addRoute({
    path,
    name: `${name}Mask`,
    component: mask,
    children: [
      {
        path: ':id',
        name,
        props: (route: any) => route.query,
        component: component
      }
    ]
  });
}
