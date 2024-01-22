import { createViteConfig } from '@vtj/cli';
const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  library: 'VtjUtils',
  emptyOutDir: isUmd ? false : true,
  external: isUmd ? undefined : ['@vtj/base'],
  formats: isUmd ? ['umd', 'iife'] : ['es', 'cjs']
});
