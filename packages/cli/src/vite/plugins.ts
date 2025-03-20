import type { CreateViteConfigOptions } from './types';
import { type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dts from 'vite-plugin-dts';
import vueDevTools from 'vite-plugin-vue-devtools';
import { visualizer } from 'rollup-plugin-visualizer';
import ElementPlus from 'unplugin-element-plus/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { removeSync, toArray } from '@vtj/node';
import { copyPlugin, type CopyPluginOption } from '../plugins/copy';
import { babelPlugin } from '../plugins/babel';
import { versionPlugin } from '../plugins/version';
import { staticPlugin } from '../plugins/static';
import { loadingPlugin } from '../plugins/loading';
import { envPlugin } from '../plugins/env';
import { reloadPlugin } from '../plugins/reload';
import { cdnPlugin } from '../plugins/cdn';

const createBabelPlugin = (targets: string[]) => {
  return babelPlugin({
    apply: 'build',
    babelConfig: {
      presets: [
        [
          '@babel/preset-env',
          { targets: targets, modules: false, useBuiltIns: false }
        ]
      ]
    }
  });
};

export const mergePlugins = (opts: CreateViteConfigOptions) => {
  const plugins: PluginOption[] = [
    envPlugin({ dir: opts.envPath }),
    vue(),
    vueJsx()
  ];

  if (opts.reload) {
    plugins.push(reloadPlugin());
  }

  if (opts.version) {
    plugins.push(versionPlugin());
  }

  if (opts.babel && opts.targets) {
    plugins.push(createBabelPlugin(toArray(opts.targets)));
  }

  if (opts.elementPlus) {
    plugins.push(
      ElementPlus(typeof opts.elementPlus === 'object' ? opts.elementPlus : {})
    );
  }

  if (opts.lib && opts.dts) {
    if (opts.dtsOutputDir) {
      try {
        removeSync(opts.dtsOutputDir);
      } catch (_e) {}
    }
    plugins.push(
      dts({
        outDir: opts.dtsOutputDir,
        staticImport: true,
        cleanVueFileName: true
      }) as PluginOption
    );
  }

  if (opts.https) {
    plugins.push(basicSsl() as PluginOption);
  }

  if (!opts.lib) {
    plugins.push(
      legacy({
        targets: opts.targets,
        polyfills: opts.polyfills,
        renderLegacyChunks: !!opts.legacy
      }) as PluginOption
    );
  }

  if (opts.visualizer) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      }) as any
    );
  }

  if (opts.staticDirs) {
    plugins.push(staticPlugin(opts.staticDirs));
    if (opts.copyStatic) {
      const copyOptions: CopyPluginOption[] = opts.staticDirs.map((n) => {
        return typeof n === 'string'
          ? { from: n, to: '/' }
          : { from: n.dir, to: n.path };
      });
      plugins.push(copyPlugin(copyOptions));
    }
  }

  if (opts.loading) {
    plugins.push(loadingPlugin());
  }

  if (opts.node) {
    plugins.push(nodePolyfills(typeof opts.node === 'object' ? opts.node : {}));
  }

  if (opts.devtools) {
    plugins.push(
      vueDevTools(
        typeof opts.devtools === 'object'
          ? opts.devtools
          : { componentInspector: false }
      )
    );
  }

  if (opts.cdn) {
    plugins.push(cdnPlugin(opts.cdn));
  }

  if (opts.buildEnd) {
    plugins.push({
      name: 'vtj-build-end-plugin',
      closeBundle() {
        opts.buildEnd && opts.buildEnd();
      }
    });
  }

  if (opts.plugins) {
    plugins.push(...opts.plugins);
  }

  return plugins;
};
