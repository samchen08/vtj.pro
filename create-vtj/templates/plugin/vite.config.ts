import { createViteConfig, createPluginViteConfig, readJson } from '@vtj/cli';
import { createDevTools } from '@vtj/pro/vite';
const isUmd = !!process.env.UMD;
const isDev = !!process.env.DEV;
const pkg = readJson('package.json');

export default isDev
  ? createViteConfig({
      plugins: [createDevTools()]
    })
  : createPluginViteConfig({
      libFileName: pkg.name,
      isUmd
    });
