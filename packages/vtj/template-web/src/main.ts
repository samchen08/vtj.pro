import { createApp } from 'vue';
import { createProvider } from '@vtj/runtime';
import * as VtjIcons from '@vtj/icons';
import App from './App.vue';
import router from './router';
import Mask from '@/components/Mask.vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import '@vtj/icons/lib/style.css';
import '@vtj/ui/lib/style.css';
import '@/style/index.scss';

const app = createApp(App);

(async () => {
  await createProvider({
    app,
    router,
    components: {
      Mask
    }
  });
  app.use(router);
  app.use(VtjIcons);
  app.mount('#app');
})();
