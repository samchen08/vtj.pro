import type { DefineComponent } from 'vue';

export interface UniRoute {
  id: string;
  path: string;
  loader?: (route?: Partial<UniRoute>) => Promise<DefineComponent>;
  component?: DefineComponent;
  style?: PageStyle;
  needLogin?: boolean;
  meta?: Record<string, any>;
  home?: boolean;
}

export type RouterMode = 'hash' | 'history';

export interface SetupUniAppOptions {
  Vue: any;
  App: any;
  UniH5: any;
  window?: any;
  routes?: UniRoute[];
  manifestJson?: ManifestJson;
  pagesJson?: PagesJson;
  css?: string;
}

export interface ManifestJson {
  name?: string;
  appid?: string;
  description?: string;
  locale?: string;
  versionName?: string;
  versionCode?: number;
  transformPx?: boolean;
  networkTimeout?: {
    request?: number;
    connectSocket?: number;
    uploadFile?: number;
    downloadFile?: number;
  };
  debug?: boolean;
  uniStatistics?: Record<string, any>;
  ['app-plus']?: Record<string, any>;
  h5?: {
    title?: string;
    template?: string;
    router?: {
      mode?: RouterMode;
      base?: string;
    };
    async?: {
      loading?: string;
      error?: string;
      delay?: number;
      timeout?: number;
    };
    sdkConfigs?: Record<string, any>;
  };
  quickapp?: Record<string, any>;
  ['mp-weixin']?: Record<string, any>;
  ['mp-alipay']?: Record<string, any>;
  ['mp-baidu']?: Record<string, any>;
  ['mp-toutiao']?: Record<string, any>;
  ['mp-lark']?: Record<string, any>;
  ['mp-qq']?: Record<string, any>;
  ['mp-kuaishou']?: Record<string, any>;
}

export interface GlobalStyle {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText?: string;
  navigationStyle?: 'default' | 'custom';
  backgroundColor?: string;
  backgroundTextStyle?: 'light' | 'dark';
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  titleImage?: string;
  transparentTitle?: 'always' | 'auto' | 'none';
  titlePenetrate?: 'YES' | 'NO';
  pageOrientation?: 'auto' | 'portrait' | 'landscape';
  animationType?:
    | 'pop-in'
    | 'pop-out'
    | 'slide-in-top'
    | 'slide-out-top'
    | 'slide-in-bottom'
    | 'slide-out-bottom'
    | 'slide-in-left'
    | 'slide-out-left'
    | 'slide-in-right'
    | 'slide-out-right'
    | 'fade-in'
    | 'fade-out';
  animationDuration?: number;
  ['app-plus']?: Record<string, any>;
  h5?: Record<string, any>;
  ['mp-weixin']?: Record<string, any>;
  ['mp-alipay']?: Record<string, any>;
  ['mp-baidu']?: Record<string, any>;
  ['mp-toutiao']?: Record<string, any>;
  ['mp-lark']?: Record<string, any>;
  ['mp-qq']?: Record<string, any>;
  ['mp-kuaishou']?: Record<string, any>;
  ['mp-jd']?: Record<string, any>;
  usingComponents?: Record<string, string>;
  renderingMode?: 'webrtc' | 'seperated';
  leftWindow?: boolean;
  topWindow?: boolean;
  rightWindow?: boolean;
  rpxCalcMaxDeviceWidth?: number;
  rpxCalcBaseDeviceWidth?: number;
  rpxCalcIncludeWidth?: boolean;
  dynamicRpx?: boolean;
  maxWidth?: number;
}

export interface PageStyle extends GlobalStyle {
  navigationBarShadow?: Record<string, string>;
  disableScroll?: boolean;
  disableSwipeBack?: boolean;
}

export interface TabBar {
  color?: string;
  selectedColor?: string;
  backgroundColor?: string;
  borderStyle?: 'black' | 'white';
  blurEffect?: 'dark' | 'extralight' | 'light' | 'none';
  list: TabBarItem[];
  position?: 'top' | 'bottom';
  fontSize?: string;
  iconWidth?: string;
  spacing?: string;
  height?: string;
  midButton?: {
    width?: string;
    height?: string;
    text?: string;
    iconPath?: string;
    iconWidth?: string;
    backgroundImage?: string;
    iconfont?: Iconfont;
  };
  iconfontSrc?: string;
  backgroundImage?: string;
  backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  redDotColor?: string;
}

export interface TabBarItem {
  pagePath?: string;
  text?: string;
  iconPath?: string;
  selectedIconPath?: string;
  visible?: boolean;
  iconfont?: Iconfont;
}

export interface Iconfont {
  text?: string;
  selectedText?: string;
  fontSize?: string;
  color?: string;
  selectedColor?: string;
}

export interface PagesJson {
  globalStyle?: GlobalStyle;
  pages?: PageItem[];
  easycom?: Record<string, string>;
  tabBar?: TabBar;
  condition?: Record<string, any>;
  subPackages?: any;
  preloadRule?: Record<string, any>;
  workers?: string;
  leftWindow?: PageItem;
  topWindow?: PageItem;
  rightWindow?: PageItem;
  uniIdRouter?: any;
  entryPagePath?: string;
}

export interface PageItem {
  path?: string;
  style?: PageStyle;
  needLogin?: boolean;
}
