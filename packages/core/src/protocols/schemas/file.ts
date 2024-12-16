import type { BlockSchema } from './block';

/**
 * 文件类型
 */
export type FileType = 'block' | 'page';

export interface MarketInstallInfo {
  /**
   * 物料标识
   */
  id: string;
  /**
   * 安装版本号
   */
  version?: string;
}

export interface BlockFile {
  /**
   * 文件类型
   */
  type: FileType;
  /**
   * 唯一标识
   */
  id: string;

  /**
   *  文件名
   */
  name: string;

  /**
   * 页面标题
   */
  title: string;

  /**
   * 分组
   */
  category?: string;

  /**
   * 从物料市场安装
   */
  market?: MarketInstallInfo;

  /**
   * 区块来源，默认为Schema，一旦确定，不允许更改
   */
  fromType?: 'Schema' | 'UrlSchema' | 'Plugin';

  /**
   * 是否预设，预设的插件不能编辑和删除
   */
  preset?: boolean;

  /**
   * 资源url，
   * Schema: 无url
   * UrlSchema： 只允许一个json文件
   * Plugin：支持多个文件（.css或.js）,多个文件用逗号分隔
   */
  urls?: string;

  /**
   * Plugin 时的插件名称
   */
  library?: string;

  /**
   * 文件内容
   */
  dsl?: BlockSchema;
}

/**
 * 页面描述
 */
export interface PageFile extends BlockFile {
  /**
   * 是否目录
   */
  dir?: boolean;

  /**
   * 菜单icon
   */
  icon?: string;

  /**
   * 目录包含的页面
   */
  children?: PageFile[];

  /**
   * 是否在母版内
   */
  mask?: boolean;

  /**
   * 不在菜单显示
   */
  hidden?: boolean;

  /**
   * 源码文件，非低代码页面
   */
  raw?: boolean;

  /**
   * 纯净的页面
   */
  pure?: boolean;

  /**
   * 开启页面缓存
   */
  cache?: boolean;

  /**
   * 路由元信息
   */
  meta?: Record<string, any>;
}
