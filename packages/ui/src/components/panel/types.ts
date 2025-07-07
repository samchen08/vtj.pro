import type { PropType } from 'vue';
import type { ComponentPropsType, BaseSize } from '../shared';
import type { HeaderProps, ContainerProps } from '../';

export type PanelBadgeType = 'success' | 'primary' | 'warning' | 'danger';

export interface PanelBadge {
  type: PanelBadgeType,
  text: String
}

export const panelProps = {
  /**
   * 右上角标记
   */
  badge: {
    type: Object as PropType<PanelBadge>,
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
  body: {
    type: Object as PropType<ContainerProps>
  },
  footer: {
    type: Object as PropType<ContainerProps>
  }
};

export type PanelProps = ComponentPropsType<typeof panelProps>;

