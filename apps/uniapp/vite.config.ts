import { createUniappViteConfig } from '@vtj/cli';
import uni from '@dcloudio/vite-plugin-uni';
import { createDevTools } from '@vtj/local';
import { resolve } from 'path';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [
    createDevTools({
      // staticBase: basePath,
      devMode: false,
      pluginNodeModulesDir: '../../node_modules'
    }),
    !process.env.PREVIEW ? uni() : undefined
  ],
  alias: {
    'axios/lib/core/settle': resolve(
      '../../node_modules/axios/lib/core/settle'
    ),
    'axios/lib/helpers/buildURL': resolve(
      '../../node_modules/axios/lib/helpers/buildURL'
    )
  }
});
