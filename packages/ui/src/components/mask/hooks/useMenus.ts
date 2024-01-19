import { shallowRef, computed, watchEffect, ref } from 'vue';
import { useRouter } from 'vue-router';
import { arrayToMap, isUrl } from '@vtj/utils';
import type { MaskProps, MaskEmitsFn } from '../types';
import { type MenuDataItem, createDialog } from '../../';

function toFlat(
  array: MenuDataItem[],
  menuAdapter?: (menu: MenuDataItem) => MenuDataItem
) {
  let result: MenuDataItem[] = [];
  array.forEach((n) => {
    n = menuAdapter ? menuAdapter(n) : n;
    if (!n.children) {
      result.push(n);
    } else {
      result = result.concat(toFlat(n.children, menuAdapter));
    }
  });
  return result;
}

export function useMenus(props: MaskProps, emit: MaskEmitsFn) {
  const router = useRouter();

  // 菜单原始数据
  const menus = shallowRef<MenuDataItem[]>([]);
  // 收藏菜单项
  const favorites = shallowRef<MenuDataItem[]>([]);
  // 扁平菜单项
  const flatMenus = computed(() => toFlat(menus.value, props.menuAdapter));
  // 菜单id映射
  const menusMap = computed(() => arrayToMap(flatMenus.value, 'id'));
  // 当前激活的菜单项
  const active = ref<MenuDataItem | null>(null);

  // 选中菜单
  const select = (id: string | number | MenuDataItem): void => {
    const menuId = typeof id === 'object' ? id.id : id;
    const menu = menusMap.value.get(menuId);
    if (!menu) {
      console.warn('找不到菜单', id);
      return;
    }

    const { type = 'route', url, title, icon } = menu;

    if (!url) {
      active.value = menu;
      emit('select', menu);
      return;
    }

    if (type === 'route') {
      if (isUrl(url) || url.startsWith('//')) {
        window.open(url);
      } else {
        active.value = menu;
        router.push(url).catch((e) => e);
      }
      return;
    }

    if (type === 'window') {
      window.open(url);
      return;
    }

    if (type === 'dialog') {
      createDialog({
        resizable: true,
        bodyPadding: false,
        width: '80%',
        height: '80%',
        title,
        icon,
        src: url
      });
    }
  };

  // 初始化菜单数据
  const init = async () => {
    menus.value =
      typeof props.menus === 'function'
        ? (await props.menus()) || []
        : props.menus ?? [];

    favorites.value =
      typeof props.favorites === 'function'
        ? (await props.favorites()) || []
        : props.favorites ?? [];
  };

  const addFavorite = (item: MenuDataItem) => {
    favorites.value = [item, ...favorites.value];
    if (props.addFavorite) {
      props.addFavorite(item);
    }
  };

  const removeFavorite = (item: MenuDataItem) => {
    favorites.value = favorites.value.filter((n) => n.id !== item.id);

    if (props.removeFavorite) {
      props.removeFavorite(item);
    }
  };

  const isFavorite = (item: MenuDataItem) => {
    return !!favorites.value.find((n) => n === item || n.id === item.id);
  };

  const toggleFavorite = (item: MenuDataItem) => {
    isFavorite(item) ? removeFavorite(item) : addFavorite(item);
  };

  watchEffect(init);

  return {
    menus,
    favorites,
    flatMenus,
    active,
    select,
    toggleFavorite
  };
}
