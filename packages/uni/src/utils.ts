import type { SetupUniAppOptions } from './types';
import { MANIFEST_JSON, PAGES_JSON } from './defaults';

export function toKebabCase(str: string): string {
  const [first, ...rest] = str;
  const lowerCaseStr = [first.toLowerCase(), ...rest].join('');
  return lowerCaseStr.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

export function mergeOptions(options: SetupUniAppOptions): SetupUniAppOptions {
  let { manifestJson = {}, pagesJson = {}, routes = [] } = options;
  const pages = routes.map((route) => {
    const { path, style, needLogin } = route;
    return {
      path,
      style,
      needLogin
    };
  });
  return {
    ...options,
    manifestJson: Object.assign({}, MANIFEST_JSON, manifestJson),
    pagesJson: Object.assign({}, PAGES_JSON, pagesJson, { pages })
  };
}

export const navigationBarMaps: Record<string, string> = {
  navigationBarBackgroundColor: 'backgroundColor',
  navigationBarTextStyle: 'titleColor',
  navigationBarTitleText: 'titleText',
  navigationStyle: 'style',
  titleImage: 'titleImage',
  titlePenetrate: 'titlePenetrate',
  transparentTitle: 'transparentTitle'
};

export function getNavigationBar(style: Record<string, any>) {
  const navigationBarStyle: Record<string, any> = {};
  const colors: Record<string, string> = {
    black: '#000000',
    white: '#ffffff'
  };
  for (const key in style) {
    if (navigationBarMaps[key]) {
      navigationBarStyle[navigationBarMaps[key]] =
        key === 'navigationBarTextStyle'
          ? colors[style[key]] || colors.black
          : style[key];
    }
  }
  return navigationBarStyle;
}

export function getGobalStyle(style: Record<string, any>) {
  const globalStyle: Record<string, any> = {};
  for (const key in style) {
    if (!navigationBarMaps[key]) {
      globalStyle[key] = style[key];
    }
  }
  return globalStyle;
}

export function getFileId(hash: string) {
  const str = hash.split('?')[0];
  const match = str.match(/\#\/pages\/([\w\W]*)/i);
  return match?.[1] ?? '';
}
