import type { App } from 'vue';
import type { Provider } from '@vtj/renderer';
import { createPinia, defineStore } from 'pinia';
import './style/global.scss';
const pinia = createPinia();
const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  }
});

export default function (app: App, provider: Provider) {
  app.use(pinia);
  app.provide('counter', useCounterStore());

  provider.adapter.request.useRequest((config) => {
    // 注入请求头
    config.headers.Token = '123456';
    return config;
  });

  provider.adapter.request.useResponse((res) => {
    // 响应拦截处理
    return res;
  });
}
