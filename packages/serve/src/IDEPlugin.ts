import { Plugin, UserConfig } from 'vite';
import { join } from 'path';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import { controllers, ApiRequest } from './server';
import fs from 'fs-extra';
let __config: UserConfig | null = null;
const API_PATH = '/vtj/base';
const IDE_CONFIG_PATH = '/vtj.json';
const { readJSONSync, copySync, existsSync, emptyDirSync } = fs;

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
      name: name,
      base,
      mode: 'hash',
      page: '/page',
      preview: '/preview',
      home: '/',
      ...(vtj.project || {})
    },
    ide: build
      ? null
      : {
          path: '/ide/',
          ...(vtj.ide || {})
        }
  };
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
            res.end(JSON.stringify(options));
          } else {
            next();
          }
        });
        console.log('-----------------');
        console.log('| IDE服务已启动 |');
        console.log('-----------------');
      },
      transformIndexHtml(html) {
        const options = getProviderOptions(__config || {});
        const content = `<script>
        window.__VTJ_PROVIDER_OPTIONS__ = ${JSON.stringify(options)};
        </script>`;
        return html.replace(/<\/head>/, `${content}</head>`);
      }
    },
    {
      name: 'vtj-ide-build',
      apply: 'build',
      transformIndexHtml(html) {
        // 编译打包排除IDE
        const options = getProviderOptions(__config || {}, true);
        const content = `<script>
        window.__VTJ_PROVIDER_OPTIONS__ = ${JSON.stringify(options)};
        </script>`;
        return html.replace(/<\/head>/, `${content}</head>`);
      }
    }
  ];
}
