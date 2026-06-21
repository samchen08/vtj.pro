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

export const UNI_COMPOSITION_HOOKS_LIST = [
  'onBeforeMount',
  'onMounted',
  'onBeforeUpdate',
  'onUpdated',
  'onBeforeUnmount',
  'onUnmounted'
];

export const UNI_HOOKS = [
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
  'onAddToFavorites'
];

export const PAGE_LIFE_CYCLES_LIST = [
  ...UNI_HOOKS,
  ...COMPONENT_LIFE_CYCLES_LIST
];

export const UNI_PAGE_HOOKS_LIST = [
  ...UNI_HOOKS,
  ...UNI_COMPOSITION_HOOKS_LIST
];

export const ROUTE_PAGE_BASE_PATH = '/pages';
