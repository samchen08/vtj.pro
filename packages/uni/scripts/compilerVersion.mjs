import fs from 'fs-extra';
import { resolve } from 'path';
const pkg = fs.readJsonSync(
  resolve('../../node_modules/@dcloudio/vite-plugin-uni/package.json'),
  'utf-8'
);

const compilerVersion = pkg['uni-app'].compilerVersion;

fs.writeFileSync(
  resolve('src/compilerVersion.ts'),
  `export const compilerVersion = '${compilerVersion}';`
);
