import { createViteConfig, writeVersion } from '@vtj/cli';

writeVersion();

export default createViteConfig({
  debug: false,
  lib: true,
  elementPlus: false,
  cdn: !!process.env.CDN,
  libraryName: 'VtjUI',
  external: [
    'vue',
    'vue-router',
    'element-plus',
    '@element-plus/icons-vue',
    '@vueuse/core',
    '@vtj/utils',
    '@vtj/icons',
    'echarts'
  ],
  externalGlobals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'element-plus': 'ElementPlus',
    '@element-plus/icons-vue': 'ElementPlusIconsVue',
    '@vueuse/core': 'VueUse',
    '@vtj/utils': 'VtjUtils',
    '@vtj/icons': 'VtjIcons',
    echarts: 'echarts'
  }
});
