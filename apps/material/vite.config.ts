import { createViteConfig } from '@vtj/cli';
import { library } from './vtj.config';

const isUmd = !!process.env.UMD;

const globals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  'element-plus': 'ElementPlus',
  '@vueuse/core': 'VueUse',
  '@vtj/utils': 'VtjUtils',
  '@vtj/icons': 'VtjIcons',
  '@vtj/ui': 'VtjUI',
  echarts: 'echarts'
};

function createOptions(umd: boolean, externalGlobals: Record<string, string>) {
  return {
    lib: true,
    dts: !umd,
    emptyOutDir: !umd,
    library,
    libFileName: 'index',
    entry: 'src/library/index.ts',
    formats: umd ? ['umd'] : ['es'],
    buildTarget: 'es2015',
    external: Object.keys(externalGlobals),
    externalGlobals: umd ? externalGlobals : undefined
  };
}

export default createViteConfig(createOptions(isUmd, globals));
