import { createApp } from 'vue';
import router from './router/index';
import App from './App.vue';
import 'element-plus/dist/index.css';
import * as VX from '../src/library/index';
const app = createApp(App);

app.use(VX);
app.use(router);
app.mount('#app');

export { app };
