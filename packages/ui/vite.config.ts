import { createViteConfig } from '@vtj/cli';
const isUmd = !!process.env.UMD;

export default createViteConfig({
  lib: true,
  dts: isUmd ? false : true,
  entry: isUmd ? 'src/install.ts' : 'src/index.ts',
  version: true,
  library: 'VtjUI',
  emptyOutDir: isUmd ? false : true,
  external: isUmd
    ? [
        'vue',
        'vue-router',
        'element-plus',
        '@element-plus/icons-vue',
        '@vtj/utils',
        '@vtj/icons',
        'echarts',
        '@ckeditor/ckeditor5-build-classic',
        '@ckeditor/ckeditor5-vue',
        '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js',
        '@vue-office/docx',
        '@vue-office/excel',
        '@vue-office/pdf'
      ]
    : [
        'vue',
        'vue-router',
        'element-plus',
        '@element-plus/icons-vue',
        '@vueuse/core',
        '@vtj/utils',
        '@vtj/icons',
        'echarts',
        '@ckeditor/ckeditor5-build-classic',
        '@ckeditor/ckeditor5-vue',
        '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js',
        '@vue-office/docx',
        '@vue-office/excel',
        '@vue-office/pdf'
      ],
  externalGlobals: isUmd
    ? {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        'element-plus': 'ElementPlus',
        '@element-plus/icons-vue': 'VtjIcons',
        '@vtj/utils': 'VtjUtils',
        '@vtj/icons': 'VtjIcons',
        echarts: 'echarts',
        '@ckeditor/ckeditor5-build-classic': 'ClassicEditor',
        '@ckeditor/ckeditor5-vue': 'CKEditor',
        '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js':
          'CKEDITOR_TRANSLATIONS',
        '@vue-office/docx': 'vue-office-docx',
        '@vue-office/excel': 'vue-office-excel',
        '@vue-office/pdf': 'vue-office-pdf'
      }
    : undefined,
  formats: isUmd ? ['umd'] : ['es']
});
