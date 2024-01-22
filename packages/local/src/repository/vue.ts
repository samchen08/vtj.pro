import { resolve, join } from 'path';
import {
  pathExistsSync,
  removeSync,
  outputFileSync,
  ensureFileSync
} from '@vtj/node';

export class VueRepository {
  private path: string;
  constructor() {
    this.path = resolve('.vtj/vue');
  }
  exist(name: string) {
    const filePath = join(this.path, `${name}.vue`);
    return pathExistsSync(filePath);
  }
  save(name: string, content: any) {
    const filePath = join(this.path, `${name}.vue`);
    if (!this.exist(name)) {
      ensureFileSync(filePath);
    }
    outputFileSync(filePath, content, 'utf-8');
    return true;
  }
  remove(name: string) {
    const filePath = join(this.path, `${name}.vue`);
    if (pathExistsSync(filePath)) {
      removeSync(filePath);
      return true;
    }
    return false;
  }
  clear() {
    if (pathExistsSync(this.path)) {
      removeSync(this.path);
      return true;
    }
    return false;
  }
}
