import { createUniappViteConfig } from '@vtj/cli';
import {
  createDevTools,
  vtjModulesPlugin,
  createCompositionFixPlugin
} from '@vtj/local';
import uni from '@dcloudio/vite-plugin-uni';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [
    createCompositionFixPlugin(),
    vtjModulesPlugin('src/.vtj'),
    process.env.ENV_TYPE ? createDevTools({}) : undefined,
    !process.env.PREVIEW ? uni() : undefined
  ]
});
