import { createViteConfig } from '@vtj/cli';
const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  buildTarget: isUmd ? 'chrome60' : 'esnext',
  entry: isUmd ? 'src/install.ts' : 'src/index.ts',
  version: true,
  library: 'VtjUI',
  emptyOutDir: isUmd ? false : true,
  external: isUmd
    ? [
        'vue',
        'vue-router',
        'element-plus',
        '@element-plus/icons-vue',
        '@vueuse/core',
        '@vtj/utils',
        '@vtj/icons',
        'echarts',
        'vxe-table',
        'xe-utils'
      ]
    : [
        'vue',
        'vue-router',
        'element-plus',
        '@element-plus/icons-vue',
        '@vueuse/core',
        '@vtj/utils',
        '@vtj/icons',
        'echarts',
        'vxe-table',
        'xe-utils'
      ],
  externalGlobals: isUmd
    ? {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'VtjIcons',
        '@vueuse/core': 'VueUse',
        '@vtj/utils': 'VtjUtils',
        '@vtj/icons': 'VtjIcons',
        echarts: 'echarts',
        'vxe-table': 'VXETable',
        'xe-utils': 'XEUtils'
      }
    : undefined,
  formats: isUmd ? ['umd'] : ['es']
});
