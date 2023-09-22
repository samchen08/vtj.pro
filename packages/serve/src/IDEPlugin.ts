import { Plugin, UserConfig } from 'vite';
import { join } from 'path';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import { controllers, ApiRequest, success } from './server';
import { tsFormatter } from '@vtj/engine/shared';
import fs from 'fs-extra';
import { upperFirstCamelCase } from '@vtj/utils';
let __config: UserConfig | null = null;
const API_PATH = '/vtj/base';
const IDE_CONFIG_PATH = '/vtj.json';
const {
  readJSONSync,
  copySync,
  existsSync,
  emptyDirSync,
  ensureDirSync,
  writeFileSync
} = fs;

const router = async (req: any) => {
  const body: ApiRequest = req.body || {};
  const handler = (controllers as any)[body.type] || controllers.notMatch;
  return await handler(body);
};

const copyLibs = () => {
  const { root = process.cwd() } = __config || {};
  const libsPath = join(root, 'node_modules/@vtj/ide/dist/ide/libs');
  if (existsSync(libsPath)) {
    const target = join(root, 'public/libs');
    emptyDirSync(target);
    copySync(libsPath, target);
  }
};

const getProviderOptions = (config: UserConfig, build?: boolean) => {
  const root = process.cwd();
  const pkg = readJSONSync(join(root, 'package.json'));
  const { name, vtj = {} } = pkg || {};
  const { base = '/' } = config || {};
  return {
    service: vtj.service || 'file',
    raw: !!vtj.raw,
    project: {
      id: name,
      name: upperFirstCamelCase(name),
      base,
      mode: 'hash',
      page: '/page',
      preview: '/preview',
      home: '/',
      ...(vtj.project || {})
    },
    debug: !!vtj.debug,
    ide: build
      ? null
      : {
          path: '/ide/',
          ...(vtj.ide || {})
        }
  };
};

const writeVtjOptionsContent = (options: any, build?: boolean) => {
  const modules = ['/.vtj/project/*.json'];
  if (options.raw) {
    if (!build) {
      modules.push(
        '/.vtj/file/*.json',
        '/src/views/pages/*.vue',
        '/src/components/blocks/*.vue'
      );
    } else {
      modules.push('/src/views/pages/*.vue', '/src/components/blocks/*.vue');
    }
  } else {
    modules.push('/.vtj/file/*.json');
  }
  const ide = options.ide ? JSON.stringify(options.ide) : 'null';
  const content = `
  /// <reference types="vite/client" />
  const modules = import.meta.glob(${JSON.stringify(modules)});
  export default {
    modules,
    service: '${options.service}',
    raw: ${options.raw},
    isProd: process.env.NODE_ENV === 'production',
    project: {
      id: '${options.project.id}',
      name: '${options.project.name}',
      base: '${options.project.base}',
      mode: '${options.project.mode}',
      page: '${options.project.page}',
      preview: '${options.project.preview}',
      home: '${options.project.home}',
    },
    ide: ${ide}
  };
  `;

  const DIR_PATH = join(process.cwd(), '.vtj');
  if (!existsSync(DIR_PATH)) {
    ensureDirSync(DIR_PATH);
  }
  const filePath = join(DIR_PATH, 'index.ts');
  writeFileSync(filePath, tsFormatter(content), 'utf-8');
};

export function IDEPlugin(): Plugin[] {
  return [
    {
      name: 'vtj-ide-copy',
      buildStart() {
        copyLibs();
      }
    },
    {
      name: 'vtj-ide-dev',
      apply: 'serve',
      config(config) {
        __config = config;
        return config;
      },
      // 开发服务器启动后，启动ide 本地接口服务
      configureServer(server) {
        const { root = process.cwd() } = __config || {};
        const idePath = join(root, 'node_modules/@vtj/ide/dist');
        server.middlewares.use(serveStatic(idePath));
        server.middlewares.use(
          bodyParser.json({ type: 'application/json', limit: '50000kb' })
        );
        server.middlewares.use(async (req, res, next) => {
          const reqUrl = req.url || '';
          if (reqUrl.startsWith(API_PATH)) {
            const result = await router(req);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } else if (reqUrl.endsWith(IDE_CONFIG_PATH)) {
            const options = getProviderOptions(__config || {});
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(success(options)));
          } else {
            next();
          }
        });
        console.log('-----------------');
        console.log('| IDE服务已启动 |');
        console.log('-----------------');
      }
    },
    {
      name: 'vtj-ide-config',
      configResolved(resolvedConfig) {
        const isBuild = resolvedConfig.command === 'build';
        const options = getProviderOptions(__config || {}, isBuild);
        writeVtjOptionsContent(options, isBuild);
      },
      config(config) {
        const { root = process.cwd() } = config || {};
        const vtjDir = join(root, '.vtj');
        if (config.resolve) {
          config.resolve.alias = Object.assign(config.resolve?.alias || {}, {
            '.vtj': vtjDir
          });
        } else {
          config.resolve = {
            alias: {
              '.vtj': vtjDir
            }
          };
        }
        return config;
      }
    }
  ];
}
