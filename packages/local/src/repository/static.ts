import { resolve, join } from 'path';
import { pathExistsSync, removeSync, readdirSync, moveSync } from '@vtj/node';
import formidable from 'formidable';

export interface StaticRepositoryOptions {
  staticBase: string;
  staticDir: string;
  vtjDir: string;
}

export class StaticRepository {
  private path: string;
  constructor(private options: StaticRepositoryOptions) {
    this.path = resolve(this.options.staticDir, this.options.vtjDir);
  }
  exist(name: string) {
    const filePath = join(this.path, name);
    return pathExistsSync(filePath);
  }
  remove(name: string) {
    const filePath = join(this.path, name);
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
  getAllFiles() {
    if (pathExistsSync(this.path)) {
      const files = readdirSync(this.path) || [];
      return files.map((name) => {
        return {
          filename: name,
          filepath: join(
            this.options.staticBase,
            this.options.vtjDir,
            name
          ).replace(/\\/g, '/')
        };
      });
    }
    return [];
  }
  validate(files: formidable.File[]) {
    let isExists = false;
    const result = [];
    for (let file of files) {
      if (file.originalFilename) {
        const filePath = join(this.path, file.originalFilename);
        if (pathExistsSync(filePath)) {
          isExists = true;
          result.push({
            filename: file.originalFilename,
            filepath: join(
              this.options.staticBase,
              this.options.vtjDir,
              file.originalFilename
            ).replace(/\\/g, '/')
          });
          break;
        }
      }
    }
    if (isExists) {
      for (let file of files) {
        if (file.filepath) {
          if (pathExistsSync(file.filepath)) {
            removeSync(file.filepath);
          }
        }
      }
    }

    return isExists ? result : false;
  }
  save(files: formidable.File[]) {
    const result = [];
    for (let file of files) {
      if (file.filepath && file.originalFilename) {
        const filePath = join(this.path, file.originalFilename);
        moveSync(file.filepath, filePath, { overwrite: true });
        result.push({
          filename: file.originalFilename,
          filepath: join(
            this.options.staticBase,
            this.options.vtjDir,
            file.originalFilename
          ).replace(/\\/g, '/')
        });
      }
    }
    return result;
  }
}
