import './style/index.scss';
import {
  createProvider,
  LocalService,
  createModules,
  NodeEnv,
  autoUpdate,
  ContextMode,
  notify,
  loading,
  createAdapter,
  createServiceRequest,
  Startup
} from '@vtj/h5';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { name } from '../package.json';
import enhance from './enhance';

const app = createApp(App);
const adapter = createAdapter({ loading, notify, Startup });
const service = new LocalService(createServiceRequest(notify));
const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Raw,
  modules: createModules(),
  adapter,
  service,
  router,
  enhance,
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
