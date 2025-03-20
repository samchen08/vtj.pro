import { createViteConfig } from '@vtj/cli';
import { library } from './vtj.config';
const globals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  'element-plus': 'ElementPlus',
  '@vueuse/core': 'VueUse',
  '@vtj/pro': '__VTJ_PRO__',
  '@vtj/utils': 'VtjUtils',
  '@vtj/icons': 'VtjIcons',
  '@vtj/ui': 'VtjUI',
  echarts: 'echarts'
};

export default createViteConfig({
  lib: true,
  dts: true,
  library,
  libFileName: 'index',
  entry: 'src/index.ts',
  formats: ['umd'],
  buildTarget: 'es2015',
  external: Object.keys(globals),
  externalGlobals: globals
});
