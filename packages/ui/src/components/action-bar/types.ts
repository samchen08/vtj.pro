import type { PropType } from 'vue';
import type { ComponentPropsType, BaseSize, BaseType } from '../shared';
import type {
  ActionMode,
  ActionDropdown,
  ActionProps,
  ActionMenuItem,
  ContainerProps
} from '../';
import type { ElTooltipProps, BadgeProps, ButtonProps } from 'element-plus';

export type ActionBarItem = ActionProps & { [key: string]: any };

export type ActionBarItems = Array<ActionBarItem | '|'>;

export const actionBarProps = {
  /**
   * 动作项
   */
  items: {
    type: Array as PropType<ActionBarItems>
  },
  /**
   * 模式
   */
  mode: {
    type: String as PropType<ActionMode>,
    default: 'button'
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<BaseSize>,
    default: 'default'
  },
  /**
   * 颜色类型
   */
  type: {
    type: String as PropType<BaseType>
  },

  /**
   * icon 背景设置，当 mode为 icon 时有效
   */
  background: {
    type: String as PropType<'always' | 'hover' | 'none'>,
    default: 'always'
  },
  /**
   * icon 背景样式圆形，当 mode为 icon 时有效
   */
  circle: {
    type: Boolean
  },
  /**
   * 禁用
   */
  disabled: {
    type: [Boolean, Function] as PropType<
      boolean | ((item: ActionProps) => boolean)
    >
  },
  /**
   *  tooltip 配置
   */
  tooltip: {
    type: Object as PropType<Partial<ElTooltipProps>>
  },
  /**
   * Badge 配置
   */
  badge: {
    type: Object as PropType<Partial<BadgeProps>>
  },
  /**
   * ElDropdown 组件配置
   */
  dropdown: {
    type: Object as PropType<ActionDropdown>
  },
  /**
   * ElButton 组件配置，mode为button时有效
   */
  button: {
    type: Object as PropType<Partial<ButtonProps>>
  }
};

export type ActionBarProps = ComponentPropsType<typeof actionBarProps> &
  ContainerProps;

export type ActionBarEmits = {
  click: [action: ActionProps];
  command: [action: ActionProps, menu: ActionMenuItem];
};
