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
import { scriptCompiled, vueCompiled } from './templates';

/**
 * 代码生成器 处理过程：
 * 1. Generator 读取 dsl、componentMap、dependencies
 * 2. Collecter 预处理收集信息
 * 3. Parser 解析 dsl，提取 token
 * 4. Compiled token 注入模板生成代码文件字符串
 */

export async function generator(
  dsl: BlockSchema,
  componentMap: Map<string, MaterialDescription> = new Map(),
  dependencies: Dependencie[] = [],
  platform: PlatformType = 'web',
  formatterDisabled?: boolean
) {
  const collecter = new Collecter(cloneDeep(dsl), dependencies);
  const token = parser(collecter, componentMap, platform);
  const script = scriptCompiled(token);
  const vue = vueCompiled({
    template: token.template,
    css: await cssFormatter(token.css, formatterDisabled),
    script: await tsFormatter(script, formatterDisabled),
    style: await cssFormatter(token.style, formatterDisabled)
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
