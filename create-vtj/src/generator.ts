import { join } from 'path';
import { readFileSync } from 'node:fs';
import {
  copySync,
  readJsonSync,
  writeJsonSync,
  outputFile,
  pathExistsSync
} from '@vtj/node';
export interface IGeneratorOptions {
  root: string;
  template: string;
  name: string;
}

export function createProject(options: IGeneratorOptions) {
  copySync(options.template, options.root, { filter: () => true });
  const pkg = readJsonSync(join(options.root, 'package.json'));
  pkg.name = options.name;
  let jsonStr = JSON.stringify(pkg);
  jsonStr = jsonStr.replace(/\{\{name\}\}/gi, options.name);
  writeJsonSync(join(options.root, 'package.json'), JSON.parse(jsonStr), {
    spaces: 2
  });
  const gitignore = join(options.template, '../_gitignore');
  const npmrc = join(options.template, '../_npmrc');
  if (pathExistsSync(gitignore)) {
    outputFile(
      join(options.root, '.gitignore'),
      readFileSync(gitignore, 'utf-8')
    );
  }
  if (pathExistsSync(npmrc)) {
    outputFile(join(options.root, '.npmrc'), readFileSync(npmrc, 'utf-8'));
  }
}

// export function createLibrary(options: IGeneratorOptions) {
//   copySync(options.template, options.root, { filter: () => true });
//   const pkg = readJsonSync(join(options.root, 'package.json'));
//   pkg.name = options.name;
//   writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
//   const gitignore = join(options.template, '.gitignore');
//   if (pathExistsSync(gitignore)) {
//     outputFile(
//       join(options.root, '.gitignore'),
//       readFileSync(gitignore, 'utf-8')
//     );
//   }
// }

// export function createApp(options: IGeneratorOptions) {
//   copySync(options.template, options.root, { filter: () => true });
//   const pkg = readJsonSync(join(options.root, 'package.json'));
//   pkg.name = options.name;
//   writeJsonSync(join(options.root, 'package.json'), pkg, { spaces: 2 });
//   const gitignore = join(options.template, '.gitignore');
//   if (pathExistsSync(gitignore)) {
//     outputFile(
//       join(options.root, '.gitignore'),
//       readFileSync(gitignore, 'utf-8')
//     );
//   }
// }
