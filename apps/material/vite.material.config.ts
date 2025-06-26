import { createViteConfig } from '@vtj/cli';
import { material } from './vtj.config';

export default createViteConfig({
  lib: true,
  dts: false,
  emptyOutDir: false,
  library: material,
  buildTarget: 'es2015',
  libFileName: 'material',
  entry: 'src/material/index.ts',
  formats: ['umd'],
  external: ['@vtj/core']
});
