import { createProvider, LocalService, createModules } from '@vtj/web';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './style/index.scss';
import { name } from '../package.json';

const app = createApp(App);
const service = new LocalService();

const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as 'development' | 'production',
  modules: createModules(),
  service,
  router,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router'),
    ElementPlus: () => import('element-plus'),
    VtjUtils: () => import('@vtj/utils'),
    VtjUI: () => import('@vtj/ui')
  },
  project: {
    id: name
  }
});
onReady(async () => {
  app.use(router);
  app.use(provider);
  app.mount('#app');
});
