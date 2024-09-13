import cdn from 'vite-plugin-cdn-import';
import { type Plugin } from 'vite';
import { readJsonSync } from '@vtj/node';
import { resolve } from 'path';

export interface CdnPluginOptions {
  /**
   * 依赖模块
   */
  modules: CdnPluginModule[];
  /**
   * cdn 文件路径
   */
  basePath: string;

  /**
   * 文件上传到cdn方法
   * @param modules
   * @returns
   */
  uploader?: (modules: CdnPluginModuleParsed[]) => Promise<void>;
}

export interface CdnPluginModule {
  /**
   * 依赖包名
   */
  name: string;
  /**
   * 导出变量名
   */
  var: string;
  /**
   * 本地文件相对路径
   */
  path: string;
}

export interface CdnPluginModuleParsed extends CdnPluginModule {
  version: string;
  cdn: string;
}

export function cdnPlugin(options: CdnPluginOptions): Plugin[] {
  const { modules, basePath } = options;

  const modulesParsed: CdnPluginModuleParsed[] = modules.map((item) => {
    const pkg = readJsonSync(resolve(`node_modules/${item.name}/package.json`));
    return {
      ...item,
      version: pkg.version,
      cdn: `${basePath}${item.name}/${pkg.version}/${item.path}`
    };
  });

  const cdnModules = modulesParsed.map((n) => {
    return {
      name: n.name,
      var: n.var,
      path: n.cdn
    };
  });

  return [
    ...cdn({
      modules: cdnModules
    }),
    {
      name: 'vtj-cdn-uploader',
      apply: 'build',
      async buildEnd() {
        if (options.uploader) {
          await options.uploader(modulesParsed);
        }
      }
    }
  ];
}
