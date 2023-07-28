import type {
  UserConfig,
  UserConfigExport,
  ProxyOptions,
  LibraryFormats,
  PluginOption
} from 'vite';

/**
 * 环境类型
 */
export type EnvType = 'local' | 'dev' | 'sit' | 'uat' | 'pre' | 'live';

/**
 * 环境配置
 */
export type EnvConfig = Record<string, string | number | boolean>;

export type EnvConfigMap = Record<EnvType, EnvConfig>;

export type ProxyConfig = Record<string, string | ProxyOptions>;

export interface IOptions {
  /**
   * 打印最终 vite.config
   */
  debug?: boolean;

  /**
   * 开发或生产环境服务的公共基础路径
   */
  base?: string;


  /**
   * 自定义配置 vite 配置
   */
  defineConfig?: (config: UserConfig) => UserConfigExport;
  /**
   * 代理
   */
  proxy?: ProxyConfig;

  /**
   * 开发端口
   */
  port?: number;

  /**
   * 主机头
   */
  host?: string;
  /**
   * 预览端口
   */
  previewPort?: number;

  /**
   * 编译目标浏览器
   */
  targets?: string | string[];

  /**
   * 打包输出文件夹
   */
  outDir?: string;

  /**
   * 清空输出目录
   */
  emptyOutDir?: boolean;

  /**
   * 生成定义文件
   */
  dts?: boolean;

  /**
   * 定义文件输出文件夹
   */
  dtsOutputDir?: string;

  dtsCleanVueFileName?: boolean;

  /**
   * 环境变量配置
   */
  envConfig?: EnvConfigMap;

  /**
   * 当前环境类型
   */
  envType?: EnvType | string;

  /**
   * 不打包的依赖
   */
  external?: string[];

  /**
   * 从全局引用的依赖
   */
  externalGlobals?: Record<string, string>;

  /**
   * 库模式
   */
  lib?: boolean;

  /**
   * 库编译目标：esnext es2015
   */
  libTarget?: string;

  /**
   *  lib 入口文件
   */
  entry?: string;

  /**
   * 导出库名
   */
  libraryName?: string;

  /**
   * 库输出格式
   */
  formats?: LibraryFormats[];

  /**
   * 库输出文件名
   */
  fileName?: string | ((format: LibraryFormats) => string);

  /**
   * 库模式输出cdn文件，需要配置 libraryName 和 externalGlobals
   */
  cdn?: boolean;

  /**
   * cdn文件夹
   */
  cdnDir?: string;

  /**
   * 别名
   */
  alias?: Record<string, string>;

  /**
   * 适配传统浏览器
   */
  legacy?: boolean;

  /**
   * 自定义 chunk name
   */
  manualChunks?: (id: string) => string | void;

  /**
   * 预构建依赖
   */
  optimizeDeps?: string[];

  /**
   * 生成报告
   */
  visualizer?: boolean;

  /**
   * 开启babel
   */
  babel?: boolean;

  /**
   * 插件
   */
  plugins?: PluginOption[];

  /**
   * Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。如果你需要对 node_modules/ 内的包进行监听
   */
  watchModules?: string[];

  /**
   * 开启https
   */
  https?: boolean;

  /**
   * 开启 unplugin-element-plus
   */
  elementPlus?: boolean | Record<string, any>;

  /**
   * 设置 polyfills
   */
  polyfills?: boolean | string[];

  /**
   * 设置 modernPolyfills
   */
  modernPolyfills?: boolean | string[];

  /**
   * 强制更新依赖
   */
  force?: boolean;

  /**
   * UniApp 应用
   */
  uniapp?: boolean;
}
