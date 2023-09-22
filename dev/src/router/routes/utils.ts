export const utils = [
  {
    path: '/utils/',
    component: () => import('@/views/utils/index.vue')
  },
  {
    path: '/utils/util',
    component: () => import('@/views/utils/util.vue')
  },
  {
    path: '/utils/crypto',
    component: () => import('@/views/utils/crypto.vue')
  },
  {
    path: '/utils/jsonp',
    component: () => import('@/views/utils/jsonp.vue')
  },
  {
    path: '/utils/request',
    component: () => import('@/views/utils/request.vue')
  }
];
