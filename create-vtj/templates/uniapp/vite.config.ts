import { createUniappViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/local';
import uni from '@dcloudio/vite-plugin-uni';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [createDevTools({}), !process.env.PREVIEW ? uni() : undefined]
});
