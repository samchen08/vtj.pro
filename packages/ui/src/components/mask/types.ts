import type { PropType, InjectionKey, DefineComponent } from 'vue';

import type {
  MenuDataItem,
  ActionBarItems,
  ActionProps,
  ActionMenuItem,
  ComponentPropsType,
  DialogProps
} from '../';
import type { Emits } from '../shared';
import logo from './assets/logo.svg';
import type Mask from './Mask.vue';

export const TAB_ITEM_WIDTH = 140;

export const maskProps = {
  /**
   * 系统logo
   */
  logo: {
    type: String,
    default: logo
  },
  /**
   * 系统标题
   */
  title: {
    type: String,
    default: 'VTJ.PRO'
  },
  /**
   * 菜单项数据
   */
  menus: {
    type: [Array, Function] as PropType<
      MenuDataItem[] | (() => Promise<MenuDataItem[]> | MenuDataItem[])
    >,
    default() {
      return [];
    }
  },
  /**
   * 收藏菜单项
   */
  favorites: {
    type: [Array, Function] as PropType<
      MenuDataItem[] | (() => Promise<MenuDataItem[]> | MenuDataItem[])
    >,
    default() {
      return [];
    }
  },
  /**
   * 菜单项数据适配函数，用作转换菜单项数据
   */
  menuAdapter: {
    type: Function as PropType<(menu: MenuDataItem) => MenuDataItem>
  },

  /**
   * 主页Tab配置
   */
  home: {
    type: [String, Object] as PropType<string | MaskTab>,
    default: '/'
  },

  /**
   * 最大tabs数量
   */
  tabs: {
    type: Number,
    default: 20
  },
  /**
   * 右上角工具条配置
   */
  actions: {
    type: Array as PropType<ActionBarItems>
  },

  /**
   * 用户头像图片url
   */
  avatar: {
    type: String
  },
  /**
   * 开启主题切换
   */
  theme: {
    type: Boolean
  },
  /**
   * 禁用框架容器
   */
  disabled: {
    type: Boolean
  },
  addFavorite: {
    type: Function as PropType<(menu: MenuDataItem) => void>
  },
  removeFavorite: {
    type: Function as PropType<(menu: MenuDataItem) => void>
  },
  userCardWidth: {
    type: Number,
    default: 350
  },
  /**
   * 内嵌纯净页面，不加背景和边距
   */
  pure: {
    type: Boolean
  }
};

export type MaskProps = ComponentPropsType<typeof maskProps>;

export type MaskInstance = InstanceType<typeof Mask>;

export type MaskEmits = {
  select: [menu: MenuDataItem];
  actionClick: [action: ActionProps];
  actionCommand: [action: ActionProps, item: ActionMenuItem];
};

export type MaskEmitsFn = Emits<MaskEmits>;

export type MaskSlots = {
  default(): any;
  user(): any;
};

export interface MaskTab {
  id: string;
  name: string;
  // 页面路由
  url: string;
  // 标题文本
  title?: string;
  // 图标
  icon?: string | Record<string, any> | DefineComponent<any, any, any, any>;
  // 能否关闭
  closable?: boolean;
  // 弹窗模式
  dialog?: DialogProps & { [index: string]: any };
  // 关联菜单项
  menu?: MenuDataItem;
}

export type TabCreator = () => Promise<Partial<MaskTab>> | Partial<MaskTab>;

export const TAB_CREATORS_KEY: InjectionKey<Record<string, TabCreator>> =
  Symbol();

export const MASK_KEY = '$mask';
