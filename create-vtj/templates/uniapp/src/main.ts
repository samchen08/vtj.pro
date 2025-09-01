import { createSSRApp } from 'vue';
import {
  NodeEnv,
  ContextMode,
  createAdapter,
  LocalService,
  createServiceRequest,
  createProvider,
  loading,
  notify,
  createModules
} from '@vtj/uni-app';
import * as VueI18n from 'vue-i18n';
import App from './App.vue';
import { name } from '../package.json';

const adapter = createAdapter({ loading, notify });
const service = new LocalService(createServiceRequest(notify));
const modules = createModules();
const { provider, onReady } = createProvider({
  nodeEnv: process.env.NODE_ENV as NodeEnv,
  mode: ContextMode.Raw,
  modules,
  adapter,
  service,
  project: {
    id: name
  },
  dependencies: {
    VueI18n: async () => VueI18n
  }
});

export function createApp() {
  const app = createSSRApp(App);
  onReady(() => {
    app.use(provider);
  });

  return {
    app
  };
}
