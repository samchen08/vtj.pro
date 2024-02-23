import { resolve, join } from 'path';
import fs from 'fs-extra';
import { upperFirst, camelCase } from 'lodash-es';
import { parseString } from 'xml2js';
const { readdirSync, readFileSync, outputFileSync, emptydirSync } = fs;
const SRC_COMPONENETS_PATH = resolve('src/components');
const SRC_SVG_DIR_PATH = resolve('src/svg');
const TEMPLATE_PATH = resolve('src/template.tsx');
const files = readdirSync(SRC_SVG_DIR_PATH);
const template = readFileSync(TEMPLATE_PATH, 'utf-8');

function upperFirstCamelCase(name) {
  return upperFirst(camelCase(name));
}

const svgParser = async (svg) => {
  return new Promise((resolve, reject) => {
    parseString(svg, (err, result) => {
      if (err) {
        console.error(err);
        reject(null);
        return;
      }
      const paths = (result.svg?.path || []).map((n) => {
        return {
          path: n.$.d,
          color: n.$.fill || undefined
        };
      });
      resolve(paths);
    });
  });
};

const outputComponents = async (files) => {
  const exports = [];
  const regex = /^[A-Z]+/;
  for (let file of files) {
    const _name = file.split('.')[0];
    const name = upperFirstCamelCase(
      regex.test(_name) ? _name : `icon-${_name}`
    );
    const filePath = join(SRC_SVG_DIR_PATH, file);
    const fileContent = readFileSync(filePath, 'utf-8');
    const paths = await svgParser(fileContent).catch((e) => {
      console.log('svgParser error', file, e);
      return null;
    });
    if (!paths) continue;
    const content = template
      .replace(/__name__/g, name)
      .replace("['__paths__']", JSON.stringify(paths, null, 2));
    const output = join(SRC_COMPONENETS_PATH, `${name}.tsx`);
    outputFileSync(output, content, 'utf-8');
    exports.push(`export * from './${name}';`);
  }
  return exports;
};

const init = async () => {
  emptydirSync(SRC_COMPONENETS_PATH);
  outputFileSync(
    join(SRC_COMPONENETS_PATH, `index.ts`),
    (await outputComponents(files)).join('\n'),
    'utf-8'
  );
  console.log('svg to vue complete.');
};

init();
