import type { BlockSchema } from './block';

/**
 * 文件类型
 */
export type FileType = 'block' | 'page';

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
}
