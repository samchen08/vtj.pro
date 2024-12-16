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
  },
  {
    path: '/page/:id',
    name: 'page',
    component: () => import('./views/page.vue'),
    meta: {
      pure: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('./views/auth.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
