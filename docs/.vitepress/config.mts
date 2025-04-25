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
    'VTJ 是一款基于 Vue3 + Typescript 的低代码页面可视化设计器。内置低代码引擎、渲染器和代码生成器，面向前端开发者，开箱即用。 无缝嵌入本地开发工程，不改变前端开发流程和编码习惯。',
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
      { icon: { svg: gitee }, link: 'https://gitee.com/newgateway/vtj' }
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
