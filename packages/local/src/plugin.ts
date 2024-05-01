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

export interface DevToolsOptions {
  baseURL: string;
  copy: boolean;
  server: boolean;
  staticBase: string;
  staticDir: string;
  link: boolean | string;
  linkOptions: LinkOptions | null;
  vtjDir: string;
  packagesDir: string;
  devMode: boolean;
  uploader: string;
  packageName: string;
  nodeModulesDir: string;
  hm?: string;
}

export interface LinkOptions {
  entry?: string;
  href?: string;
  serveOnly?: boolean;
}

const setApis = (
  server: ViteDevServer | PreviewServer,
  options: DevToolsOptions
) => {
  server.middlewares.use(
    bodyParser.json({ type: 'application/json', limit: '50000kb' })
  );
  server.middlewares.use(async (req, res, next) => {
    const reqUrl = req.url || '';
    if (reqUrl.startsWith(options.baseURL)) {
      const data = await router(req, options);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else {
      next();
    }
  });
};

const apiServerPlugin = function (options: DevToolsOptions): Plugin {
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

const linkPlugin = function (options: DevToolsOptions): Plugin {
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
          typeof options.link === 'string'
            ? options.link
            : `${options.packageName}/link.js`;
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

const hmPlugin = function (options: DevToolsOptions): Plugin {
  const { hm } = options;
  return {
    name: 'vtj-hm-plugin',
    transformIndexHtml(html) {
      return html.replace(
        /<\/body>/,
        `
        <script>
        (function () {
          window._hmt = window._hmt || [];
          const hm = document.createElement('script');
          hm.src = 'https://hm.baidu.com/hm.js?${hm}';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(hm, s);
        })();       
        </script>
        `
      );
    }
  };
};

const aliasPlugin = function (options: DevToolsOptions): Plugin {
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
              '@vtj/icons/svg': join(packagesDir, 'icons/dist/svg.ts'),
              '@vtj/icons': join(packagesDir, 'icons/src'),
              '@vtj/ui': join(packagesDir, 'ui/src'),
              '@vtj/charts': join(packagesDir, 'charts/src'),
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

export function createDevTools(options: Partial<DevToolsOptions> = {}) {
  const opts: DevToolsOptions = {
    baseURL: '/vtj/local/repository',
    copy: true,
    server: true,
    staticBase: '/',
    staticDir: 'public',
    link: true,
    linkOptions: null,
    vtjDir: '.vtj',
    packagesDir: '../../packages',
    devMode: false,
    uploader: '/uploader.json',
    packageName: '@vtj/pro',
    nodeModulesDir: 'node_modules',
    hm: '42f2469b4aa27c3f8978f634c0c19d24',
    ...options
  };
  const plugins: Plugin[] = [aliasPlugin(opts)];
  const proPath = `${opts.nodeModulesDir}/${opts.packageName}/dist`;
  const materialsPath1 = `${opts.nodeModulesDir}/@vtj/materials/dist`;
  const materialsPath2 = `${opts.nodeModulesDir}/${opts.packageName}/${materialsPath1}`;

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
        path: `${opts.staticBase}${opts.packageName}`,
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

  if (opts.hm) {
    plugins.push(hmPlugin(opts));
  }
  return plugins;
}
