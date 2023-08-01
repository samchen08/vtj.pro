import { BlockSchema, ComponentDescription, ApiSchema } from '../core';
import { compiled } from './template';
import { parser, Tokens } from './tokens';
import { tsFormatter, htmlFormatter, cssFormatter } from './formatters';

export interface ICoderOptions {
  pages: BlockSchema[];
  blocks: BlockSchema[];
  apis: ApiSchema[];
  componentMap: Record<string, ComponentDescription>;
}

export interface ICoderError {
  dsl: BlockSchema;
  componentMap: Record<string, ComponentDescription>;
  tokens?: Tokens;
  source?: string;
  e?: any;
}

function vueCoder(
  dsl: BlockSchema,
  componentMap: Record<string, ComponentDescription>,
  onError?: (e: ICoderError) => void
) {
  let tokens, source;
  try {
    tokens = parser(dsl, componentMap);
    source = compiled(tokens);
    return htmlFormatter(`
  <template>
  ${tokens.template}
  </template>
  <script lang="ts">${tsFormatter(source)}</script>
  <style lang="scss" scoped>${cssFormatter(tokens.css)}</style>
 `);
  } catch (e) {
    if (onError) {
      onError({
        dsl,
        componentMap,
        tokens,
        source,
        e
      });
    }
    return '';
  }
}

export function coder(
  options: ICoderOptions,
  onError?: (e: ICoderError[]) => void
) {
  const { pages = [], blocks = [], componentMap = {}, apis = [] } = options;
  const errors: ICoderError[] = [];
  const vuePages = pages.map((file) => {
    return {
      id: file.id as string,
      name: file.name,
      content: vueCoder(file, componentMap, (err) => {
        errors.push(err);
      })
    };
  });
  const vueBlocks = blocks.map((file) => {
    return {
      id: file.id as string,
      name: file.name,
      content: vueCoder(file, componentMap, (err) => {
        errors.push(err);
      })
    };
  });

  if (onError && errors.length) {
    onError(errors);
  }
  return {
    pages: vuePages,
    blocks: vueBlocks,
    errors
  };
}
