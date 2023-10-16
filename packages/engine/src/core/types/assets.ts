import { JSONValue } from './shared';
import { NodeSchema, NodeFrom } from './node';

// 资产内容
export interface AssetsContent {
  name: string;
  library?: string;
  names?: string[];
  label?: string;
  categories?: AssetsCategory[];
  components?: ComponentDescription[];

  // 排序号，资产在组件库的排序，数字小的在前
  order?: number;
}

// 资产分类
export interface AssetsCategory {
  // 标识
  id: number | string;
  // 分类名称
  category: string;
}

// 组件描述
export interface ComponentDescription {
  /**
   * 组件名称
   */
  name: string;

  /**
   * 组件别名，即组件库导出的原始名称 如 import { Button } from 'ant-design-vue'
   */
  alias?: string;

  /**
   * 组件库导出的名称 如 import { Button } from 'ant-design-vue'
   * parent: Button
   * alias: Group
   * name: AButtonGroup
   * const AButtonGroup = Button.Group;
   * 当 parent 有值时 alias 可以设置多级，如 Group.Item
   *
   */
  parent?: string;

  /**
   * 图标
   */
  icon?: string;
  /**
   * 组件描述
   */
  title?: string;

  /**
   * 组件文档
   */
  doc?: string;

  /**
   * 分类Id
   */
  categoryId?: number | string;

  /**
   * 所属包名
   */
  package?: string;

  /**
   * 组件支持属性，待定义
   */
  props?: ComponentProp[];
  /**
   * 组件支持事件
   */
  events?: Array<string | ComponentEvent>;

  /**
   * 组件支持的插槽
   */
  slots?: Array<string | ComponentSlot>;

  /**
   * 低代码片段
   */
  snippet?: Partial<NodeSchema>;

  /**
   * 只能放置在哪些组件内， 如果不设置，则表示可以放置在任何组件内, false表示不能放置在任何组件内
   */
  parentIncludes?: boolean | string[];

  /**
   * 只能允许哪些子组件， 如果不设置，则表示可以放置任何子组件, false表示不能放置在任何子组件
   */
  childIncludes?: boolean | string[];

  /**
   * 不显示在组件面板
   */
  hidden?: boolean;

  from?: NodeFrom;
  id?: string;
}

/**
 * 组件支持的属性
 */
export interface ComponentProp {
  /**
   * 属性名称
   */
  name: string;

  /**
   * 属性名称 中文
   */
  label?: string;

  /**
   * 提示说明
   */
  title?: string;

  /**
   * 默认值
   */
  defaultValue?: JSONValue;
  /**
   * 设置器
   */
  setters?: string | Setter | Array<string | Setter>;
  /**
   * 值可选项
   */
  options?: string[] | { label: string; value: JSONValue }[];

  /**
   * 数据类型
   */
  type?: string[];
}

/**
 * 组件支持的事件
 */
export interface ComponentEvent {
  // 事件名称
  name: string;
  // 预留
  params?: string[];
}

/**
 * 组件支持的插槽
 */
export interface ComponentSlot {
  name: string;
  // 预留
  params?: string[];
}

// 属性设置器
export interface Setter {
  // 设置器名称标识
  name: string;
  // 实现组件
  component?: any;
  // 显示描述文本
  label?: string;
  // 组件配置参数
  props?: Record<string, any>;
}
