import { createViteConfig } from '@vtj/cli';
const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  version: true,
  library: 'VtjUtils',
  buildTarget: isUmd ? 'es2015' : 'es2020',
  emptyOutDir: isUmd ? false : true,
  external: isUmd ? undefined : ['@vtj/base'],
  formats: isUmd ? ['umd', 'iife'] : ['es', 'cjs']
});
