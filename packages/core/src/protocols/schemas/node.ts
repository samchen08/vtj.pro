import type { JSExpression, JSFunction, JSONValue } from '../shared';

/**
 * 低代码组件协议
 */
export interface NodeSchema {
  /**
   * 节点标识
   */
  id?: string;

  /**
   * 节点名称
   */
  name: string;

  /**
   * 来源
   */
  from?: NodeFrom;

  /**
   * 锁定
   */
  locked?: boolean;

  /**
   * 不可见的
   */
  invisible?: boolean;

  /**
   *  组件属性， 当 name 为 slot 时 props 是 插槽的参数
   */
  props?: NodeProps;

  /**
   * 绑定事件
   */
  events?: NodeEvents;

  /**
   * 内置指令
   */
  directives?: NodeDirective[];

  /**
   * 子组件
   */
  children?: NodeChildren;

  /**
   * 放置在组件的插槽
   */
  slot?: string | NodeSlot;
}

/**
 * 组件来源， 字符串是依赖包名
 */
export type NodeFrom =
  | string
  | NodeFromSchema
  | NodeFromUrlSchema
  | NodeFromRemote;

/**
 *  来源于其他Schema对象
 */
export interface NodeFromSchema {
  type: 'Schema';
  /**
   * Block Id
   */
  id: string;
}

/**
 * 来源于远程的Schema文件
 */
export interface NodeFromUrlSchema {
  type: 'UrlSchema';
  url: string;
}

/**
 * 来源远程组件
 */
export interface NodeFromRemote {
  type: 'Remote';
  urls: string;
  library?: string;
}

/**
 * 组件属性描述
 */
export interface NodeProps {
  key?: string | number | JSExpression;
  ref?: string | JSExpression | JSFunction;
  style?: Record<string, any>;
  class?: string | string[] | JSExpression;
  [index: string]: JSONValue | JSExpression | JSFunction;
}

/**
 * 事件描述
 */
export interface NodeEvent {
  name: string;
  handler: JSFunction;
  modifiers?: Record<string, boolean>;
}

export type NodeEvents = Record<string, NodeEvent>;

/**
 * 子组件描述
 */
export type NodeChildren = string | JSExpression | NodeSchema[];

/**
 * 插槽描述
 */
export interface NodeSlot {
  name: string;
  params?: string[];
}

/**
 * 组件指令定义
 */
export interface NodeDirective {
  id?: string;
  // 指令名称
  name: string;
  // 参数
  arg?: string | JSExpression;
  // 修饰符
  modifiers?: NodeModifiers;
  // 指令值
  value?: JSExpression;
  // v-for 迭代器
  iterator?: {
    item: string;
    index: string;
  };
}

/**
 * 循环指令迭代器
 */
export interface NodeDirectiveIterator {
  item: string;
  index: string;
}

/**
 * 事件/指令修饰符
 */
export type NodeModifiers = Record<string, boolean>;
