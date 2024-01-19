import { createApp } from 'vue';
import { createProvider, LocalService } from '@vtj/web';
import router from './router';
import App from './App.vue';
import './style/index.scss';
export const modules =
  process.env.NODE_ENV === 'production'
    ? import.meta.glob([
        '/.vtj/project.json',
        '/.vtj/raw/*.vue',
        '/src/views/*.vue'
      ])
    : import.meta.glob([
        '/.vtj/project.json',
        '/.vtj/files/*.json',
        '/.vtj/raw/*.vue',
        '/src/views/*.vue'
      ]);

const app = createApp(App);
const service = new LocalService();
const { provider, onReady } = createProvider({
  service,
  modules,
  router,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router'),
    ElementPlus: () => import('element-plus')
  }
});

onReady(async () => {
  app.use(router);
  app.use(provider);
  app.mount('#app');
});
