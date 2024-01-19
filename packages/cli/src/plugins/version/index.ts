import { fs, readJsonSync } from '@vtj/node';
import { resolve } from 'path';

function writeVersion(file: string) {
  const pkg = readJsonSync(resolve('package.json'));
  const date = new Date();
  const year = date.getFullYear();
  const banner = `/**!
 * Copyright (c) ${year}, VTJ.PRO All rights reserved.
 * @name ${pkg.name} 
 * @author CHC chenhuachun1549@dingtalk.com 
 * @version ${pkg.version}
 * @license <a href="https://vtj.pro/license.html">MIT License</a>
 */\n`;
  const code = `export const version = '${pkg.version}';`;
  const content = `${banner}${code}`;
  const toPath = resolve(file);
  fs.writeFileSync(toPath, content, 'utf-8');
}

export function versionPlugin(output: string = 'src/version.ts') {
  return {
    name: 'write-version',
    buildStart() {
      writeVersion(output);
    }
  };
}
