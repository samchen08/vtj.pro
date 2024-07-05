import { createViteConfig } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
import proxy from './proxy.config';
export default createViteConfig({
  proxy,
  elementPlus: false,
  plugins: [
    createDevTools({
      devMode: true,
      pluginNodeModulesDir: '../../node_modules'
    })
  ]
});
