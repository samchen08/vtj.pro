import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
import proxy from './proxy.config';
// const basePath = '/lowcode/';
const basePath = '/';
export default createViteConfig({
  base: basePath,
  proxy,
  elementPlus: false,
  lib: false,
  plugins: [
    createDevTools({
      staticBase: basePath,
      devMode: false,
      pluginNodeModulesDir: '../../node_modules',
      enhance: true
    })
  ]
});
