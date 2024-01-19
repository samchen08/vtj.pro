import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';
import type Container from './Container.vue';
export type ContainerDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse';

export type ContainerWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type ContainerJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around';

export type ContainerAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

export type ContainerAlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'stretch';

export const containerProps = {
  /**
   * 组件渲染html标签
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * 宽高自适应
   */
  fit: {
    type: Boolean,
    default: false
  },
  /**
   * 指定高度，fit 为true 失效
   */
  width: {
    type: [String, Number]
  },
  /**
   * 指定高度，fit 为true失效
   */
  height: {
    type: [String, Number]
  },
  /**
   * 开启flex布局
   */
  flex: {
    type: Boolean,
    default: true
  },
  /**
   *  inline-flex
   */
  inline: {
    type: Boolean
  },
  /**
   * flex主轴方向
   */
  direction: {
    type: String as PropType<ContainerDirection>,
    default: 'row'
  },
  /**
   * 换行
   */
  wrap: {
    type: String as PropType<ContainerWrap>,
    default: 'nowrap'
  },
  /**
   * 主轴上的对齐方式。
   */
  justify: {
    type: String as PropType<ContainerJustifyContent>,
    default: 'flex-start'
  },
  /**
   * 交叉轴上对齐方式
   */
  align: {
    type: String as PropType<ContainerAlignItems>,
    default: 'flex-start'
  },
  /**
   * 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
   */
  alignContent: {
    type: String as PropType<ContainerAlignContent>,
    default: 'stretch'
  },
  /**
   * 放大
   */
  grow: {
    type: Boolean,
    default: false
  },
  /**
   * 缩小
   */
  shrink: {
    type: Boolean,
    default: false
  },
  /**
   * 单个项目有与其他项目不一样的对齐方式。可覆盖容器的align-items属性
   */
  alignSelf: {
    type: String as PropType<'auto' | ContainerAlignItems>,
    default: 'auto'
  },
  /**
   * css overflow
   */
  overflow: {
    type: String as PropType<'auto' | 'hidden' | 'visible'>
  },
  /**
   * 内边距
   */
  padding: {
    type: Boolean,
    default: false
  },
  // 嵌套子组件加间隔
  gap: {
    type: Boolean
  },
  autoPointer: {
    type: Boolean
  }
};

export type ContainerProps = ComponentPropsType<typeof containerProps>;

export type ContainerInstance = InstanceType<typeof Container>;
