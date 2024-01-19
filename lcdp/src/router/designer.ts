import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'designer',
      component: () => import('@/views/designer/index.vue')
    },
    {
      path: '/preview/:id',
      name: 'preview',
      component: () => import('@/views/designer/preview.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/not-found.vue')
    }
  ]
});

export default router;
