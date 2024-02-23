import { resolve, join } from 'path';
import fs from 'fs-extra';
import { upperFirst, camelCase } from 'lodash-es';
const { readdirSync, readFileSync, outputFileSync, emptydirSync } = fs;
const SRC_SVG_DIR_PATH = resolve('assets');
const files = readdirSync(SRC_SVG_DIR_PATH);

function upperFirstCamelCase(name) {
  return upperFirst(camelCase(name));
}

const imports = [];
const names = [];

for (const file of files) {
  const _name = file.split('.')[0];
  const name = upperFirstCamelCase(`icon-${_name}`);
  names.push(name);
  imports.push(`import ${name} from '../assets/${_name}.svg';`);

  let content = readFileSync(join(SRC_SVG_DIR_PATH, file), 'utf-8');
  // if (!content.includes('xmlns')) {
  //   content = content.replace(
  //     '<svg',
  //     '<svg xmlns="http://www.w3.org/2000/svg"'
  //   );
  //   outputFileSync(join(SRC_SVG_DIR_PATH, file), content, 'utf-8');
  //   console.log(`[WARN] ${file} has no fill color`);
  // }
}

const content = `/// <reference types="vite/client" />
${imports.join('\n')}
export {
    ${names.join(',\n  ')}
}
`;

outputFileSync(resolve('src/assets.ts'), content, 'utf-8');

console.log('assets build complete.');
