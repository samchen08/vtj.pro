import { copySync } from '@vtj/node';
import { existsSync } from 'fs';
import { resolve } from 'path';

export function copy(source: string, dest: string) {
  const src = resolve(source);
  if (existsSync(src)) {
    copySync(src, resolve(dest));
  } else {
    console.log('[copy]', `"${src}" is not found!`);
  }
}
