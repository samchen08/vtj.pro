import path from 'node:path';
import { fileURLToPath } from 'node:url';
import minimist from 'minimist';
import { red } from 'kolorist';
import { emptyDirSync, pathExistsSync, ensureDirSync } from '@vtj/node';
import { createOptions, templates } from './options';
import { pkgFromUserAgent } from './utils';
import { createLibrary, createApp } from './generator';
const cwd = process.cwd();
const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ['_'] });

const argTemplate = argv.template || argv.t;
const defaultTargetDir = 'vtj-project';

function getTemplatePath(name: string) {
  return path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    'templates',
    name
  );
}

async function init() {
  if (argTemplate) {
    const match = templates.find((item) => item.name === argTemplate);
    if (!match) {
      console.log(
        `\n  ${red('Error:')} invalid template name "${argTemplate}"`
      );
      return;
    }
  }
  const options = await createOptions(defaultTargetDir, argTemplate);
  const templateName = argTemplate || options.template;
  const root = path.join(cwd, options.packageName);
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  if (pathExistsSync(root)) {
    if (options.overwrite) {
      emptyDirSync(root);
    }
  } else {
    ensureDirSync(root);
  }
  const templatePath = getTemplatePath(templateName);

  switch (templateName) {
    case 'library':
      createLibrary({
        name: options.packageName,
        template: templatePath,
        root
      });
      break;
    case 'app':
      createApp({
        name: options.packageName,
        template: templatePath,
        root
      });
      break;
  }

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn');
      console.log('  yarn dev');
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run dev`);
      break;
  }
  console.log();

  // console.log({
  //   root,
  //   options,
  //   templatePath,
  //   pkgManager
  // });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
