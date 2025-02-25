import { createViteConfig } from '@vtj/cli';
// const BUILD_TYPE = process.env.BUILD_TYPE || '';
const isUmd = !!process.env.UMD;
export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  buildTarget: isUmd ? 'chrome60' : 'esnext',
  emptyOutDir: isUmd ? false : true,
  version: true,
  library: 'VtjUni',
  formats: isUmd ? ['umd'] : ['es'],
  external: [
    'vue',
    'vue-router',
    '@vtj/base',
    '@vtj/core',
    '@vtj/ui',
    '@vtj/utils',
    '@vtj/icons',
    '@vtj/renderer',
    '@dcloudio/uni-app',
    '@dcloudio/uni-h5',
    '@dcloudio/uni-app-vue'
  ],
  externalGlobals: {
    vue: 'Vue',
    '@dcloudio/uni-h5': 'UniH5'
  }
});
