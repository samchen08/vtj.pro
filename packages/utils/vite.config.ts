import { createViteConfig, writeVersion } from '@vtj/cli';
writeVersion();

export default createViteConfig({
  debug: false,
  lib: true,
  libraryName: 'VtjUtils',
  elementPlus: false,
  cdn: !!process.env.CDN
});
