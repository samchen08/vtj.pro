import { join } from 'path';
import fs from 'fs-extra';

const { copySync, existsSync } = fs;

function doCopy(files, toDir) {
  for (let [src, dest] of files) {
    if (existsSync(src)) {
      copySync(src, join(toDir, dest));
    }
  }
  console.log('copy files done!');
}

// const args = process.argv.slice(2);
// const root = args.includes('--example') ? 'example' : 'dev';
// const dir = `${root}/public/libs`;
const files = [
  ['packages/assets/lib', ''],
  ['packages/utils/cdn/index.js', 'vtj-utils.js'],
  ['packages/ui/cdn/index.js', 'vtj-ui.js'],
  ['packages/ui/cdn/style.css', 'vtj-ui.css'],
  ['packages/icons/cdn/index.js', 'vtj-icons.js'],
  ['packages/icons/cdn/style.css', 'vtj-icons.css']
];

doCopy(files, 'dev/public/libs');
doCopy(files, 'packages/ide/public/libs');
