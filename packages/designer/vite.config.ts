import { createViteConfig } from '@vtj/cli';

export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  buildTarget: 'es2020',
  external: [
    'vue',
    'vue-router',
    'element-plus',
    '@element-plus/icons-vue',
    '@vtj/renderer',
    '@vtj/uni',
    '@vtj/core',
    '@vtj/utils',
    '@vtj/icons',
    '@vtj/ui',
    'element-plus/es/locale/lang/zh-cn',
    'html2canvas',
    'mockjs',
    'monaco-editor',
    'marked',
    'highlight.js'
    // 'monaco-editor/esm/vs/editor/editor.worker?worker',
    // 'monaco-editor/esm/vs/language/json/json.worker?worker',
    // 'monaco-editor/esm/vs/language/css/css.worker?worker',
    // 'monaco-editor/esm/vs/language/html/html.worker?worker',
    // 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
  ],
  formats: ['es']
});
