import { join } from 'path';
import { readFileSync } from 'node:fs';
import { copySync, readJsonSync, writeJsonSync, outputFile } from '@vtj/node';
export interface IGeneratorOptions {
  root: string;
  template: string;
  name: string;
}

export function createLibrary(options: IGeneratorOptions) {
  copySync(options.template, options.root, { filter: () => true });
  const pkg = readJsonSync(join(options.root, 'package.json'));
  pkg.name = options.name;
  writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
  outputFile(
    join(options.root, '.gitignore'),
    readFileSync(join(options.template, '.gitignore'), 'utf-8')
  );
}

export function createApp(options: IGeneratorOptions) {
  copySync(options.template, options.root, { filter: () => true });
  const pkg = readJsonSync(join(options.root, 'package.json'));
  pkg.name = options.name;
  writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
  outputFile(
    join(options.root, '.gitignore'),
    readFileSync(join(options.template, '.gitignore'), 'utf-8')
  );
}
