import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import 'element-plus/dist/index.css';
import '@vtj/icons/lib/style.css';
import '@vtj/engine/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';
import { ideConfig } from '@/api';

const isDev = process.env.ENV_TYPE === 'local';
const idDemo = process.env.ENV_TYPE === 'uat';
const app = createApp(App);

const modules = isDev
  ? import.meta.glob(['/.vtj/project/*.json', '/.vtj/file/*.json'])
  : undefined;

(async () => {
  const options = isDev || idDemo ? undefined : await ideConfig();
  const provider = await createProvider({
    service: idDemo ? 'storage' : 'file',
    project: isDev || idDemo ? ({ home: '/startup' } as any) : undefined,
    ...options,
    app,
    modules,
    router,
    ide: isDev || idDemo ? { path: '/' } : null,
    startup: isDev || idDemo ? true : false
  });
  app.use(provider);
  app.use(router);
  app.mount('#app');

  if ((isDev || idDemo) && !sessionStorage.getItem('startup')) {
    sessionStorage.setItem('startup', '1');
    router.push('/startup');
  }
})();
