import type { PropType } from 'vue';
import type { ComponentPropsType } from '../shared';
import type { IconParam } from '../';

export interface TabsItem {
  label: string;
  name: string | number;
  icon?: IconParam;
  // name 别名，为统一命名
  value?: string | number;
  disabled?: boolean;
  closable?: boolean;
  lazy?: boolean;
  // 加载自定义组件
  component?: any;
  // 组件参数
  props?: Record<string, any>;
}

export const tabsProps = {
  items: {
    type: Array as PropType<TabsItem[]>,
    default() {
      return [];
    }
  },
  border: {
    type: Boolean
  }
};

export type TabsProps = ComponentPropsType<typeof tabsProps>;
