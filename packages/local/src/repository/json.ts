import { resolve, join } from 'path';
import {
  writeJsonSync,
  pathExistsSync,
  readJsonSync,
  removeSync,
  ensureFileSync
} from '@vtj/node';

export class JsonRepository {
  private path: string;
  constructor(path: string) {
    this.path = resolve('.vtj', path);
  }
  exist(name: string) {
    const filePath = join(this.path, `${name}.json`);
    return pathExistsSync(filePath);
  }
  save(name: string, json: any) {
    const filePath = join(this.path, `${name}.json`);
    if (!this.exist(name)) {
      ensureFileSync(filePath);
    }
    writeJsonSync(filePath, json, {
      spaces: 2,
      EOL: '\n'
    });
    return true;
  }
  get(name: string) {
    const filePath = join(this.path, `${name}.json`);
    if (pathExistsSync(filePath)) {
      return readJsonSync(filePath);
    } else {
      return undefined;
    }
  }
  remove(name: string) {
    const filePath = join(this.path, `${name}.json`);
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
