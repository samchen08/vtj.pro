import { resolve, join } from 'path';
import {
  writeJsonSync,
  pathExistsSync,
  readJsonSync,
  removeSync,
  ensureFileSync
} from '@vtj/node';

import type { PlatformType } from '@vtj/core';

export interface JsonRepositoryOptions {
  dir: string;
  platform: PlatformType;
  category: string;
}

export class JsonRepository {
  private path: string;
  constructor(options: JsonRepositoryOptions) {
    const { dir = '.vtj', platform = 'web', category } = options;
    const _dir = platform === 'uniapp' ? `src/${dir}` : dir;
    this.path = resolve(_dir, category);
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
