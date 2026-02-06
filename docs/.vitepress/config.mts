import { defineConfig } from 'vitepress';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'path';

import {
  containerPreview,
  componentPreview
  //@ts-ignore
} from '@vitepress-demo-preview/plugin';
import nav from './nav';
import sidebar from './sidebar';
const buildType = process.env.BUILD_TYPE;
const gitee = `<svg t="1705367265025" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4208" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="4209"></path></svg>`;
const gitcode = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4791 4.97677C15.6201 4.89789 15.7691 4.8145 15.93 4.72314C15.9494 4.82848 15.9683 4.92046 15.9854 5.00383C16.0157 5.15091 16.0406 5.2719 16.0525 5.39144C16.1479 6.4296 16.6697 7.1933 17.4092 7.36527C18.4908 7.61639 19.5106 7.20133 20.06 6.28555C20.72 5.18673 20.4334 3.84099 19.3097 3.03098C16.1851 0.777435 12.7523 0.155888 9.05448 1.24127C1.08137 3.59371 -1.64675 13.3884 4.01196 19.3949C6.43291 21.9642 9.50695 23.0727 12.9963 22.9889C17.4663 22.8839 20.6857 20.6563 22.7408 16.7954C24.1978 14.0561 22.6139 11.0619 19.5805 10.4396C17.8481 10.0908 16.0765 9.97756 14.3137 10.103C13.7272 10.1594 13.1579 10.3325 12.6394 10.6124C12.0592 10.9135 11.8915 11.5383 11.9565 12.1575C12.0171 12.7217 12.4498 13.0601 12.965 13.1453C14.0024 13.3077 15.0522 13.402 16.1 13.4881C16.4032 13.5136 16.7093 13.5166 17.0149 13.5197C17.4534 13.5241 17.8912 13.5285 18.3187 13.5991C19.5385 13.8007 19.9574 14.7905 19.33 15.8495C19.1763 16.1041 18.9971 16.3424 18.7951 16.5607C17.9745 17.4632 16.9014 18.0981 15.7152 18.3827C13.55 18.9127 11.3827 18.9425 9.22755 18.2617C6.77347 17.4875 5.31042 15.6849 5.25902 13.2584C5.2398 11.7619 5.61972 10.2874 6.35969 8.9865C6.694 8.38013 6.87751 7.75562 6.82593 7.06851C6.80422 6.77557 6.79219 6.48231 6.77927 6.16716C6.77239 5.99944 6.76526 5.82551 6.75628 5.64214C7.00484 5.69431 7.25032 5.76016 7.49161 5.83943C8.43027 6.21622 9.35415 6.38811 10.3702 6.11155C10.9481 5.97335 11.5455 5.93511 12.1363 5.9985C13.0877 6.07606 14.0387 5.84361 14.847 5.33586C15.0488 5.2176 15.2539 5.10279 15.4791 4.97677Z" fill="#DA203E"/>
</svg>
`;
let base = '/';
let outDir = './dist';

if (buildType === 'gitee') {
  base = '/vtj/';
  // outDir = './dist/vtj';
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base,
  title: 'VTJ.PRO',
  description:
    'AI 驱动的 Vue3 低代码开发平台。内置低代码引擎、渲染器与代码生成器，实现 Vue 源码与低代码 DSL 的双向智能转换。专为前端开发者打造，开箱即用。无缝融入现有工程，零侵入开发流程与编码习惯。',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: `${base}assets/logo.svg` }
    ]
  ],
  srcDir: 'src',
  cacheDir: './cache',
  themeConfig: {
    logo: '/assets/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: { svg: gitee }, link: 'https://gitee.com/newgateway/vtj' },
      { icon: { svg: gitcode }, link: 'https://gitcode.com/vtj/vtj.pro' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present VTJ.PRO'
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  },
  outDir,
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        $: resolve('./.vitepress')
      }
    }
    // plugins: [nodePolyfills({})]
  }
});
