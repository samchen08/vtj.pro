import type {
  UserConfig,
  UserConfigExport,
  ProxyOptions,
  PluginOption
} from 'vite';

import { type StaticPluginOption } from '../plugins/static';
import { type PolyfillOptions } from 'vite-plugin-node-polyfills';
import { type VitePluginVueDevToolsOptions } from 'vite-plugin-vue-devtools';
import { type CdnPluginOptions } from '../plugins/cdn';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    ENV_TYPE: 'local' | 'dev' | 'sit' | 'uat' | 'live';
  }
}

/**
 * 代理配置
 */
export type ProxyConfig = Record<string, string | ProxyOptions>;
/**
 * 环境变量配置
 */
export type EnvConfig = Record<string, any>;

/**
 * 环境类型
 */
export type EnvType = 'local' | 'dev' | 'sit' | 'uat' | 'pre' | 'live';

/**
 * createViteConfig函数参数
 */
export interface CreateViteConfigOptions {
  /**
   * 打印最终 vite.config
   */
  debug?: boolean;

  /**
   * 库模式
   */
  lib?: boolean;

  /**
   * 开发或生产环境服务的公共基础路径
   */
  base?: string;

  /**
   * 打包输出文件夹
   */
  outDir?: string;

  /**
   * 清空输出目录
   */
  emptyOutDir?: boolean;

  /**
   * 自定义配置 vite 配置
   */
  defineConfig?: (config: UserConfig) => UserConfigExport;

  /**
   * 开发端口
   */
  port?: number;

  /**
   * 预览端口
   */
  previewPort?: number;

  /**
   * 主机头
   */
  host?: string;

  /**
   * 开启https
   */
  https?: boolean;

  /**
   * 代理
   */
  proxy?: ProxyConfig;

  /**
   * 打开浏览器
   */
  open?: boolean;

  /**
   * Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。如果你需要对 node_modules/ 内的包进行监听
   */
  watchModules?: string[];

  /**
   * 别名
   */
  alias?: Record<string, string>;

  /**
   * 生成定义文件, 在库模式有效
   */
  dts?: boolean;

  /**
   * 定义文件输出文件夹
   */
  dtsOutputDir?: string;

  /**
   * 适配传统浏览器, 在非库模式下有效
   */
  legacy?: boolean;

  /**
   * 编译目标浏览器
   */
  targets?: string | string[];

  /**
   * 编译语法版本 esnext / es2015
   */
  buildTarget?: string;

  /**
   * 设置 polyfills，在非库模式下有效，默认为true
   */
  polyfills?: boolean | string[];

  /**
   *  lib 入口文件
   */
  entry?: string;

  /**
   * 不打包的依赖
   */
  external?: string[];

  /**
   * 从全局引用的依赖
   */
  externalGlobals?: Record<string, string>;

  /**
   * 库模式在umd文件导出变量名称
   */
  library?: string;

  /**
   * 库模式输入格式
   */
  formats?: string[];

  /**
   * 库模式编译输出文件名
   */
  libFileName?: string;

  /**
   * 自定义 chunk name, 在库模式无效
   */
  manualChunks?: (id: string) => string | void;

  /**
   * 强制更新依赖
   */
  force?: boolean;

  /**
   * 预构建依赖
   */
  optimizeDeps?: string[];

  /**
   * 生成报告
   */
  visualizer?: boolean;

  /**
   * 插件
   */
  plugins?: PluginOption[];

  /**
   * 开启babel
   */
  babel?: boolean;

  /**
   *  开启生成版本号文件
   */
  version?: boolean;

  /**
   * 开启 unplugin-element-plus
   */
  elementPlus?: boolean | Record<string, any>;

  /**
   * 静态服务目录
   */
  staticDirs?: Array<string | StaticPluginOption>;

  /**
   * 打包复制静态目录
   */
  copyStatic?: boolean;

  /**
   * 多页面模式
   */
  pages?: Record<string, string>;

  /**
   * 生成 loading html
   */
  loading?: boolean;

  /**
   * 环境配置文件目录位置
   */
  envPath?: string;

  /**
   * 开启 nodePolyfills
   * https://github.com/davidmyersdev/vite-plugin-node-polyfills
   */
  node?: boolean | PolyfillOptions;

  /**
   * 类库导出名称模式， 默认 auto
   * https://rollupjs.org/configuration-options/#output-exports
   */
  exports?: 'auto' | 'default' | 'named' | 'none';

  /**
   * 编译完成时触发回调函数
   * @param error
   * @returns
   */
  buildEnd?: (error?: any) => void;

  /**
   * 默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。可以通过设置该选项为 false 来禁用该行为。
   */
  copyPublicDir?: boolean;

  /**
   * 开启 VueDevTools
   */
  devtools?: boolean | VitePluginVueDevToolsOptions;

  /**
   * CDN配置
   */
  cdn?: CdnPluginOptions;

  /**
   * reload 插件
   */
  reload?: boolean;
}

export interface CreateUniappViteConfigOptions {
  /**
   * 打印最终 vite.config
   */
  debug?: boolean;

  /**
   * 自定义配置 vite 配置
   */
  defineConfig?: (config: UserConfig) => UserConfigExport;

  /**
   * 环境配置文件目录位置
   */
  envPath?: string;

  /**
   * 开发端口
   */
  port?: number;

  /**
   * 预览端口
   */
  previewPort?: number;

  /**
   * 主机头
   */
  host?: string;

  /**
   * 开启https
   */
  https?: boolean;

  /**
   * 打开浏览器
   */
  open?: boolean;

  /**
   * 代理
   */
  proxy?: ProxyConfig;

  /**
   * 打包输出文件夹
   */
  outDir?: string;

  /**
   * 插件
   */
  plugins?: PluginOption[];

  /**
   * 别名
   */
  alias?: Record<string, string>;

  /**
   * 不打包的依赖
   */
  external?: string[];

  /**
   * 开启 nodePolyfills
   */
  node?: boolean | PolyfillOptions;

  /**
   * 编译完成时触发回调函数
   * @param error
   * @returns
   */
  buildEnd?: (error?: any) => void;
}

export interface CreatePluginViteConfigOptions extends CreateViteConfigOptions {
  isUmd?: boolean;
  material?: string;
  style?: string;
}
