import type { UserConfig, ServerOptions, UserConfigExport } from 'vite';
import type {
  CreateViteConfigOptions,
  EnvConfig,
  ProxyConfig,
  EnvType
} from './types';
import { resolve } from 'path';
import { defaults } from './defaults';
import { createBuild } from './build';
import { mergePlugins } from './plugins';
import { getConfig } from './config';

export * from './types';

const createEnv = (type: string, envConfig: EnvConfig) => {
  return {
    'process.env': {
      ENV_TYPE: type,
      NODE_ENV: process.env.NODE_ENV,
      ...envConfig
    }
  };
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

const getWatchIgnored = (modules: string[]) => {
  return modules.map((name) => {
    return `'!**/node_modules/${name}/**'`;
  });
};

export function createViteConfig(
  options: CreateViteConfigOptions = {}
): UserConfigExport {
  const opts = Object.assign({}, defaults, options);

  const envType: EnvType = (process.env.ENV_TYPE || 'local') as EnvType;
  const envConfig = getConfig(opts.envPath || './', envType);
  const define = createEnv(envType, envConfig);

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

  const optimizeDeps = opts.uniapp
    ? {}
    : {
        force: !!opts.force,
        include: opts.optimizeDeps ? opts.optimizeDeps : undefined,
        exclude: opts.watchModules
      };

  const config: UserConfig = {
    base: opts.base,
    define,
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
