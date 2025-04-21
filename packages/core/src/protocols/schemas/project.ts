import type { PageFile, BlockFile } from './file';
import type { Dependencie } from '../assets';
import type { ApiSchema, MetaSchema } from './dataSource';
import type { PlatformType, JSFunction } from '../shared';

/**
 * 项目描述信息
 */
export interface ProjectSchema {
  /**
   * 平台，默认 web
   */
  platform?: PlatformType;

  /**
   * 唯一标识
   */
  id?: string;

  /**
   * 项目名称，默认取package.json  name 字段
   */
  name: string;

  /**
   * 项目简介
   */
  description?: string;

  /**
   * 项目页面
   */
  pages?: PageFile[];

  /**
   * 项目共用区块组件
   */
  blocks?: BlockFile[];

  /**
   * 首页 pageId
   */
  homepage?: string;

  /**
   * 项目依赖
   */
  dependencies?: Dependencie[];

  /**
   * api
   */
  apis?: ApiSchema[];

  /**
   * 配置化查询
   */
  meta?: MetaSchema[];

  /**
   * 项目配置
   */

  config?: ProjectConfig;

  /**
   * UniApp项目配置
   */
  uniConfig?: UniConfig;

  /**
   * 标记
   */
  __VTJ_PROJECT__?: boolean;

  /**
   * 版本
   */
  __VERSION__?: string;

  /**
   * 项目部署目录
   */
  __BASE_PATH__?: string;

  /**
   * 全局项目标识
   */
  __UID__?: string;
}

/**
 * 项目配置信息
 */
export interface ProjectConfig {
  /**
   * 开启主题切换
   */
  themeSwitchable?: boolean;

  /**
   * 站点标题
   */
  title?: string;

  /**
   * logo
   */
  logo?: string;
}

/**
 * UniApp 项目配置
 */
export interface UniConfig {
  /**
   * manifest.json 应用配置
   */
  manifestJson?: Record<string, any>;

  /**
   * pages.json 页面配置
   */
  pagesJson?: Record<string, any>;

  /**
   * 全局样式
   */
  css?: string;

  /**
   * 当uni-app 初始化完成时触发（全局只触发一次），参数为应用启动参数，同 uni.getLaunchOptionsSync 的返回值
   */
  onLaunch?: JSFunction;

  /**
   * 当 uni-app 启动，或从后台进入前台显示，参数为应用启动参数，同 uni.getLaunchOptionsSync 的返回值
   */
  onShow?: JSFunction;

  /**
   * 当 uni-app 从前台进入后台
   */
  onHide?: JSFunction;

  /**
   * 当 uni-app 报错时触发
   */
  onError?: JSFunction;

  /**
   * 对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯
   */
  onUniNViewMessage?: JSFunction;

  /**
   * 对未处理的 Promise 拒绝事件监听函数（2.8.1+ app-uvue 暂不支持）
   */
  onUnhandledRejection?: JSFunction;

  /**
   * 页面不存在监听函数
   */
  onPageNotFound?: JSFunction;
  /**
   * 监听系统主题变化
   */
  onThemeChange?: JSFunction;
  /**
   * 最后一个页面按下Android back键，常用于自定义退出
   */
  onLastPageBackPress?: JSFunction;
  /**
   * onExit	监听应用退出
   */
  onExit?: JSFunction;
}
