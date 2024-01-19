import type { PropType, ExtractPropTypes } from 'vue';
import {
  type ElTooltipProps,
  type BadgeProps,
  dropdownProps,
  type ButtonProps
} from 'element-plus';
import type { ComponentPropsType, BaseSize, BaseType } from '../shared';
import type { IconParam } from '../icon';

export type ActionMode = 'button' | 'text' | 'icon';

export interface ActionMenuItem {
  command: string | number | object;
  disabled?: boolean;
  divided?: boolean;
  icon?: IconParam;
  label?: string;
  [index: string]: any;
}

export type ActionDropdown = Partial<ExtractPropTypes<typeof dropdownProps>>;

export const actionProps = {
  /**
   * 动作名称标识
   */
  name: {
    type: String
  },
  /**
   * 动作标题文本
   */
  label: {
    type: String
  },
  /**
   * 动作值，用来传输数据
   */
  value: {
    type: [String, Number, Object, Array, Boolean] as PropType<unknown>
  },
  /**
   *  图标配置
   */
  icon: {
    type: [String, Object] as PropType<IconParam>
  },
  /**
   * 模式
   */
  mode: {
    type: String as PropType<ActionMode>,
    default: 'button'
  },

  /**
   * 下拉菜单配置
   */
  menus: {
    type: Array as PropType<ActionMenuItem[]>
  },

  /**
   *  tooltip 配置
   */
  tooltip: {
    type: [String, Object] as PropType<string | Partial<ElTooltipProps>>
  },
  /**
   * Badge 配置
   */
  badge: {
    type: [String, Number, Object] as PropType<
      string | number | Partial<BadgeProps>
    >
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
  },
  /**
   * 禁用
   */
  disabled: {
    type: [Boolean, Function] as PropType<boolean | (() => boolean)>
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
    type: String as PropType<BaseType>,
    default: 'primary'
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
  }
};

export type ActionProps = ComponentPropsType<typeof actionProps>;

export type ActionEmits = {
  click: [props: ActionProps];
  command: [item: ActionMenuItem];
};
