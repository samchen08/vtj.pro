// https://vitepress.dev/guide/custom-theme
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { h } from 'vue';
import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import 'element-plus/theme-chalk/index.css';
import '@vtj/icons/dist/style.css';
import '@vtj/ui/dist/style.css';
import './style.css';
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('demo-preview', ElementPlusContainer);

    (function () {
      if (typeof window !== 'undefined') {
        (window as any)._hmt = (window as any)._hmt || [];
        const hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?42f2469b4aa27c3f8978f634c0c19d24';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode?.insertBefore(hm, s);
      }
    })();
  }
} satisfies Theme;
