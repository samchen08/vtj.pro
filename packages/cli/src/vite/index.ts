import type { UserConfig, ServerOptions, UserConfigExport } from 'vite';
import { type PluginOption } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import type {
  CreateViteConfigOptions,
  CreateUniappViteConfigOptions,
  ProxyConfig
} from './types';
import { resolve } from 'path';
import { defaults } from './defaults';
import { createBuild } from './build';
import { mergePlugins } from './plugins';
import { envPlugin } from '../plugins/env';
export * from './types';

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
    optimizeDeps
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

  const server = createServer(
    opts.port as number,
    opts.proxy,
    opts.https,
    opts.host
  );

  const preview = createServer(
    opts.previewPort as number,
    opts.proxy,
    opts.https,
    opts.host
  );

  const plugins: PluginOption[] = [envPlugin({ dir: opts.envPath })];

  if (opts.https) {
    plugins.push(basicSsl() as PluginOption);
  }

  if (opts.plugins) {
    plugins.push(...opts.plugins);
  }

  const config: UserConfig = {
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
