import type { SetupUniAppOptions } from '../types';
import { getNavigationBar, getGobalStyle } from '../utils';
import { compilerVersion } from '../compilerVersion';

export function injectUniConfig(
  options: SetupUniAppOptions,
  global: any = window
) {
  const { pagesJson = {}, manifestJson = {} } = options;
  const { easycom = {} } = pagesJson;
  const {
    appid = '',
    name = '',
    versionCode = '',
    versionName = ''
  } = manifestJson;

  // const tabBar = {
  //   position: 'bottom',
  //   color: '#7A7E83',
  //   selectedColor: '#3cc51f',
  //   borderStyle: 'black',
  //   blurEffect: 'none',
  //   fontSize: '10px',
  //   iconWidth: '24px',
  //   spacing: '3px',
  //   height: '50px',
  //   list: [
  //     {
  //       pagePath: '/',
  //       text: '主页'
  //     },
  //     {
  //       pagePath: 'pages/2',
  //       text: '组件'
  //     }
  //   ],
  //   backgroundColor: '#ffffff',
  //   selectedIndex: 0,
  //   shown: true
  // };

  const globalStyle = pagesJson.globalStyle as Record<string, any>;
  const router = manifestJson.h5?.router || {};
  global.__uniConfig = {
    easycom,
    globalStyle: {
      ...getGobalStyle(globalStyle),
      navigationBar: getNavigationBar(globalStyle),
      isNVue: false
    },
    compilerVersion,
    appId: appid,
    appName: name,
    appVersion: versionName,
    appVersionCode: String(versionCode),
    async: {
      loading: 'AsyncLoading',
      error: 'AsyncError',
      delay: 200,
      timeout: 60000,
      suspensible: true,
      ...(manifestJson.h5?.async || {})
    },
    debug: false,
    networkTimeout: {
      request: 60000,
      connectSocket: 60000,
      uploadFile: 60000,
      downloadFile: 60000,
      ...(manifestJson.networkTimeout || {})
    },
    sdkConfigs: {},
    nvue: {
      'flex-direction': 'column'
    },
    locale: '',
    fallbackLocale: '',
    locales: {},
    router: {
      mode: 'hash',
      base: '/',
      assets: 'assets',
      routerBase: router.base || '/',
      ...router
    },
    darkmode: false,
    themeConfig: {},
    tabBar: pagesJson.tabBar
      ? {
          position: 'bottom',
          color: '#7A7E83',
          selectedColor: '#3cc51f',
          borderStyle: 'black',
          blurEffect: 'none',
          fontSize: '10px',
          iconWidth: '24px',
          spacing: '3px',
          height: '50px',
          backgroundColor: '#ffffff',
          selectedIndex: 0,
          shown: true,
          ...pagesJson.tabBar
        }
      : undefined
    // tabBar: pagesJson.tabBar
  };
}
