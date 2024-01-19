#!/usr/bin/env node

import { rm, copy } from '../dist/index.mjs';

const type = process.argv[2];

if (type) {
  switch (type) {
    case 'rm':
      const target = process.argv[3];
      if (target) {
        rm(target);
      }
      break;
    case 'copy':
      const src = process.argv[3];
      const dest = process.argv[4];
      if (src && dest) {
        copy(src, dest);
      }
      break;
  }
} else {
  console.log('缺少操作命令类型');
}
