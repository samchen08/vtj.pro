// https://vitepress.dev/guide/custom-theme
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { h, defineAsyncComponent } from 'vue';
import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
// @ts-ignore
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import { ElMessageBox } from 'element-plus';
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
    // app.component('demo-preview', ElementPlusContainer);
    app.component(
      'demo-preview',
      defineAsyncComponent(async () => ElementPlusContainer)
    );

    (function () {
      if (typeof window !== 'undefined') {
        (window as any)._hmt = (window as any)._hmt || [];
        const hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?42f2469b4aa27c3f8978f634c0c19d24';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode?.insertBefore(hm, s);
      }
    })();

    setTimeout(() => {
      if (typeof localStorage === 'undefined') return;
      const voteCacheKey = 'gitee_voted_2026_03_02';
      const isVoted = !!localStorage.getItem(voteCacheKey);
      if (!isVoted) {
        ElMessageBox.confirm(
          `
      <div class="tip-msg__t">关于旧版平台停止服务及升级至新版的公告</div>
      <div>旧版平台 lcdp.vtj.pro 将于3月31日停服，请立即升级至新版 app.vtj.pro，同时老用户半价私有化部署优惠也将在当天截止，之后恢复原价¥1999。</div>


      `,
          {
            title: '公告',
            dangerouslyUseHTMLString: true,
            customClass: 'tip-msg',
            showClose: false,
            closeOnPressEscape: false,
            closeOnClickModal: false,
            confirmButtonText: '查看详情',
            cancelButtonText: '关闭',
            buttonSize: 'large',
            roundButton: true
          }
        )
          .then(() => {
            localStorage.setItem(voteCacheKey, 'true');
            window.open('https://vtj.pro/news/2026-03-02.html');
          })
          .catch(() => {
            localStorage.setItem(voteCacheKey, 'true');
            // window.open('https://vtj.pro/news/2026-03-02.html');
          });
      }
    }, 300);
  }
} satisfies Theme;
