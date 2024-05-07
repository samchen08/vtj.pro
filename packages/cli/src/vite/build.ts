import type { CreateViteConfigOptions } from './types';
import externalGlobals from 'rollup-plugin-external-globals';
import type { BuildOptions, LibraryOptions } from 'vite';
import { resolve } from 'path';

const defaultManualChunks = (id: string) => {
  if (id.includes('node_modules')) {
    const arr = id.split('node_modules/');
    const dirs = arr[arr.length - 1].split('/');
    if (dirs[0] === '@vtj') {
      return `@vtj-${dirs[1]}`;
    }
    return dirs[0];
  }
};

const extMap: Record<string, string> = {
  es: '.mjs',
  cjs: '.cjs',
  umd: '.umd.js',
  iife: '.iife.js'
};

const createInput = (opts: CreateViteConfigOptions) => {
  if (!opts.pages) return undefined;
  const input: Record<string, string> = {};
  for (const [name, file] of Object.entries(opts.pages)) {
    input[name] = resolve(file);
  }
  return input;
};

export const createBuild = (opts: CreateViteConfigOptions) => {
  const rollupPlugins: any[] = opts.externalGlobals
    ? [externalGlobals(opts.externalGlobals)]
    : [];
  const manualChunks = opts.lib
    ? undefined
    : opts.manualChunks || defaultManualChunks;
  const buildTarget =
    typeof opts.buildTarget === 'undefined'
      ? opts.lib
        ? 'esnext'
        : 'es2015'
      : opts.buildTarget;
  const build: BuildOptions = {
    // plugin-legacy overrode 'build.target'.
    target: opts.legacy ? undefined : buildTarget,
    outDir: opts.outDir,
    emptyOutDir: opts.emptyOutDir,
    // 关闭可提高打包速度
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1024,
    copyPublicDir: opts.copyPublicDir,
    lib: opts.lib
      ? ({
          entry: opts.entry,
          name: opts.library,
          formats: opts.formats,
          fileName: (format) => {
            return opts.libFileName + extMap[format];
          }
        } as LibraryOptions)
      : false,
    rollupOptions: {
      external: opts.external,
      plugins: rollupPlugins,
      output: {
        manualChunks,
        exports: opts.exports || 'auto'
      },
      input: createInput(opts)
    }
  };

  return build;
};
