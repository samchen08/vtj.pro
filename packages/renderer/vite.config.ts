import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  formats: ['es', 'cjs'],
  external: [
    'vue',
    'vue-router',
    '@vtj/base',
    '@vtj/core',
    '@vtj/ui',
    '@vtj/utils',
    '@vtj/icons',
    'element-plus',
    '@element-plus/icons-vue',
    'mockjs',
    '@ckeditor/ckeditor5-build-classic',
    '@ckeditor/ckeditor5-vue',
    '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js'
  ],
  styleBundler: true
});
