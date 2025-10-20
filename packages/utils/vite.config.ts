import { createViteConfig } from '@vtj/cli';
const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  version: true,
  library: 'VtjUtils',
  buildTarget: isUmd ? 'chrome60' : 'es2020',
  emptyOutDir: isUmd ? false : true,
  external: isUmd ? undefined : ['@vtj/base', 'vue'],
  externalGlobals: isUmd ? { vue: 'Vue' } : undefined,
  formats: isUmd ? ['umd', 'iife'] : ['es', 'cjs']
});
