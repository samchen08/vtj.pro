import { removeSync } from '@vtj/node';
import { resolve } from 'path';

export function rm(path: string) {
  const target = resolve(path);
  removeSync(target);
}
