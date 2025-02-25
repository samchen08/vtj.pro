import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { AdapterPlugin, IconsPlugin } from '@vtj/web';
// import ElementPlus from 'element-plus';
import '@/style/index.scss';
import './mock';

const app = createApp(App);
app.use(router);
app.use(IconsPlugin);
app.use(AdapterPlugin, {
  vxeConfig: {
    // size: 'mini' /
  }
});

// app.use(ElementPlus);
app.mount('#app');
