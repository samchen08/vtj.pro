import type { JSONValue, DataType } from '../shared';
import type { NodeSchema, NodeFrom } from '../schemas';
/**
 *  物料描述
 */
export interface Material {
  /**
   * 版本号
   */
  version: string;

  /**
   * 物料名称标识
   */
  name: string;

  /**
   * 产出导出变量名称
   */
  library: string;

  /**
   * 物料中文名称
   */
  label: string;

  /**
   * 分类配置
   */
  categories: MaterialCategory[];

  /**
   * 组件描述
   */
  components: MaterialDescription[];

  /**
   * 排序号，物料在组件库的排序，数字小的在前
   */
  order: number;

  /**
   * 不显示在组件库面板
   */
  hidden?: boolean;
}

// 资产分类
export interface MaterialCategory {
  // 标识
  id: number | string;
  // 分类名称
  category: string;
}

export interface MaterialDescription {
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
   * 组件预览图标
   */
  icon?: string;

  /**
   * 组件中文名称描述
   */
  label?: string;

  /**
   * 组件文档Url
   */
  doc?: string;

  /**
   * 分类Id
   */
  categoryId?: number | string;

  /**
   * 组件支持属性，待定义
   */
  props?: MaterialProp[];

  /**
   * 组件支持事件
   */
  events?: Array<string | MaterialEvent>;

  /**
   * 组件支持的插槽
   */
  slots?: Array<string | MaterialSlot>;

  /**
   * 初始化时的低代码片段
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

  /**
   * 组件来源
   */
  from?: NodeFrom;

  /**
   * Block Id
   */
  id?: string;

  /**
   * 所属包名
   */
  package?: string;
}

/**
 * 组件支持的属性
 */
export interface MaterialProp {
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
  setters?: string | MaterialSetter | Array<string | MaterialSetter>;

  /**
   * 值可选项
   */
  options?: string[] | { label: string; value: JSONValue }[];

  /**
   * 数据类型
   */
  type?: DataType[];
}

/**
 * 属性设置器
 */
export interface MaterialSetter {
  /**
   * 设置器名称标识
   */
  name: string;

  /**
   * 实现组件
   */
  component?: any;

  /**
   * 显示描述文本
   */
  label?: string;

  /**
   * 组件配置参数
   */
  props?: Record<string, any>;
}

/**
 * 组件支持的事件
 */
export interface MaterialEvent {
  /**
   * 事件名称
   */
  name: string;

  /**
   * 事件回调参数名
   */
  params?: string[];
}

/**
 * 组件支持的插槽
 */
export interface MaterialSlot {
  /**
   * 插槽名称
   */
  name: string;

  /**
   * 插槽回传的参数名
   */
  params?: string[];
}
