import { readJsonSync } from '@vtj/node';
import { resolve } from 'path';

export function readJson(path: string) {
  const target = resolve(path);
  return readJsonSync(target);
}
