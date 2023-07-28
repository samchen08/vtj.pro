export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue')
  }
];
