import type { PlatformType } from '../shared';
/**
 * 依赖包
 */
export interface Dependencie {
  /**
   * 包名
   */
  package: string;

  /**
   * 支持平台
   */
  platform?: PlatformType | PlatformType[];

  /**
   * 版本号
   */
  version: string;
  /**
   * 必须依赖
   */
  required?: boolean;
  /**
   * 官方内置提供
   */
  official?: boolean;

  /**
   * 启用
   */
  enabled?: boolean;

  /**
   * 库导出名称
   */
  library: string;

  /**
   * 语言包库导出名称
   */
  localeLibrary?: string;

  /**
   * 加载资源url
   */
  urls: string[];

  /**
   * 资产配置url
   */
  assetsUrl?: string;

  /**
   * 资产配置导出名称
   */
  assetsLibrary?: string;
}
