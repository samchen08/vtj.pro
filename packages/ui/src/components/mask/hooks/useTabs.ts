import {
  computed,
  watch,
  ref,
  type ComputedRef,
  type Ref,
  nextTick,
  provide
} from 'vue';
import { useRouter, useRoute, type RouteLocationRaw } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { upperFirstCamelCase, uid, delay } from '@vtj/utils';
import { useElementSize } from '@vueuse/core';
import {
  type MaskProps,
  type MaskEmitsFn,
  TAB_ITEM_WIDTH,
  type MaskTab,
  type TabCreator,
  TAB_CREATORS_KEY
} from '../types';
import type { MenuDataItem } from '../../';

export function useTabs(
  _props: MaskProps,
  _emit: MaskEmitsFn,
  menus: ComputedRef<MenuDataItem[]>,
  active: Ref<MenuDataItem | null>,
  home: ComputedRef<MaskTab>
) {
  const route = useRoute();
  const router = useRouter();
  const tabCreators: Record<string, TabCreator> = {};
  const tabs: Ref<MaskTab[]> = ref([]);
  const tabRef = ref();
  const { width } = useElementSize(tabRef);
  const showCount = computed(() => Math.floor(width.value / TAB_ITEM_WIDTH));
  const showTabs = computed(() =>
    tabs.value.slice(0, showCount.value).filter((n) => !n.dialog)
  );
  const dropdownTabs = computed(() => tabs.value.slice(showCount.value));
  const getMenuByUrl = (url: string) => menus.value.find((n) => n.url === url);

  const isCurrentTab = (tab: MaskTab) => {
    return route.fullPath === tab.url;
  };

  const isHomeTab = (tab: MaskTab) => {
    return home.value.id === tab.id;
  };

  const getTab = (id: string) => {
    if (home.value.id === id) {
      return home.value;
    }
    return tabs.value.find((n) => n.id === id);
  };

  const tabValue = ref<string>('');
  const currentTab = computed(() => getTab(tabValue.value));

  const changeTab = (tab: MaskTab) => {
    router.push(tab.url).catch((e) => e);
  };

  const activeTab = (tab: MaskTab) => {
    tabValue.value = tab.id;
    if (route.fullPath !== tab.url) {
      changeTab(tab);
    }
  };

  const activeHome = () => {
    changeTab(home.value);
  };

  const addTab = (tab: MaskTab) => {
    // 检测tab是否已经存在
    const match = tabs.value.find((n) => n.url === tab.url || n.id === tab.id);
    if (match) {
      activeTab(match);
    } else {
      tabs.value.unshift(tab);
      activeTab(tab);
    }
  };

  const createTab = async (menu?: MenuDataItem): Promise<MaskTab> => {
    const { url = route.fullPath, icon, title } = menu || {};
    const creator = tabCreators[url];
    const id = uid();
    const name = upperFirstCamelCase(url);
    return {
      id,
      name,
      url,
      icon,
      title: title || getMenuByUrl(route.path)?.title || '新建页签',
      closable: true,
      menu,
      ...(creator ? await creator() : {})
    };
  };

  const removeTab = async (tab: MaskTab, silent?: boolean) => {
    if (!silent) {
      const ret = await ElMessageBox.confirm('是否关闭页签', '提示', {
        type: 'warning'
      }).catch(() => false);

      if (!ret) return;
    }
    tabs.value = tabs.value.filter((n) => n.id !== tab.id);
    // 删除的是激活tab
    if (tabValue.value === tab.id) {
      const first = tabs.value[0];
      changeTab(first ? first : home.value);
    }
    return tab;
  };

  const updateTab = (tab: MaskTab) => {
    const index = tabs.value.findIndex((n) => n.id === tab.id);
    if (index >= 0) {
      const match = tabs.value[index];
      tabs.value.splice(index, 1, Object.assign(match, tab));
    }
  };

  const removeAllTabs = async () => {
    const ret = await ElMessageBox.confirm('是否关闭全部页签', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (!ret) return;
    const items = tabs.value;
    tabs.value = [];
    activeTab(home.value);
    return items;
  };

  const removeOtherTabs = async () => {
    const ret = await ElMessageBox.confirm('是否关闭其他页签', '提示', {
      type: 'warning'
    }).catch(() => false);
    if (!ret) return;
    const match = tabs.value.filter((n) => n.id !== tabValue.value);
    tabs.value = tabs.value.filter((n) => n.id === tabValue.value);
    return match;
  };

  const moveToShow = (tab: MaskTab) => {
    const items = tabs.value.filter((n) => n.id !== tab.id);
    tabs.value = [tab, ...items];
    activeTab(tab);
  };

  const closeCurrnetTab = async (to?: RouteLocationRaw) => {
    if (!currentTab.value) return;
    if (!currentTab.value.closable) return;
    if (isHomeTab(currentTab.value)) return;
    await removeTab(currentTab.value, true);
    await delay(0);
    if (to) {
      router.push(to);
    } else {
      router.push(home.value.url);
    }
  };

  const init = async () => {
    await nextTick();
    const isHome = home.value.url === route.path;
    const menu = getMenuByUrl(route.fullPath);
    if (isHome) {
      tabValue.value = home.value.id;
    } else {
      const tab = await createTab(menu);
      addTab(tab);
    }

    await nextTick();
    active.value = menu || null;
  };

  watch(menus, init);
  watch(route, init, { immediate: true });
  provide(TAB_CREATORS_KEY, tabCreators);

  return {
    tabRef,
    tabs,
    showTabs,
    currentTab,
    changeTab,
    removeTab,
    updateTab,
    addTab,
    home,
    tabValue,
    isCurrentTab,
    activeHome,
    activeTab,
    dropdownTabs,
    removeAllTabs,
    removeOtherTabs,
    moveToShow,
    closeCurrnetTab
  };
}
