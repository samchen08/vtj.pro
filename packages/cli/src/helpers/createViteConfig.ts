import type {
  UserConfig,
  UserConfigExport,
  PluginOption,
  ServerOptions,
  BuildOptions,
  LibraryOptions
} from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';
// import Components from 'unplugin-vue-components/vite';
// import {
//   ElementPlusResolver,
//   ElementPlusResolverOptions
// } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import dts from 'vite-plugin-dts';
import fs from 'fs-extra';
import babelPlugin from '../babel';

import { IOptions, EnvConfig, ProxyConfig, EnvType } from './types';

const defaults: IOptions = {
  base: '/',
  debug: false,
  emptyOutDir: true,
  port: 9527,
  previewPort: 3010,
  targets: ['chrome > 40'],
  dtsOutputDir: 'types',
  dtsCleanVueFileName: true,
  envType: 'local',
  lib: false,
  entry: 'src/index.ts',
  cdn: false,
  cdnDir: 'cdn',
  legacy: false,
  visualizer: false,
  elementPlus: true,
  polyfills: true,
  modernPolyfills: true,
  uniapp: false
};

const createEnv = (type: string, envConfig: EnvConfig) => {
  return {
    'process.env': {
      ENV_TYPE: type,
      ...process.env,
      ...envConfig
    }
  };
};

const defaultManualChunks = (id: string) => {
  if (id.includes('node_modules')) {
    return id.split('node_modules/')[1].split('/')[0].toString();
  }
};

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

const getWatchIgnored = (modules: string[]) => {
  return modules.map((name) => {
    return `'!**/node_modules/${name}/**'`;
  });
};

const createServer = (
  port: number = 9527,
  proxy?: ProxyConfig,
  https?: boolean,
  host?: string
) => {
  return {
    open: true,
    cors: true,
    port,
    host: host || '0.0.0.0',
    proxy,
    https
  } as ServerOptions;
};

const mergePlugins = (options: IOptions) => {
  const isUniapp = options.uniapp;
  const plugins: PluginOption[] = [
    isUniapp ? undefined : (vue() as PluginOption),
    isUniapp ? undefined : (vueJsx() as PluginOption)
  ];

  if (options.elementPlus && !isUniapp) {
    // const resolver: ElementPlusResolverOptions =
    //   typeof options.elementPlus === 'object'
    //     ? options.elementPlus
    //     : { importStyle: 'css', directives: true };
    // plugins.push(
    //   Components({
    //     resolvers: [ElementPlusResolver(resolver)]
    //   }) as any
    // );
    plugins.push(
      ElementPlus(
        typeof options.elementPlus === 'object' ? options.elementPlus : {}
      )
    );
  }

  if (options.babel && !isUniapp) {
    plugins.push(createBabelPlugin(options.targets as string[]));
  }

  if (options.dts && options.lib && !options.cdn && !isUniapp) {
    if (options.dtsOutputDir) {
      fs.removeSync(options.dtsOutputDir);
    }
    plugins.push(
      dts({
        // outputDir: options.dtsOutputDir,
        outDir: options.dtsOutputDir,
        staticImport: true,
        cleanVueFileName: options.dtsCleanVueFileName
        // skipDiagnostics: false
      }) as PluginOption
    );
  }

  if (!options.lib) {
    if (options.https) {
      plugins.push(basicSsl() as PluginOption);
    }
    if (!isUniapp) {
      plugins.push(
        legacy({
          targets: options.targets,
          polyfills: options.polyfills,
          modernPolyfills: options.modernPolyfills,
          renderLegacyChunks: options.legacy
        }) as PluginOption
      );
    }
  }
  if (options.visualizer) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      }) as any
    );
  }

  if (options.plugins) {
    plugins.push(...options.plugins);
  }
  return plugins;
};

export function createViteConfig(options: IOptions = {}): UserConfigExport {
  const opts: IOptions = Object.assign({}, defaults, options);
  const lib = opts.lib;
  const isUniapp = opts.uniapp;

  if (!opts.outDir && !isUniapp) {
    opts.outDir = lib ? 'lib' : 'dist';
  }

  if (!opts.manualChunks && !lib && !isUniapp) {
    opts.manualChunks = defaultManualChunks;
  }

  // lib 模式，默认输出 es（不转码） , cdn文件输出umd（转码）， 非lib模式，输出esnext(转码)
  // 自动设置 formats
  if (lib && !opts.formats) {
    opts.formats = opts.cdn ? ['umd'] : ['es'];
  }
  // 未设置fileName，自动设置
  if (lib && !opts.fileName) {
    if (opts.formats && opts.formats.length > 1) {
      opts.fileName = (format: string) => `index.${format}.js`;
    } else {
      opts.fileName = () => 'index.js';
    }
  }

  // 自动设置babel
  if (typeof opts.babel === 'undefined') {
    if (lib) {
      opts.babel = !!opts.cdn;
    } else {
      opts.babel = true;
    }
  }

  if (lib && typeof opts.dts === 'undefined') {
    opts.dts = !opts.cdn;
  }

  const server = createServer(
    opts.port as number,
    opts.proxy,
    opts.https,
    opts.host
  );

  if (opts.watchModules) {
    server.watch = {
      ignored: getWatchIgnored(opts.watchModules)
    };
  }

  const preview = createServer(
    opts.previewPort as number,
    opts.proxy,
    opts.https,
    opts.host
  );

  const alias = {
    '@': resolve('src'),
    '@vtj/mui': resolve('src/uni_modules/x-mui'),
    ...opts.alias
  };

  const optimizeDeps = isUniapp
    ? {}
    : {
        force: !!opts.force,
        include: opts.optimizeDeps ? opts.optimizeDeps : undefined,
        exclude: opts.watchModules
      };

  const define =
    opts.envConfig && opts.envType
      ? createEnv(
          opts.envType,
          opts.envConfig[opts.envType as EnvType] as EnvConfig
        )
      : undefined;

  const rollupPlugins = [];
  if (opts.cdn || (!opts.lib && opts.externalGlobals)) {
    rollupPlugins.push(externalGlobals(opts.externalGlobals || {}));
  }

  const build: BuildOptions = {
    // target: 'es2015',
    target: opts.libTarget ?? (opts.lib && !opts.cdn ? 'esnext' : 'es2015'),
    outDir: opts.cdn ? opts.cdnDir : opts.outDir,
    emptyOutDir: opts.emptyOutDir,
    // 关闭可提高打包速度
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1024,
    lib: opts.lib
      ? ({
          entry: opts.entry,
          name: opts.libraryName,
          formats: opts.formats,
          fileName: opts.fileName
        } as LibraryOptions)
      : false,
    rollupOptions: {
      external: opts.external,
      plugins: rollupPlugins,
      output: {
        manualChunks: opts.manualChunks
      }
    }
  };

  const plugins = mergePlugins(opts);

  const config: UserConfig = {
    base: opts.base,
    define,
    server,
    preview,
    resolve: {
      alias
    },
    optimizeDeps,
    plugins,
    build
  };

  const userConfig = opts.defineConfig ? opts.defineConfig(config) : config;
  if (opts.debug) {
    console.log(JSON.stringify(userConfig, null, 2));
  }

  return userConfig;
}
