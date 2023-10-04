import {
  BlockSchema,
  ComponentDescription,
  ApiSchema,
  Dependencie
} from '../core';
import { compiled } from './template';
import { parser, Tokens } from './tokens';
import { tsFormatter, htmlFormatter, cssFormatter } from './formatters';
import { cloneDeep } from '../utils';

export { tsFormatter, htmlFormatter, cssFormatter };
export interface ICoderOptions {
  pages: BlockSchema[];
  blocks: BlockSchema[];
  apis: ApiSchema[];
  componentMap: Record<string, ComponentDescription>;
  packages: Dependencie[];
}

export interface ICoderError {
  dsl: BlockSchema;
  componentMap: Record<string, ComponentDescription>;
  packages: Dependencie[];
  tokens?: Tokens;
  source?: string;
  e?: any;
}

export async function vueCoder(
  dsl: BlockSchema,
  componentMap: Record<string, ComponentDescription>,
  packages: Dependencie[] = [],
  onError?: (e: ICoderError) => void
) {
  let tokens, source;
  try {
    tokens = parser(cloneDeep(dsl), componentMap, packages);
    source = compiled(tokens);
    return await htmlFormatter(`
  <template>
  ${tokens.template}
  </template>
  <script lang="ts">${await tsFormatter(source)}</script>
  <style lang="scss" scoped>${await cssFormatter(tokens.css)}</style>
 `);
  } catch (e) {
    if (onError) {
      onError({
        dsl,
        componentMap,
        packages,
        tokens,
        source,
        e
      });
    }
    return '';
  }
}

export async function coder(
  options: ICoderOptions,
  onError?: (e: ICoderError[]) => void
) {
  const {
    pages = [],
    blocks = [],
    componentMap = {},
    // todo: Apis
    apis = [],
    packages = []
  } = options;
  const errors: ICoderError[] = [];
  const vuePages: any[] = [];
  const vueBlocks: any[] = [];
  for (const file of pages) {
    vuePages.push({
      id: file.id as string,
      name: file.name,
      content: await vueCoder(file, componentMap, packages, (err) => {
        errors.push(err);
      })
    });
  }

  for (const file of blocks) {
    vueBlocks.push({
      id: file.id as string,
      name: file.name,
      content: await vueCoder(file, componentMap, packages, (err) => {
        errors.push(err);
      })
    });
  }

  if (onError && errors.length) {
    onError(errors);
  }
  return {
    pages: vuePages,
    blocks: vueBlocks,
    errors
  };
}
