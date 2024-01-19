import { join } from 'path';
import { rm, readdir } from 'fs/promises';
const PACKAGES_PATH = 'packages';
const APPS_PATH = 'apps';
const PLATFORMS_PATH = 'platforms';
const DIRS = ['lib', 'cdn', 'types', 'dist', 'coverage', 'temp'];
const FILES = ['tsconfig.tsbuildinfo', 'package-lock.json', 'pnpm-lock.yaml'];

async function getPackages(dir) {
  return await readdir(dir);
}

async function cleanDir(list, parentPath) {
  for (let pkg of list) {
    for (let dir of DIRS) {
      const dirpath = join(parentPath, pkg, dir);
      await rm(dirpath, { recursive: true, force: true });
    }
    for (let file of FILES) {
      const filepath = join(parentPath, pkg, file);
      await rm(filepath, { recursive: true, force: true });
    }
  }
  await rm('node_modules', { recursive: true, force: true });
  for (let file of FILES) {
    await rm(file, { recursive: true, force: true });
  }
}

async function cleanOther() {
  await rm('.nx', { recursive: true, force: true });
  await rm('create-vtj/dist', { recursive: true, force: true });
  await rm('create-vtj/node_modules', { recursive: true, force: true });
  await rm('dev/dist', { recursive: true, force: true });
  await rm('dev/node_modules', { recursive: true, force: true });
  await rm('docs/dist', { recursive: true, force: true });
  await rm('docs/node_modules', { recursive: true, force: true });
  await rm('docs/cache', { recursive: true, force: true });
  await rm('docs/.vitepress/cache', { recursive: true, force: true });
}

console.log('开始清理...');
await cleanDir(await getPackages(PACKAGES_PATH), PACKAGES_PATH);
await cleanDir(await getPackages(PLATFORMS_PATH), PLATFORMS_PATH);
await cleanDir(await getPackages(APPS_PATH), APPS_PATH);
await cleanOther();
console.log('开始完成！');
