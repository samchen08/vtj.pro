import { createViteConfig } from '@vtj/cli';
import { createDevTools, createCompositionFixPlugin } from '@vtj/pro/vite';
import proxy from './proxy.config';
// const basePath = '/lowcode/';
const basePath = '/';
export default createViteConfig({
  base: basePath,
  proxy,
  elementPlus: false,
  lib: false,
  plugins: [
    createCompositionFixPlugin(),
    createDevTools({
      staticBase: basePath,
      devMode: false,
      pluginNodeModulesDir: '../../node_modules'
    })
  ]
});
