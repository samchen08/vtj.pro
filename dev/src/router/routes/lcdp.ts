export const lcdp = [
  {
    path: '/lcdp/engine',
    component: () => import('@/views/lcdp/engine/index.vue')
  },
  {
    path: '/lcdp/coder',
    component: () => import('@/views/lcdp/engine/coder.vue')
  },
  {
    path: '/lcdp/template',
    component: () => import('@/views/lcdp/engine/template.vue')
  }
];
