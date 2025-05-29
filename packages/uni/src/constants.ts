export const APP_LIFE_CYCLE = [
  'onLaunch',
  'onShow',
  'onHide',
  'onError',
  'onPageNotFound',
  'onUnhandledRejection',
  'onThemeChange',
  'onPageNotFound',
  'onUniNViewMessage',
  'onExit'
];

export const COMPONENT_LIFE_CYCLES_LIST = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted'
];

export const PAGE_LIFE_CYCLES_LIST = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onResize',
  'onPullDownRefresh',
  'onReachBottom',
  'onTabItemTap',
  'onShareAppMessage',
  'onPageScroll',
  'onNavigationBarButtonTap',
  'onBackPress',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputConfirmed',
  'onNavigationBarSearchInputClicked',
  'onShareTimeline',
  'onAddToFavorites',
  ...COMPONENT_LIFE_CYCLES_LIST
];

export const ROUTE_PAGE_BASE_PATH = '/pages';
