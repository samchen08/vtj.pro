import { createViteConfig } from '@vtj/cli';
export default createViteConfig({
  lib: true,
  dts: true,
  visualizer: false,
  version: true,
  babel: true,
  library: 'VtjLibraryProject',
  external: ['@vtj/base'],
  externalGlobals: {
    '@vtj/base': 'VtjBase'
  },
  targets: ['chorme > 20']
});
