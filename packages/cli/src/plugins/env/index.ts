import { type Plugin } from 'vite';
import { resolve } from 'path';
import { pathExistsSync, readJsonSync } from '@vtj/node';
import { type EnvType, type EnvConfig } from '../../vite/types';

export function getConfig(envPath: string, type: string): Record<string, any> {
  const defaults = resolve(envPath, 'env.json');
  const env = resolve(envPath, `env.${type}.json`);
  const defaultConfig = pathExistsSync(defaults) ? readJsonSync(defaults) : {};
  const envConfig = pathExistsSync(env) ? readJsonSync(env) : {};
  return Object.assign({}, defaultConfig, envConfig);
}

const createEnv = (type: string, envConfig: EnvConfig) => {
  return {
    'process.env': {
      ENV_TYPE: type,
      NODE_ENV: process.env.NODE_ENV,
      ...envConfig
    }
  };
};

export interface EnvPluginOptions {
  dir?: string;
}

export function envPlugin(options: EnvPluginOptions = {}): Plugin {
  const { dir = './' } = options;

  return {
    name: 'vtj-env-plugin',
    config: () => {
      const envType: EnvType = (process.env.ENV_TYPE || 'local') as EnvType;
      const envConfig = getConfig(dir, envType);
      const define = createEnv(envType, envConfig);
      return {
        define
      };
    }
  };
}
