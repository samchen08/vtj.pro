import { createViteConfig, writeVersion } from '@vtj/cli';
writeVersion();

export default createViteConfig({
  debug: false,
  lib: true,
  libraryName: 'VtjUtils',
  elementPlus: false,
  cdn: !!process.env.CDN,
  external: process.env.CDN
    ? []
    : ['js-cookie', 'crypto-js', 'jsencrypt', 'numeral', 'axios', 'lodash-es']
});
