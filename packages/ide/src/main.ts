import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from '@vtj/runtime';
import { merge } from '@vtj/utils';
import 'element-plus/dist/index.css';
import '@vtj/icons/lib/style.css';
import '@vtj/engine/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';
import { ideConfig } from '@/api';
import Mask from '@/components/Mask.vue';

const isExample = process.env.ENV_TYPE === 'uat';
const isDev = process.env.ENV_TYPE === 'local';

const app = createApp(App);

(async () => {
  if (isDev || isExample) {
    const modules = import.meta.glob([
      '/.vtj/project/*.json',
      '/.vtj/file/*.json',
      '/src/views/pages/*.vue',
      '/src/components/blocks/*.vue'
    ]);
    const options: any = isExample
      ? {
          raw: false,
          service: 'storage'
        }
      : await ideConfig();

    const devOptions = isDev
      ? {
          ide: {
            path: '/'
          }
        }
      : {};
    await createProvider(
      merge(
        {
          service: 'file',
          project: { home: '/', name: '项目样例' },
          app,
          router,
          modules,
          ide: { path: location.pathname },
          startup: true,
          raw: isExample ? false : true,
          components: {
            Mask
          }
        },
        options,
        devOptions
      )
    );
  }

  app.use(router);
  app.mount('#app');
})();
