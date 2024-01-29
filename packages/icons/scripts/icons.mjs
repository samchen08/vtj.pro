import { resolve } from 'path';
import fs from 'fs-extra';
import { upperFirst, camelCase } from 'lodash-es';
const { readJSONSync } = fs;
const OUTPUT_PATH = resolve('src/icons.ts');
const SRC_FILE_PATH = resolve('src/iconfont/iconfont.json');

const toComponentName = (name) => {
  return upperFirst(camelCase(name));
};

const json = readJSONSync(SRC_FILE_PATH, 'utf-8');
const icons = json.glyphs || [];

const comments = [];
const content = [`import { createIconComponent } from './utils';`];

for (const item of icons) {
  const className = `vtj-icon-${item.font_class}`;
  const name = toComponentName(className);
  comments.push(name);
  content.push(
    `export const ${name} = createIconComponent('${name}', '${className}');`
  );
}

content.push(`
/**
 * ${comments.join(', ')} 
 */
`);

fs.writeFileSync(OUTPUT_PATH, content.join('\n'), 'utf-8');

console.log('create icons.ts success!');
