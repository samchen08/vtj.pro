import { createViteConfig, writeVersion } from '@vtj/cli';

const index = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: false,
  external: [
    'vue',
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
  externalGlobals: {}
});

const runtime = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: true,
  dts: false,
  dtsOutputDir: null,
  entry: 'src/runtime.ts',
  fileName: 'runtime',
  external: [
    'vue',
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
  externalGlobals: {}
});

const shared = createViteConfig({
  debug: false,
  lib: true,
  cdn: false,
  elementPlus: false,
  emptyOutDir: false,
  dts: false,
  dtsOutputDir: null,
  entry: 'src/shared.ts',
  fileName: 'shared',
  external: [
    'vue',
    'prettier',
    'prettier/parser-html',
    'prettier/parser-babel',
    'prettier/parser-postcss',
    '@vtj/ui',
    '@vtj/icons',
    '@vtj/utils',
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
  externalGlobals: {}
});

const map = {
  runtime,
  shared
};

writeVersion();

export default map[process.env.FILE] || index;
