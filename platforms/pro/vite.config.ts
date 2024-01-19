import { createViteConfig } from '@vtj/cli';
import { createDevPlugin } from '@vtj/local';

export default createViteConfig({
  base: './',
  elementPlus: false,
  dts: false,
  optimizeDeps: [
    'monaco-editor',
    'monaco-editor/esm/vs/editor/editor.worker',
    'monaco-editor/esm/vs/language/json/json.worker',
    'monaco-editor/esm/vs/language/css/css.worker',
    'monaco-editor/esm/vs/language/html/html.worker',
    'monaco-editor/esm/vs/language/typescript/ts.worker'
  ],
  plugins: [
    createDevPlugin({
      link: false,
      copy: true,
      devMode: true
    })
  ]
});
