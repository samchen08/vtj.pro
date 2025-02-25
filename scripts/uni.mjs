import pkg from 'fs-extra';
import { resolve } from 'path';
const { readdirSync } = pkg;

function getModuleStyle(name) {
  const dir = resolve(`node_modules/@dcloudio/${name}/style`);
  const files = readdirSync(dir);
  const result = [];
  for (const item of files) {
    if (item.includes('.css')) {
      result.push(`@use '@dcloudio/${name}/style/${item}';`);
    } else {
      const subFiles = readdirSync(dir + '/' + item);
      for (const file of subFiles) {
        result.push(`@use '@dcloudio/${name}/style/${item}/${file}';`);
      }
    }
  }
  return result;
}

// const dir2 = resolve('node_modules/@dcloudio/uni-components/style');

console.log(getModuleStyle('uni-h5').join('\n'));

console.log(getModuleStyle('uni-components').join('\n'));
