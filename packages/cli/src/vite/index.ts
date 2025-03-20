import type { UserConfig, ServerOptions, UserConfigExport } from 'vite';
import { type PluginOption } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import type {
  CreateViteConfigOptions,
  CreateUniappViteConfigOptions,
  CreatePluginViteConfigOptions,
  ProxyConfig
} from './types';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import {
  upperFirstCamelCase,
  pathExistsSync,
  copySync,
  removeSync,
  readJsonSync
} from '@vtj/node';
import { defaults } from './defaults';
import { createBuild } from './build';
import { mergePlugins } from './plugins';
import { envPlugin } from '../plugins/env';
export * from './types';

const createServer = (
  port: number = 9527,
  proxy?: ProxyConfig,
  https?: boolean,
  host?: string,
  open?: boolean
) => {
  return {
    open: open,
    cors: true,
    port,
    host: host || '0.0.0.0',
    proxy,
    https
  } as ServerOptions;
};

const getWatchIgnored = (modules: string[]) => {
  return modules.map((name) => {
    return `'!**/node_modules/${name}/**'`;
  });
};

export function createViteConfig(
  options: CreateViteConfigOptions = {}
): UserConfigExport {
  const opts = Object.assign({}, defaults, options);

  const alias = {
    '@': resolve('src'),
    ...opts.alias
  };

  const server = createServer(
    opts.port as number,
    opts.proxy,
    opts.https,
    opts.host,
    opts.open
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
    opts.host,
    opts.open
  );

  const plugins = mergePlugins(opts);
  const build = createBuild(opts);

  const optimizeDeps = {
    force: !!opts.force,
    include: opts.optimizeDeps ? opts.optimizeDeps : undefined,
    exclude: opts.watchModules
  };

  const config: UserConfig = {
    base: opts.base,
    resolve: {
      alias
    },
    server,
    preview,
    build,
    plugins,
    optimizeDeps,
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  };

  const userConfig = opts.defineConfig ? opts.defineConfig(config) : config;

  if (opts.debug) {
    console.log(JSON.stringify(userConfig, null, 2));
  }
  return userConfig;
}

export function createUniappViteConfig(
  options: CreateUniappViteConfigOptions = {}
): UserConfigExport {
  const opts = Object.assign(
    {
      outDir: 'dist/build/h5'
    },
    defaults,
    options
  );

  const alias = {
    '@': resolve('src'),
    'axios/lib/core/settle': resolve('node_modules/axios/lib/core/settle'),
    'axios/lib/helpers/buildURL': resolve(
      'node_modules/axios/lib/helpers/buildURL'
    ),
    ...opts.alias
  };

  const server = createServer(
    opts.port as number,
    opts.proxy,
    opts.https,
    opts.host,
    opts.open
  );

  const preview = createServer(
    opts.previewPort as number,
    opts.proxy,
    opts.https,
    opts.host,
    opts.open
  );

  const plugins: PluginOption[] = [envPlugin({ dir: opts.envPath })];

  if (opts.https) {
    plugins.push(basicSsl() as PluginOption);
  }

  if (opts.node) {
    plugins.push(nodePolyfills(typeof opts.node === 'object' ? opts.node : {}));
  }

  if (opts.plugins) {
    plugins.push(...opts.plugins);
  }

  if (opts.buildEnd) {
    plugins.push({
      name: 'vtj-build-end-plugin',
      buildStart(err: any) {
        opts.buildEnd && opts.buildEnd(err);
      }
    });
  }

  const config: UserConfig = {
    resolve: {
      alias
    },
    server,
    preview,
    plugins,
    build: {
      outDir: process.env.PREVIEW ? opts.outDir : undefined
    }
  };

  const userConfig = opts.defineConfig ? opts.defineConfig(config) : config;

  if (opts.debug) {
    console.log(JSON.stringify(userConfig, null, 2));
  }
  return userConfig;
}

export function createPluginViteConfig(
  options: CreatePluginViteConfigOptions = {}
) {
  const {
    style = 'style.css',
    outDir = 'dist',
    material = 'material.json',
    isUmd
  } = options;

  const pkg = readJsonSync(resolve('package.json'));

  const library = upperFirstCamelCase(pkg.name);

  const outputFileName = pkg.name.replace(/\//gi, '__');

  const buildEnd = () => {
    const stylePath = resolve(outDir, style);
    const materialPath = resolve('src', material);
    if (!isUmd) {
      removeSync(stylePath);
      return;
    }
    if (pathExistsSync(stylePath)) {
      copySync(stylePath, stylePath.replace(style, `${outputFileName}.css`));
    }

    if (pathExistsSync(materialPath)) {
      copySync(materialPath, resolve(outDir, `${outputFileName}.json`));
    }
    removeSync(stylePath);
  };

  const defaults = {
    copyPublicDir: false,
    exports: 'named',
    buildEnd,
    lib: true,
    dts: isUmd ? false : true,
    version: false,
    emptyOutDir: isUmd ? false : true,
    formats: isUmd ? ['umd'] : ['es'],
    buildTarget: 'es2015',
    library,
    libFileName: outputFileName,
    external: [
      'vue',
      'vue-router',
      '@vtj/icons',
      '@vtj/utils',
      '@vtj/ui',
      '@vtj/core',
      'element-plus',
      '@element-plus/icons-vue'
    ],
    externalGlobals: isUmd
      ? {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'VtjIcons',
          '@vtj/utils': 'VtjUtils',
          '@vtj/icons': 'VtjIcons',
          '@vtj/ui': 'VtjUI'
        }
      : undefined
  };

  return createViteConfig(Object.assign(defaults, options));
}
