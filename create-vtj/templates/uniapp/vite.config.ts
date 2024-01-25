import { createUniappViteConfig } from '@vtj/cli';
import uni from '@dcloudio/vite-plugin-uni';
import proxy from './proxy.config';

export default createUniappViteConfig({
  proxy,
  plugins: [!process.env.PREVIEW ? uni() : undefined]
});
