import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  formats: ['es', 'cjs'],
  external: [
    '@vtj/base',
    'prettier',
    'prettier/standalone',
    'prettier/plugins/html',
    'prettier/plugins/babel',
    'prettier/plugins/postcss',
    'prettier/plugins/estree'
  ]
});
