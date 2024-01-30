import { removeSync } from '@vtj/node';
import { resolve } from 'path';

export function rm(path: string) {
  const target = resolve(path);
  try {
    removeSync(target);
  } catch (e) {
    console.log('rm error', e);
  }
}
