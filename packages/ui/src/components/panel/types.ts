import { PropType } from 'vue';
import { ComponentPropsType, BaseSize } from '../shared';
import { HeaderProps, ContainerProps } from '../';

export const panelProps = {
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
   * 显示边框
   */
  border: {
    type: Boolean,
    default: true
  },

  /**
   * 圆角
   */
  radius: {
    type: Boolean,
    default: true
  },

  /**
   * 卡片模式
   */
  card: {
    type: Boolean
  },

  /**
   * 尺寸
   */
  size: {
    type: String as PropType<BaseSize>
  },

  /**
   * 阴影设置
   */
  shadow: {
    type: String as PropType<'none' | 'always' | 'hover'>
  },
  /**
   * 头部设置
   */
  header: {
    type: [String, Object] as PropType<string | HeaderProps | null>
  },

  bodyPadding: {
    type: Boolean,
    default: true
  },

  footerPadding: {
    type: Boolean,
    default: true
  },

  body: {
    type: Object as PropType<ContainerProps>
  },
  footer: {
    type: Object as PropType<ContainerProps>
  }
};

export type PanelProps = ComponentPropsType<typeof panelProps>;
