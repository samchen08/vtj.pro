import { isUrl, url as urlUtils, dedupArray } from '@vtj/utils';
import { version } from '../version';

import type { Dependencie, MaterialDescription } from '@vtj/core';

export function fillBasePath(urls: string[], basePath: string) {
  return urls.map((url) => {
    if (isUrl(url) || url.startsWith('/')) {
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

export function isJSON(url: string): boolean {
  return /\.json$/.test(url);
}

export function createAssetScripts(scripts: string[]): string {
  return scripts
    .map(
      (url) => `<script src="${urlUtils.append(url, { v: version })}"></script>`
    )
    .join('');
}

export function createAssetsCss(css: string[] = []) {
  return css
    .map(
      (url) =>
        `<link rel="stylesheet" href="${urlUtils.append(url, { v: version })}" />`
    )
    .join('');
}

export function removeProdFlag(url: string, isDev: boolean = false) {
  return isDev && url.endsWith('.prod.js')
    ? url.replace('.prod.js', '.js')
    : url;
}

export function parseDeps(
  deps: Dependencie[],
  basePath: string,
  isDev: boolean = false
) {
  const packages = deps.filter((n) => !!n.enabled);
  const scripts: string[] = [];
  const css: string[] = [];
  const materials: string[] = [];
  const libraryExports: string[] = [];
  const libraryMap: Record<string, string[]> = {};
  const libraryLocaleMap: Record<string, string> = {};
  const materialExports: string[] = [];
  const materialMapLibrary: Record<string, string> = {};
  packages.forEach(
    ({ urls, assetsUrl, library, assetsLibrary, localeLibrary }) => {
      urls?.forEach((url) => {
        if (isJSUrl(url)) {
          scripts.push(removeProdFlag(url, isDev));
        }
        if (isCSSUrl(url)) {
          css.push(url);
        }
      });
      if (library) {
        libraryExports.push(library);
        libraryMap[library] = fillBasePath(urls || [], basePath);
        if (localeLibrary) {
          libraryLocaleMap[library] = localeLibrary;
        }
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
    }
  );
  return {
    scripts: fillBasePath(scripts, basePath),
    css: fillBasePath(css, basePath),
    materials: fillBasePath(materials, basePath),
    libraryExports,
    materialExports: dedupArray(materialExports),
    materialMapLibrary,
    libraryMap,
    libraryLocaleMap
  };
}

export function getRawComponent(desc: MaterialDescription, lib: any) {
  const { name, parent, alias } = desc;
  return parent ? lib[parent]?.[alias || name] : lib[alias || name];
}

export function parseUrls(urls: string[] = []) {
  const css = urls.filter((n) => isCSSUrl(n));
  const js = urls.filter((n) => isJSUrl(n));
  return {
    css,
    js
  };
}
