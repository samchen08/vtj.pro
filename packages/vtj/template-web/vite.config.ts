import { createViteConfig } from '@vtj/cli';
import { IDEPlugin } from '@vtj/serve';
import * as EnvConfig from './env.config';
import proxy from './proxy.config';

const ENV_TYPE = process.env.ENV_TYPE || 'local';

export default createViteConfig({
  debug: false,
  host: '0.0.0.0',
  https: false,
  elementPlus: true,
  legacy: false,
  proxy,
  envConfig: EnvConfig,
  envType: ENV_TYPE,
  plugins: [IDEPlugin()]

});
