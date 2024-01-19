import { resolve } from 'path';
import { pathExistsSync, readJsonSync } from '@vtj/node';

export function getConfig(envPath: string, type: string): Record<string, any> {
  const defaults = resolve(envPath, 'env.json');
  const env = resolve(envPath, `env.${type}.json`);
  const defaultConfig = pathExistsSync(defaults) ? readJsonSync(defaults) : {};
  const envConfig = pathExistsSync(env) ? readJsonSync(env) : {};
  return Object.assign({}, defaultConfig, envConfig);
}
