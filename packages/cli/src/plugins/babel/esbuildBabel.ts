import babel, { type TransformOptions } from '@babel/core';
import type { Loader, Plugin, OnLoadArgs, OnLoadResult } from 'esbuild';
import fs from 'fs';
import path from 'path';

/**
 * Original: https://github.com/nativew/esbuild-plugin-babel
 * Copied, because there was a problem with `type: "module"` in `package.json`
 */
export interface ESBuildPluginBabelOptions {
  config?: TransformOptions;
  filter?: RegExp;
  namespace?: string;
  loader?: Loader | ((path: string) => Loader);
}

export const esbuildPluginBabel = (
  options: ESBuildPluginBabelOptions = {}
): Plugin => ({
  name: 'babel',

  setup(build) {
    const { filter = /.*/, namespace = '', config = {}, loader } = options;

    const resolveLoader = (args: OnLoadArgs): Loader | undefined => {
      if (typeof loader === 'function') {
        return loader(args.path);
      }
      return loader;
    };

    const transformContents = async (
      args: OnLoadArgs,
      contents: string
    ): Promise<OnLoadResult> => {
      const babelOptions = babel.loadOptions({
        filename: args.path,
        ...config,
        caller: {
          name: 'esbuild-plugin-babel',
          supportsStaticESM: true
        }
      }) as TransformOptions;

      if (!babelOptions) {
        return { contents, loader: resolveLoader(args) };
      }

      if (babelOptions.sourceMaps) {
        babelOptions.sourceFileName = path.relative(process.cwd(), args.path);
      }

      return new Promise((resolve, reject) => {
        babel.transform(contents, babelOptions, (error, result) => {
          error
            ? reject(error)
            : resolve({
                contents: result?.code ?? '',
                loader: resolveLoader(args)
              });
        });
      });
    };

    build.onLoad({ filter, namespace }, async (args) => {
      const contents = await fs.promises.readFile(args.path, 'utf8');

      return transformContents(args, contents);
    });
  }
});
