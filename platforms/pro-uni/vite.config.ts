import { createViteConfig } from '@vtj/cli';
import { resolve } from 'path';
import proxy from './proxy.config';
const isDev = process.env.NODE_ENV !== 'production';
export default createViteConfig({
  proxy,
  base: './',
  outDir: '../pro/dist/uni',
  elementPlus: false,
  dts: false,
  devtools: false,
  loading: false,
  reload: false,
  port: 8010,
  alias: {
    vue: '@dcloudio/uni-h5-vue',
    '@vtj/uni': isDev ? resolve('../../packages/uni/src') : '@vtj/uni',
    '@vtj/renderer': isDev
      ? resolve('../../packages/renderer/src')
      : '@vtj/renderer'
  }
});
