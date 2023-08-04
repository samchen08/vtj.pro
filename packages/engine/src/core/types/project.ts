import { Dependencie } from './dependencie';
import { SummarySchema } from './block';
import { JSExpression } from './shared';
import { ApiSchema } from './dataSource';

export interface PageSchema extends SummarySchema {
  // 是否目录
  isDir?: boolean;
  // 目录可以包含页面
  children?: PageSchema[];
  // 菜单图标
  icon?: string;
  // 是否在母版内
  mask?: boolean;

  // 首页
  home?: boolean;

  // 不出现在菜单
  hidden?: boolean;
}

export interface ProjectSchema {
  /**
   * 项目Id
   */
  id?: string;
  /**
   * 项目名 package.json  name 字段
   */
  name: string;
  /**
   * 项目描述文本
   */
  description?: string;

  /**
   * 主页id
   */
  homepageId?: string;

  /**
   * 页面集合
   */
  pages?: PageSchema[];

  /**
   * 区块集合
   */
  blocks?: SummarySchema[];

  /**
   * 项目依赖
   */
  dependencies?: Dependencie[];

  /**
   * api
   */
  apis?: ApiSchema[];

  /**
   * 标记
   */
  __VTJ_PROJECT__?: boolean;
  /**
   * 引擎版本
   */
  __VTJ_VERSION__?: string;
  /**
   * 文件更新时间戳
   */
  __VTJ_DATE__?: string;
}
