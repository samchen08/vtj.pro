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
import { useReloadStorage } from '@/hooks';

const isExample = process.env.ENV_TYPE === 'uat';
const isIde = process.env.ENV_TYPE === 'live';
const isDev = process.env.NODE_ENV === 'development';

const app = createApp(App);

(async () => {
  let modules = {};
  if (isDev) {
    modules = import.meta.glob([
      '/.vtj/project/*.json',
      '/.vtj/file/*.json',
      '/src/views/pages/*.vue',
      '/src/components/blocks/*.vue'
    ]);
  }
  const options: any = isExample
    ? {
        raw: false,
        service: 'storage',
        example: async (link?: string) => {
          await useReloadStorage('ide');
          if (link) {
            location.href = link;
          }
        }
      }
    : await ideConfig();

  await createProvider(
    merge(
      {
        service: 'file',
        project: {
          home: isExample ? '/dashboard' : '/',
          base: location.pathname
        },
        app,
        router,
        modules,
        startup: true,
        raw: isExample ? false : true,
        components: {
          Mask
        }
      },
      options,
      isDev || isExample
        ? {
            ide: { path: location.pathname }
          }
        : {
            ide: null
          }
    )
  );

  app.use(router);
  app.mount('#app');
})();
