import { createViteConfig } from '@vtj/cli';
import { resolve } from 'path';
export default createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  libraryName: 'VtjRuntime',
  external: [
    '.vtj',
    'vue',
    'vue-router',
    'prettier',
    'prettier/parser-html',
    'prettier/parser-babel',
    'prettier/parser-postcss',
    '@vtj/ui',
    '@vtj/icons',
    '@vtj/utils',
    'element-plus',
    'element-plus/lib/locale/lang/zh-CN',
    '@element-plus/icons-vue',
    'mitt',
    'zen-logger',
    '@vueuse/core',
    'monaco-editor',
    'monaco-editor/esm/vs/editor/editor.worker?worker',
    'monaco-editor/esm/vs/language/json/json.worker?worker',
    'monaco-editor/esm/vs/language/css/css.worker?worker',
    'monaco-editor/esm/vs/language/html/html.worker?worker',
    'monaco-editor/esm/vs/language/typescript/ts.worker?worker',
    'jsoneditor'
  ],
  alias: {
    '.vtj': resolve('src/.vtj.ts')
  }
});
