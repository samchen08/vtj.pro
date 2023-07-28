import { createViteConfig } from '@vtj/cli';
import { IDEPlugin } from '@vtj/serve';
import * as EnvConfig from './env.config';
import { resolve, join } from 'path';
import proxy from './proxy.config';
const ENV_TYPE = process.env.ENV_TYPE || 'local';
const packagesPath = resolve('../../packages');
const alias =
  ENV_TYPE === 'local'
    ? {
        // '@vtj/utils': join(packagesPath, 'utils/src/index.ts'),
        // '@vtj/ui/lib/style.css': join(packagesPath, 'ui/src/style/index.scss'),
        // '@vtj/engine/lib/style.css': join(
        //   packagesPath,
        //   'engine/src/style/index.scss'
        // ),
        // '@vtj/icons/lib/style.css': join(packagesPath, 'icons/src/style.scss'),
        // '@vtj/ui': join(packagesPath, 'ui/src'),
        // '@vtj/icons': join(packagesPath, 'icons/src'),
        // '@vtj/engine': join(packagesPath, 'engine/src'),
        '@vtj/runtime': join(packagesPath, 'runtime/src/main')
      }
    : undefined;

const isExample = ENV_TYPE === 'uat';

export default createViteConfig({
  base: './',
  host: '0.0.0.0',
  outDir: isExample ? 'example' : 'dist/ide',
  port: 9527,
  https: false,
  elementPlus: false,
  legacy: false,
  proxy,
  envConfig: EnvConfig,
  envType: ENV_TYPE,
  alias,
  plugins: [IDEPlugin()],
  defineConfig: (config) => {
    config.server.watch = {
      // ignored: ['**/.vtj/**']
    };
    return config;
  }
});
