import type { ExtractPropTypes, PropType, VNode } from 'vue';

export type IconParam = string | VNode | IconProps | Record<string, any>;
export type IconSize = number | 'inherit' | 'large' | 'default' | 'small';

export const iconSizeMap = {
  default: 14,
  small: 12,
  large: 18
};

export type IconSizeKey = keyof typeof iconSizeMap;

export const iconProps = {
  icon: {
    type: [String, Object] as PropType<string | object | VNode>
  },
  color: {
    type: String
  },
  size: {
    type: [Number, String] as PropType<IconSize>,
    default: 'inherit'
  },
  src: {
    type: String
  },
  background: {
    type: String
  },
  padding: {
    type: Number
  },
  radius: {
    type: Number
  }
};

export type IconProps = Partial<ExtractPropTypes<typeof iconProps>>;
