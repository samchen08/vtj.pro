<template>
  <XContainer class="x-mask">
    <template v-if="!props.disabled">
      <Sidebar :collapsed="collapsed">
        <template #brand>
          <Brand
            :logo="props.logo"
            :title="props.title"
            :url="home.url"
            :collapsed="collapsed"></Brand>
        </template>
        <SwitchBar
          v-model:collasped="collapsed"
          v-model:favorite="favorite"
          v-model:keyword="keyword"></SwitchBar>
        <Menu
          :collapse="collapsed"
          :keyword="keyword"
          :favorite="favorite"
          :favorites="favorites"
          :flatMenus="flatMenus"
          :menus="menus"
          :active="active"
          @select="select">
        </Menu>
      </Sidebar>
      <XContainer class="x-mask__main" grow shrink flex direction="column">
        <XContainer
          class="x-mask-topbar"
          justify="space-between"
          align="center">
          <Tabs
            ref="tabRef"
            :favorites="favorites"
            :tabs="showTabs"
            :home="home"
            :value="currentTab?.id"
            @click="changeTab"
            @toggleFavorite="toggleFavorite"
            @remove="onRemoveTab"
            @dialog="openDialog"
            @refresh="refresh"></Tabs>

          <Toolbar
            :tabs="dropdownTabs"
            :actions="props.actions"
            :theme="props.theme"
            @closeOtherTabs="onRemoveOtherTabs"
            @closeAllTabs="onRemoveAllTabs"
            @closeTab="onRemoveTab"
            @clickTab="moveToShow"
            @action-click="onActionClick"
            @action-command="onActionCommand">
            <Avatar :avatar="props.avatar">
              <template v-if="$slots.user" #default>
                <slot name="user"> </slot>
              </template>
            </Avatar>
          </Toolbar>
        </XContainer>
        <Content :createView="createView" :exclude="exclude">
          <template v-if="$slots.default">
            <slot></slot>
          </template>
        </Content>
      </XContainer>
    </template>
    <Content v-else :createView="createView" :exclude="exclude">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </Content>
  </XContainer>
</template>
<script lang="ts" setup>
  import { provide } from 'vue';
  import { XContainer, ActionProps, ActionMenuItem } from '../';
  import Sidebar from './components/Sidebar.vue';
  import SwitchBar from './components/SwitchBar.vue';
  import Brand from './components/Brand.vue';
  import Menu from './components/Menu.vue';
  import Tabs from './components/Tabs.vue';
  import Toolbar from './components/Toolbar.vue';
  import Avatar from './components/Avatar.vue';
  import Content from './components/Content.vue';

  import { maskProps, MaskEmits, MASK_KEY, MaskTab } from './types';
  import { useSidebar, useHome, useMenus, useTabs, useContent } from './hooks';
  defineOptions({
    name: 'XMask'
  });

  const props = defineProps(maskProps);
  const emit = defineEmits<MaskEmits>();
  const home = useHome(props);
  const { collapsed, keyword, favorite } = useSidebar(props);
  const { menus, favorites, flatMenus, active, select, toggleFavorite } =
    useMenus(props, emit);
  const {
    tabRef,
    showTabs,
    currentTab,
    changeTab,
    removeTab,
    tabs,
    updateTab,
    isCurrentTab,
    activeHome,
    removeAllTabs,
    removeOtherTabs,
    dropdownTabs,
    moveToShow
  } = useTabs(props, emit, flatMenus, active, home);

  const { createView, openDialog, refresh, exclude, cleanCache, closeDialogs } =
    useContent({
      tabs,
      updateTab,
      isCurrentTab,
      activeHome
    });

  const onRemoveTab = async (tab: MaskTab) => {
    const ret = await removeTab(tab);
    if (ret) {
      await cleanCache([tab]);
    }
  };

  const onRemoveAllTabs = async () => {
    const items = await removeAllTabs();
    if (items) {
      closeDialogs(items);
      await cleanCache(items);
    }
  };

  const onRemoveOtherTabs = async () => {
    const items = await removeOtherTabs();
    if (items) {
      closeDialogs(items);
      await cleanCache(items);
    }
  };

  const onActionClick = (action: ActionProps) => {
    emit('actionClick', action);
  };

  const onActionCommand = (action: ActionProps, item: ActionMenuItem) => {
    emit('actionCommand', action, item);
  };

  provide(MASK_KEY, {
    tabs,
    flatMenus,
    favorites,
    updateTab,
    active,
    currentTab
  });
</script>
