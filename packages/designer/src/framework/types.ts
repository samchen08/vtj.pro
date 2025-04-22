import { type VNode, type DefineComponent } from 'vue';
import { type BlockPropDataType } from '@vtj/core';

export type VueComponent =
  | Record<string, any>
  | VNode
  | DefineComponent<any, any, any, any>;

/**
 * 器件分组
 */
export enum WidgetGroup {
  Block = 'block',
  Node = 'node'
}

/**
 * 区域类型
 */
export enum RegionType {
  // 品牌区
  Brand = 'Brand',
  // 工具区
  Toolbar = 'Toolbar',
  // 动作区
  Actions = 'Actions',
  // 应用区
  Apps = 'Apps',
  // 工作区
  Workspace = 'Workspace',
  // 设置区
  Settings = 'Settings',
  // 状态区
  Status = 'Status',
  // 预览区
  Preview = 'Preview'
}
/**
 * 基础器件
 */
export interface Widget {
  /**
   * 器件名称
   */
  name: string;
  /**
   * 放置区域
   */
  region: keyof typeof RegionType;
  /**
   * Vue组件
   */
  component: VueComponent;

  /**
   * 组件默认参数
   */
  props?: Record<string, any>;

  /**
   * 不可见，停用
   */
  invisible?: boolean;

  /**
   * 分组名称
   */
  group?: string;

  /**
   * 排序
   */
  order?: number;

  /**
   * 需要remote支持
   */
  remote?: boolean;
}

/**
 * App类型器件
 */
export interface AppWidget extends Widget {
  /**
   * 标识app
   */
  type: 'app';
  /**
   *  应用图标
   */
  icon: VueComponent;
  /**
   * 应用名称
   */
  label?: string;
  /**
   * 应用打开方式
   */
  openType?: 'panel' | 'link' | 'dialog';

  /**
   * 链接url，openType 为 link 时有效
   */
  url?: string;
}

/**
 * 选项卡类型器件
 */
export interface TabWidget extends Widget {
  /**
   * 标识tab
   */
  type: 'tab';
  /**
   * tab名称
   */
  label: string;
  /**
   * tab图标
   */
  icon?: VueComponent;
  /**
   * 能关闭的
   */
  closable?: boolean;

  /**
   * 操作按钮
   */
  actions?: any[];
}

/**
 * 设置器配置
 */
export interface Setter {
  /**
   * 设置器名称
   */
  name: string;
  /**
   * 设置器组件
   */
  component: VueComponent;
  /**
   * 设置器数据类型
   */
  type: BlockPropDataType;

  /**
   * 设计器参数
   */
  props?: Record<string, any>;
}
