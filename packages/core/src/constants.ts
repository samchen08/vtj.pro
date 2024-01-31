/**
 * 内置物料名
 */
export const BUILT_IN_NAME = 'BuiltIn';

/**
 * 内置 vue 组件物料名
 */
export const BUILT_IN_VUE = 'VueMaterial';

/**
 * 内置 vue-router 组件物料名
 */
export const BUILT_IN_VUE_ROUTER = 'VueRouterMaterial';

/**
 * 内置物料
 */
export const BUILT_IN_MATERIALS = [BUILT_IN_VUE, BUILT_IN_VUE_ROUTER];

/**
 * 内置类库包名和导出名映射
 */
export const BUILT_IN_LIBRARAY_MAP: Record<string, string> = {
  vue: 'Vue',
  'vue-router': 'VueRouter'
};

/**
 * 内置组件
 */
export const BUILT_IN_COMPONENTS: Record<string, string[]> = {
  [BUILT_IN_VUE]: [
    'Transition',
    'TransitionGroup',
    'KeepAlive',
    'Teleport',
    'Suspense'
  ],
  [BUILT_IN_VUE_ROUTER]: ['RouterView', 'RouterLink']
};

export const BUILT_IN_TAGS = [
  'slot',
  'template',
  'component',
  'img',
  'div',
  'p',
  'h1',
  'h2',
  'h3',
  'span',
  'a'
];
