import { fs } from './fs';
import { resolve } from 'path';
export function writeVersion(file: string = 'src/version.ts') {
  const pkg = fs.readJSONSync(resolve('package.json'));
  const content = `export const version = '${pkg.version}';`;
  const toPath = resolve(file);
  fs.writeFileSync(toPath, content, 'utf-8');
}
