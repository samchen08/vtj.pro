import fs from 'node:fs';
import prompts from 'prompts';
import { isValidPackageName, formatTargetDir, isEmpty } from './utils';

import { cyan, green, magenta, red, reset, lightRed, yellow } from 'kolorist';

export interface ITemplate {
  name: string;
  display: string;
  color: (str: string | number) => string;
}

export const templates: ITemplate[] = [
  {
    name: 'app',
    display: 'Web应用( app )',
    color: green
  },
  {
    name: 'h5',
    display: 'H5应用( h5 )',
    color: yellow
  },
  {
    name: 'plugin',
    display: '低代码区块插件( plugin )',
    color: lightRed
  },
  {
    name: 'uniapp',
    display: '移动端应用( uniapp )',
    color: cyan
  },
  {
    name: 'material',
    display: '物料开发项目( material )',
    color: lightRed
  },
  {
    name: 'extension',
    display: '设计器扩展开发项目( extension )',
    color: lightRed
  },
  // {
  //   name: 'nest',
  //   display: '服务端应用( nest )',
  //   color: lightRed
  // },
  // {
  //   name: 'electron',
  //   display: '桌面应用( electron )',
  //   color: yellow
  // },
  {
    name: 'library',
    display: '通用类库( library )',
    color: magenta
  }
];

export async function createOptions(
  defaultTargetDir: string,
  templateName: string = ''
) {
  let targetDir: string = defaultTargetDir;
  let result: prompts.Answers<'template' | 'packageName' | 'overwrite'>;

  result = await prompts(
    [
      {
        type: templateName ? null : 'select',
        name: 'template',
        message: reset('请选择项目模板:'),
        initial: 0,
        choices: templates.map((template) => {
          return {
            title: template.color(template.display || template.name),
            value: template.name
          };
        })
      },
      {
        type: 'text',
        name: 'packageName',
        message: reset('项目包名:'),
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir;
        },
        validate: (dir) => isValidPackageName(dir) || '项目包名不合法，请更换！'
      },
      {
        type: () =>
          !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
        name: 'overwrite',
        message: () =>
          (targetDir === '.' ? '当前目录' : `目标目录 "${targetDir}"`) +
          ` 不是一个空的文件夹，是否清空文件并继续创建？`
      }
    ],
    {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled');
      }
    }
  );

  return result;
}
