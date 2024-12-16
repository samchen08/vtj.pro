import { createApp } from 'vue';
import { Access } from '@vtj/renderer';
import Designer from './app.vue';
import router from './router';
import { ACCESS_STORAGE_KEY } from './contants';
import './style.scss';
const app = createApp(Designer);
const access = new Access({
  storageKey: ACCESS_STORAGE_KEY
});

app.use(access);
app.use(router);
app.mount('#app');
