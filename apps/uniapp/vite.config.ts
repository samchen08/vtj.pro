import { createUniappViteConfig } from '@vtj/cli';
import uni from '@dcloudio/vite-plugin-uni';
import {
  createDevTools,
  vtjModulesPlugin,
  createCompositionFixPlugin,
  fixAxiosAdapterUploadConflict
} from '@vtj/local';
import { resolve } from 'path';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [
    fixAxiosAdapterUploadConflict(),
    createCompositionFixPlugin(),
    vtjModulesPlugin('src/.vtj'),
    process.env.ENV_TYPE
      ? createDevTools({
          // staticBase: basePath,
          devMode: false,
          pluginNodeModulesDir: '../../node_modules'
        })
      : undefined,
    !process.env.PREVIEW ? uni() : undefined
  ],
  alias: {
    '@vtj/uni-app': resolve('../../platforms/uni-app/src/index.ts'),
    'axios/lib/core/settle': resolve(
      '../../node_modules/axios/lib/core/settle'
    ),
    'axios/lib/helpers/buildURL': resolve(
      '../../node_modules/axios/lib/helpers/buildURL'
    ),
    'axios/unsafe/core/buildFullPath': resolve(
      '../../node_modules/axios/lib/core/buildFullPath'
    ),
    'axios/unsafe/core/settle': resolve(
      '../../node_modules/axios/lib/core/settle'
    ),
    'axios/unsafe/helpers/buildURL': resolve(
      '../../node_modules/axios/lib/helpers/buildURL'
    ),
    'axios/unsafe/helpers/speedometer': resolve(
      '../../node_modules/axios/lib/helpers/speedometer'
    )
  }
});
