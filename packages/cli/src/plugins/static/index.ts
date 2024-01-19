import { type Plugin } from 'vite';
import { resolve } from 'path';
import serveStatic from 'serve-static';

export interface StaticPluginOption {
  path: string;
  dir: string;
}

export function staticPlugin(
  options: Array<string | StaticPluginOption> = []
): Plugin {
  const opts = options.map((item) => {
    return typeof item === 'string' ? { path: '/', dir: item } : item;
  });
  return {
    name: 'vtj-static-server',
    configureServer(server) {
      for (let option of opts) {
        server.middlewares.use(option.path, serveStatic(resolve(option.dir)));
      }
    },
    configurePreviewServer(server) {
      for (let option of opts) {
        server.middlewares.use(option.path, serveStatic(resolve(option.dir)));
      }
    }
  };
}
