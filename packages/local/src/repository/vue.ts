import { resolve, relative, isAbsolute } from 'path';
import {
  pathExistsSync,
  removeSync,
  outputFileSync,
  ensureFileSync
} from '@vtj/node';

import { isValidFilePath, type PlatformType } from '@vtj/core';

export interface VueRepositoryOptions {
  dir: string;
  platform: PlatformType;
}

export class VueRepository {
  private path: string;
  constructor(options: VueRepositoryOptions) {
    const { dir = '.vtj/vue' } = options;
    this.path = resolve(dir);
  }
  private resolve(name: string) {
    if (!isValidFilePath(name)) {
      throw new Error(`Vue 文件路径【${name}】格式不正确`);
    }
    const filePath = resolve(this.path, `${name}.vue`);
    const path = relative(this.path, filePath);
    if (path.startsWith('..') || isAbsolute(path)) {
      throw new Error(`Vue 文件路径【${name}】超出源码目录`);
    }
    return filePath;
  }
  exist(name: string) {
    const filePath = this.resolve(name);
    return pathExistsSync(filePath);
  }
  save(name: string, content: any) {
    const filePath = this.resolve(name);
    if (!this.exist(name)) {
      ensureFileSync(filePath);
    }
    outputFileSync(filePath, content, 'utf-8');
    return true;
  }
  remove(name: string) {
    const filePath = this.resolve(name);
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
