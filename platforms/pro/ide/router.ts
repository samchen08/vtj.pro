import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/index.vue')
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: () => import('./views/preview.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
