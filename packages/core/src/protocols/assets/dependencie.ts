/**
 * 依赖包
 */
export interface Dependencie {
  /**
   * 包名
   */
  package: string;
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
