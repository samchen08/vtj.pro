import type { JSExpression, JSFunction, JSONValue } from '../shared';
import type { NodeSchema } from './node';
import type { DataSourceSchema } from './dataSource';

/**
 * API 风格
 */
export type BlockApiMode = 'options' | 'composition';

export interface BlockSchema {
  /**
   * 唯一标识
   */
  id?: string;

  /**
   * 组件名
   */
  name: string;

  /**
   * 锁定
   */
  locked?: boolean;

  /**
   * API 风格，默认 options
   */
  apiMode?: BlockApiMode;

  /**
   * 注入
   */
  inject?: BlockInject[];

  /**
   * 状态数据 (Options 模式)
   */
  state?: BlockState;

  /**
   * ref 响应式声明 (Composition 模式)
   */
  refs?: Record<string, JSONValue | JSExpression>;

  /**
   * reactive 响应式声明 (Composition 模式)
   */
  reactives?: Record<string, JSONValue | JSExpression>;

  /**
   * 生命周期集
   */
  lifeCycles?: Record<string, JSFunction>;

  /**
   * 自定义方法
   */
  methods?: Record<string, JSFunction>;

  /**
   * 计算属性
   */
  computed?: Record<string, JSFunction | JSExpression>;

  /**
   * 侦听器
   */
  watch?: BlockWatch[];

  /**
   * 组合函数调用 (Composition 模式)
   */
  composables?: BlockComposable[];

  /**
   * setup 初始化代码 (Composition 模式)
   * 在 refs/reactives/composables 创建之后、组件挂载之前执行
   */
  setup?: JSFunction;

  /**
   * provide 声明
   */
  provide?: Record<string, JSONValue | JSExpression | JSFunction>;

  /**
   * 样式
   */
  css?: string;

  /**
   * 定义属性参数
   */
  props?: Array<string | BlockProp>;

  /**
   * 定义事件
   */
  emits?: Array<string | BlockEmit>;

  /**
   * 定义暴露公共属性
   */
  expose?: string[];

  /**
   * 定义插槽
   */
  slots?: Array<string | BlockSlot>;

  /**
   * 节点树
   */
  nodes?: NodeSchema[];

  /**
   * 数据源
   */
  dataSources?: Record<string, DataSourceSchema>;

  /**
   * babel代码转换缓存
   */
  transform?: Record<string, string>;

  /**
   * 标记
   */
  __VTJ_BLOCK__?: boolean;

  /**
   * 版本
   */
  __VERSION__?: string;

  /**
   * 模板id
   */
  __TEMPLATE_ID__?: string;
}

/**
 * 注入描述
 */
export interface BlockInject {
  name: string;
  from?: string | JSExpression;
  default?: JSONValue | JSExpression;
}

/**
 * 组件状态描述
 */
export type BlockState = Record<string, JSONValue | JSExpression | JSFunction>;

/**
 * 侦听器描述
 */
export interface BlockWatch {
  id?: string;
  source: JSFunction | JSExpression;
  deep?: boolean;
  immediate?: boolean;
  flush?: 'pre' | 'post' | 'sync';
  handler: JSFunction;
}

/**
 * 组合函数调用描述 (Composition 模式)
 */
export interface BlockComposable {
  /**
   * 赋值变量名
   */
  name: string;
  /**
   * composable 来源函数
   */
  composable: JSExpression;

  /**
   * 调用参数
   */
  args?: (JSONValue | JSExpression)[];
  /**
   * 解构字段，如 const { x, y } = useXxx()
   */
  destructure?: string[];
}

export interface BlockProp {
  name: string;
  type?: BlockPropDataType | BlockPropDataType[];
  required?: boolean;
  default?: JSONValue | JSExpression;
}

export type BlockPropDataType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Date';

export interface BlockEmit {
  name: string;
  params: string[];
}

export interface BlockSlot {
  name: string;
  params: string[];
}
