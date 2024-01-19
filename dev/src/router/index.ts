import { createRouter, createWebHashHistory } from 'vue-router';
import { pageRoutes } from '../modules';
// import { utils, ui, icons } from './routes';

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/',
    name: 'coverage',
    component: () => import('@/views/coverage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue')
  },
  ...pageRoutes.value
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
