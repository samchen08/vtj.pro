import { createApp } from 'vue';
import App from '@/views/designer/app.vue';
import router from '@/router/designer';
import '@/style/index.scss';
const app = createApp(App);
app.use(router);
app.mount('#app');
