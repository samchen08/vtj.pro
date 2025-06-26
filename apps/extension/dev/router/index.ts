import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout.vue';
import { routes } from './modules';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/designer'
    },
    {
      path: '/designer',
      name: 'Home',
      component: () => import('../designer/index.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../designer/auth.vue')
    },
    {
      path: '/preview/:id',
      name: 'Preivew',
      component: () => import('../designer/preview.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../designer/404.vue')
    }
  ]
});

export default router;
