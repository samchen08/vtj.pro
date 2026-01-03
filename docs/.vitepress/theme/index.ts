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

    // setTimeout(() => {
    //   if (typeof localStorage === 'undefined') return;
    //   const voteCacheKey = 'gitee_voted';
    //   const isVoted = !!localStorage.getItem(voteCacheKey);
    //   if (!isVoted) {
    //     ElMessageBox.confirm(
    //       `
    //   <div class="tip-msg__t">我们正在参加 <strong>Gitee 2025</strong> 最受欢迎的开源软件投票活动，您的支持非常重要! </div>
    //   <div><a class="tip-msg__a1" href="https://gitee.com/activity/2025opensource?ident=ID1KKL">https://gitee.com/activity/2025opensource?ident=ID1KKL</a></div>

    //   <div class="tip-msg__p1">每个人可以投 1 票，谢谢~</div>
    //   <div class="tip-msg__p2">投票可加入官方交流微信群领取AI助手<strong>10万Token</strong>额度哦~ </div>
    //   `,
    //       {
    //         title: '⚡ VTJ 急需您的投票支持',
    //         dangerouslyUseHTMLString: true,
    //         customClass: 'tip-msg',
    //         showClose: false,
    //         closeOnPressEscape: false,
    //         closeOnClickModal: false,
    //         confirmButtonText: '🚀 支持一下',
    //         cancelButtonText: '已经投票',
    //         buttonSize: 'large',
    //         roundButton: true
    //       }
    //     )
    //       .then(() => {
    //         localStorage.setItem(voteCacheKey, 'true');
    //         window.open(
    //           'https://gitee.com/activity/2025opensource?ident=ID1KKL'
    //         );
    //       })
    //       .catch(() => {
    //         localStorage.setItem(voteCacheKey, 'true');
    //         window.open(
    //           'https://gitee.com/activity/2025opensource?ident=ID1KKL'
    //         );
    //       });
    //   }
    // }, 300);
  }
} satisfies Theme;
