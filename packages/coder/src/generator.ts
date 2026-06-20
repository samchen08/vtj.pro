import {
  type BlockSchema,
  type MaterialDescription,
  type Dependencie,
  type PageFile,
  type PlatformType
} from '@vtj/core';
import { cloneDeep } from '@vtj/base';
import {
  tsFormatter,
  // htmlFormatter,
  cssFormatter,
  vueFormatter
} from './formatters';
import { Collecter } from './collecter';
import { parser } from './parser';
import { parserComposition } from './parser/composition';
import { scriptCompiled, scriptSetupCompiled, vueCompiled } from './templates';

/**
 * 代码生成器 处理过程：
 * 1. Generator 读取 dsl、componentMap、dependencies
 * 2. Collecter 预处理收集信息
 * 3. Parser 解析 dsl，提取 token
 * 4. Compiled token 注入模板生成代码文件字符串
 */

export interface GeneratorOptions {
  dsl: BlockSchema;
  componentMap?: Map<string, MaterialDescription>;
  dependencies?: Dependencie[];
  platform?: PlatformType;
  formatterDisabled?: boolean;
  ts?: boolean;
  scss?: boolean;
}

export async function generator(
  _dsl: BlockSchema | GeneratorOptions,
  _componentMap: Map<string, MaterialDescription> = new Map(),
  _dependencies: Dependencie[] = [],
  _platform: PlatformType = 'web',
  _formatterDisabled?: boolean
) {
  const maybeOptions: any = _dsl;
  const options: GeneratorOptions =
    typeof maybeOptions.dsl === 'object' && arguments.length === 1
      ? maybeOptions
      : {
          dsl: _dsl,
          componentMap: _componentMap,
          dependencies: _dependencies,
          platform: _platform,
          formatterDisabled: _formatterDisabled
        };
  const {
    dsl,
    componentMap = new Map(),
    dependencies = [],
    platform = 'web',
    formatterDisabled = false,
    ts = true,
    scss = false
  } = options;
  const collecter = new Collecter(cloneDeep(dsl), dependencies);
  const isComposition = dsl.apiMode === 'composition';
  let template: string;
  let css: string;
  let style: string;
  let scriptSource: string;

  if (isComposition) {
    const token = parserComposition(collecter, componentMap, platform);
    scriptSource = scriptSetupCompiled(token);
    template = token.template || `\n<!--组件模版内容-->\n`;
    css = token.css;
    style = token.style;
  } else {
    const token = parser(collecter, componentMap, platform);
    scriptSource = scriptCompiled(token);
    template = token.template || `\n<!--组件模版内容-->\n`;
    css = token.css;
    style = token.style;
  }

  const vue = vueCompiled({
    template,
    css:
      (await cssFormatter(css, formatterDisabled)) || `\n/* 组件样式内容 */\n`,
    script: await tsFormatter(scriptSource, formatterDisabled),
    style: await cssFormatter(style, formatterDisabled),
    scriptLang: ts ? 'ts' : 'js',
    styleLang: scss ? 'scss' : 'css',
    scriptSetup: isComposition
  });
  return await vueFormatter(vue, formatterDisabled).catch((e) => {
    e.content = vue;
    return Promise.reject(e);
  });
}

export async function createEmptyPage(file: PageFile) {
  const content = `
    <template>
      <div>
        <h3>源码模式页面</h3>
        <div>文件路径：/.vtj/vue/${file.id}.vue</div>
      </div>
    </template>
    <script lang="ts" setup>
    </script>
    <style scoped lang="scss">
    </style>
  `;
  return await vueFormatter(content);
}
