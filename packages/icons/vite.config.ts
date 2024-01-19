import { createViteConfig } from '@vtj/cli';

const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  entry: isUmd ? 'src/install.ts' : 'src/index.ts',
  version: true,
  library: 'VtjIcons',
  emptyOutDir: isUmd ? false : true,
  // 在umd模式，内置@element-plus/icons-vue
  external: isUmd ? ['vue'] : ['vue', '@element-plus/icons-vue'],
  externalGlobals: isUmd
    ? {
        vue: 'Vue'
      }
    : undefined,
  formats: isUmd ? ['umd', 'iife'] : ['es', 'cjs']
});
