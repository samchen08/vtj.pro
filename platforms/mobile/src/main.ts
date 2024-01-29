import { createSSRApp } from 'vue';
import { RequestPlugin } from '@/mui';
import App from './App.vue';
export function createApp() {
  const app = createSSRApp(App);
  app.use(RequestPlugin);
  return {
    app
  };
}
