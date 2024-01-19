import {
  type Plugin,
  type ResolvedConfig,
  type ViteDevServer,
  type PreviewServer
} from 'vite';
import {
  copyPlugin,
  staticPlugin,
  type CopyPluginOption,
  type StaticPluginOption
} from '@vtj/cli';
import { pathExistsSync } from '@vtj/node';
import { join } from 'path';
import bodyParser from 'body-parser';
import { router } from './controller';

export interface DevPluginOptions {
  baseURL: string;
  copy: boolean;
  server: boolean;
  staticBase: string;
  link: boolean | string;
  linkOptions: LinkOptions | null;
  vtjDir: string;
  packagesDir: string;
  devMode: boolean;
}

export interface LinkOptions {
  entry?: string;
  href?: string;
  serveOnly?: boolean;
}

const setApis = (
  server: ViteDevServer | PreviewServer,
  options: DevPluginOptions
) => {
  server.middlewares.use(
    bodyParser.json({ type: 'application/json', limit: '50000kb' })
  );
  server.middlewares.use(async (req, res, next) => {
    const reqUrl = req.url || '';
    if (reqUrl.startsWith(options.baseURL)) {
      const data = await router(req);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else {
      next();
    }
  });
};

const apiServerPlugin = function (options: DevPluginOptions): Plugin {
  return {
    name: 'vtj-api-plugin',
    apply: 'serve',
    configureServer(server) {
      setApis(server, options);
    },
    configurePreviewServer(server) {
      return () => {
        setApis(server, options);
      };
    }
  };
};

const linkPlugin = function (options: DevPluginOptions): Plugin {
  const {
    entry = '/index.html',
    href = '',
    serveOnly = true
  } = options.linkOptions || {};
  let config: ResolvedConfig;
  return {
    name: 'vtj-link-plugin',
    apply: serveOnly ? 'serve' : undefined,
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml(html, ctx) {
      if (html.includes('VTJ-LINK')) {
        return html;
      }
      if (options.link) {
        if (ctx.path !== entry) {
          return html;
        }
        const link =
          typeof options.link === 'string' ? options.link : '@vtj/pro/link.js';
        const url = `${config.base}${link}`;
        return html.replace(
          /<\/body>/,
          `
          <script>window.__VTJ_LINK__ = { href: '${href}' }</script>
          <script src="${url}"></script></body>
          `
        );
      }
      return html;
    }
  };
};

const aliasPlugin = function (options: DevPluginOptions): Plugin {
  return {
    name: 'vtj-alias-plugin',
    config(config) {
      const { root = process.cwd() } = config || {};
      const vtjDir = join(root, options.vtjDir);
      const packagesDir = join(root, options.packagesDir);
      const devAlias: Record<string, string> =
        options.devMode && process.env.NODE_ENV === 'development'
          ? {
              '@vtj/ui/dist/style.css': join(
                packagesDir,
                'ui/src/style/index.scss'
              ),
              '@vtj/icons/dist/style.css': join(
                packagesDir,
                'icons/src/style.scss'
              ),
              '@vtj/designer/dist/style.css': join(
                packagesDir,
                'designer/src/style/index.scss'
              ),
              '@vtj/base': join(packagesDir, 'base/src'),
              '@vtj/utils': join(packagesDir, 'utils/src/index.ts'),
              '@vtj/icons': join(packagesDir, 'icons/src'),
              '@vtj/ui': join(packagesDir, 'ui/src'),
              '@vtj/core': join(packagesDir, 'core/src'),
              '@vtj/designer': join(packagesDir, 'designer/src'),
              '@vtj/renderer': join(packagesDir, 'renderer/src'),
              '@vtj/coder': join(packagesDir, 'coder/src')
            }
          : {};
      if (config.resolve) {
        config.resolve.alias = Object.assign(config.resolve.alias || {}, {
          $vtj: vtjDir,
          ...devAlias
        });
      } else {
        config.resolve = {
          alias: {
            $vtj: vtjDir,
            ...devAlias
          }
        };
      }
    }
  };
};

export function createDevPlugin(options: Partial<DevPluginOptions> = {}) {
  const opts: DevPluginOptions = {
    baseURL: '/vtj/local/api',
    copy: true,
    server: true,
    staticBase: '/',
    link: true,
    linkOptions: null,
    vtjDir: '.vtj',
    packagesDir: '../../packages',
    devMode: false,
    ...options
  };
  const plugins: Plugin[] = [aliasPlugin(opts)];
  const proPath = 'node_modules/@vtj/pro/dist';
  const materialsPath1 = 'node_modules/@vtj/materials/dist';
  const materialsPath2 = 'node_modules/@vtj/pro/' + materialsPath1;

  // 复制物料目录
  if (opts.copy) {
    const copyOptions: CopyPluginOption[] = [];
    if (pathExistsSync(materialsPath1)) {
      copyOptions.push({
        from: materialsPath1,
        to: '@vtj/materials',
        emptyDir: true
      });
    } else if (pathExistsSync(materialsPath2)) {
      copyOptions.push({
        from: materialsPath2,
        to: '@vtj/materials',
        emptyDir: true
      });
    } else {
      console.warn(
        '\n @vtj/materials is not installed, please install it first.\n'
      );
    }
    if (copyOptions.length > 0) {
      plugins.push(copyPlugin(copyOptions));
    }
  }

  // 本地开发服务
  if (opts.server) {
    // api 服务
    plugins.push(apiServerPlugin(opts));
    // 静态资源服务
    const staticOptions: StaticPluginOption[] = [];

    if (pathExistsSync(proPath)) {
      staticOptions.push({
        path: `${opts.staticBase}@vtj/pro`,
        dir: proPath
      });
    }

    if (pathExistsSync(materialsPath1)) {
      staticOptions.push({
        path: `${opts.staticBase}@vtj/materials`,
        dir: materialsPath1
      });
    } else if (pathExistsSync(materialsPath2)) {
      staticOptions.push({
        path: `${opts.staticBase}@vtj/materials`,
        dir: materialsPath2
      });
    } else {
      console.warn(
        '\n @vtj/materials is not installed, please install it first.\n'
      );
    }

    if (staticOptions.length > 0) {
      plugins.push(staticPlugin(staticOptions));
    }
  }

  // 链接插件
  if (!!opts.link) {
    plugins.push(linkPlugin(opts));
  }
  return plugins;
}
