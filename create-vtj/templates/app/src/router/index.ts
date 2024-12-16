import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/unauthorized.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/not-found.vue')
    }
  ]
});

export default router;
