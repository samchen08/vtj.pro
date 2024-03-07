import { createUniappViteConfig } from '@vtj/cli';
import uni from '@dcloudio/vite-plugin-uni';
import { resolve } from 'path';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [!process.env.PREVIEW ? uni() : undefined],
  alias: {
    'axios/lib/core/settle': resolve(
      '../../node_modules/axios/lib/core/settle'
    ),
    'axios/lib/helpers/buildURL': resolve(
      '../../node_modules/axios/lib/helpers/buildURL'
    )
  }
});
