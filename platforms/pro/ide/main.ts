import { createApp } from 'vue';
import Designer from './app.vue';
import router from './router';
import './style.scss';
const app = createApp(Designer);
app.use(router);
app.mount('#app');
