import babel, { type TransformOptions } from '@babel/core';
import { type Loader } from 'esbuild';
import { type Plugin } from 'vite';

import { esbuildPluginBabel } from './esbuildBabel';

export interface BabelPluginOptions {
  apply?: 'serve' | 'build';
  babelConfig?: TransformOptions;
  filter?: RegExp;
  loader?: Loader | ((path: string) => Loader);
}

const DEFAULT_FILTER = /\.jsx?$/;

export const babelPlugin = ({
  babelConfig = {},
  filter = DEFAULT_FILTER,
  apply,
  loader
}: BabelPluginOptions = {}): Plugin => {
  return {
    name: 'babel-plugin',

    apply,
    enforce: 'pre',

    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              esbuildPluginBabel({
                config: { ...babelConfig },
                filter,
                loader
              })
            ]
          }
        }
      } as any;
    },

    transform(code, id) {
      const shouldTransform = filter.test(id);

      if (!shouldTransform) return;

      const { code: output, map } =
        babel.transformSync(code, {
          filename: id,
          ...babelConfig
        }) ?? {};

      return {
        code: output ?? '',
        map
      };
    }
  };
};

export * from './esbuildBabel';
