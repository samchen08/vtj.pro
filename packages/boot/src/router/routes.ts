import { vtj } from './vtj';
export const routes = [
  ...vtj,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue')
  }
];
