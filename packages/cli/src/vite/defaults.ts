import type { CreateViteConfigOptions } from './types';

export const defaults: CreateViteConfigOptions = {
  debug: false,
  base: '/',
  port: 9527,
  previewPort: 3010,
  dtsOutputDir: 'types',
  targets: ['chrome > 60'],
  // buildTarget: 'esnext',
  polyfills: true,
  entry: 'src/index.ts',
  libFileName: 'index',
  formats: ['es', 'cjs', 'umd', 'iife'],
  loading: true,
  envPath: './',
  copyPublicDir: true,
  devtools: false,
  reload: true,
  open: true
};
