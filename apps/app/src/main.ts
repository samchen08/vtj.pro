import {
  createProvider,
  LocalService,
  createModules,
  NodeEnv,
  autoUpdate
} from '@vtj/web';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import './style/index.scss';
import { name } from '../package.json';

const app = createApp(App);
const service = new LocalService();

const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  modules: createModules(),
  service,
  router,
  dependencies: {
    Vue: () => import('vue'),
    VueRouter: () => import('vue-router')
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

if (process.env.NODE_ENV === 'production') {
  autoUpdate();
}
