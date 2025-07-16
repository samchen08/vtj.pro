import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  version: true,
  formats: ['es', 'cjs'],
  external: [
    '@vtj/base',
    '@vtj/core',
    '@vtj/coder',
    '@vue/compiler-sfc',
    '@vue/compiler-dom',
    '@vue/compiler-core',
    '@babel/core',
    '@babel/parser',
    '@babel/traverse',
    '@babel/generator',
    '@babel/types',
    'postcss',
    'sass'
  ]
});
