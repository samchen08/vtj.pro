import { createApp } from 'vue';
import { createProvider, ContextMode } from '@vtj/web';
import { MATERIAL_PATH, PROJECT_ID, PROJECT_NAME } from './contants';
import router from './router/app';
import App from './App.vue';
import { LcdpService } from './service/lcdp';
import '@vtj/web/src/index.scss'
import './style/index.scss';

const app = createApp(App);
const service = new LcdpService();
const { provider, onReady } = createProvider({
  mode: ContextMode.Runtime,
  materialPath: MATERIAL_PATH,
  project: {
    id: PROJECT_ID,
    name: PROJECT_NAME
  },
  service,
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
