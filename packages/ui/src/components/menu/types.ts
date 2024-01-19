import type { SubMenuProps as ElSubMenuProps, BadgeProps } from 'element-plus';
import type { DefineComponent } from 'vue';
export interface MenuDataItem {
  id: string | number;
  title?: string;
  icon?: string | Record<string, any> | DefineComponent<any, any, any, any>;
  disabled?: boolean;
  hidden?: boolean;
  children?: MenuDataItem[];
  // 打开方式，默认 route
  type?: 'route' | 'dialog' | 'window';
  // 菜单路径地址
  url?: string;
  badge?: MenuBadge;
}

export type SubMenuProps = Partial<ElSubMenuProps>;

export type MenuBadge = number | string | Partial<BadgeProps>;

export interface MenuProps {
  data?: MenuDataItem[];
  subMenu?: SubMenuProps;
  defaultIcon?: DefineComponent<any, any, any, any>;
}

export type MenuEmits = {
  select: [item: MenuDataItem];
};
