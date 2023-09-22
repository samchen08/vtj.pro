import { join } from 'path';
import { rm, readdir } from 'fs/promises';
const PARENT_PATH = 'packages';
const DIRS = ['lib', 'cdn', 'types', 'dist'];
const FILES = ['tsconfig.tsbuildinfo', 'package-lock.json', 'pnpm-lock.yaml'];

async function getPackages() {
  return await readdir(PARENT_PATH);
}

async function cleanDir(list) {
  console.log('开始清理编译产物...');
  for (let pkg of list) {
    for (let dir of DIRS) {
      const dirpath = join(PARENT_PATH, pkg, dir);
      await rm(dirpath, { recursive: true, force: true });
      // console.log(`remove`, dirpath);
    }
    for (let file of FILES) {
      const filepath = join(PARENT_PATH, pkg, file);
      await rm(filepath, { recursive: true, force: true });
      // console.log(`remove`, filepath);
    }
  }
  await rm('node_modules', { recursive: true, force: true });
  for (let file of FILES) {
    await rm(file, { recursive: true, force: true });
  }
  console.log('done:', '清除编译产物完成！');
}

const list = await getPackages();
cleanDir(list);
