import { isUrl } from '@vtj/utils';

import type { Dependencie, MaterialDescription } from '@vtj/core';

export function fillBasePath(urls: string[], basePath: string) {
  return urls.map((url) => {
    if (isUrl(url)) {
      return url;
    }
    return `${basePath}${url}`;
  });
}

export function isCSSUrl(url: string): boolean {
  return /\.css$/.test(url);
}

export function isJSUrl(url: string): boolean {
  return /\.js$/.test(url);
}
export function createAssetScripts(scripts: string[]): string {
  return scripts.map((url) => `<script src="${url}"></script>`).join('');
}

export function createAssetsCss(css: string[] = []) {
  return css.map((url) => `<link rel="stylesheet" href="${url}" />`).join('');
}

export function parseDeps(deps: Dependencie[], basePath: string) {
  const packages = deps.filter((n) => !!n.enabled);
  const scripts: string[] = [];
  const css: string[] = [];
  const materials: string[] = [];
  const libraryExports: string[] = [];
  const libraryMap: Record<string, string[]> = {};
  const materialExports: string[] = [];
  const materialMapLibrary: Record<string, string> = {};
  packages.forEach(({ urls, assetsUrl, library, assetsLibrary }) => {
    urls?.forEach((url) => {
      if (isJSUrl(url)) {
        scripts.push(url);
      }
      if (isCSSUrl(url)) {
        css.push(url);
      }
    });
    if (library) {
      libraryExports.push(library);
      libraryMap[library] = fillBasePath(urls || [], basePath);
    }
    if (assetsUrl) {
      materials.push(assetsUrl);
    }
    if (assetsLibrary) {
      materialExports.push(assetsLibrary);
    }
    if (library && assetsLibrary) {
      materialMapLibrary[assetsLibrary] = library;
    }
  });
  return {
    scripts: fillBasePath(scripts, basePath),
    css: fillBasePath(css, basePath),
    materials: fillBasePath(materials, basePath),
    libraryExports,
    materialExports,
    materialMapLibrary,
    libraryMap
  };
}

export function getRawComponent(desc: MaterialDescription, lib: any) {
  const { name, parent, alias } = desc;
  return parent ? lib[parent]?.[alias || name] : lib[alias || name];
}
