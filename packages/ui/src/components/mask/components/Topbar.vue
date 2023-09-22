<template>
  <XContainer class="x-mask-topbar" justify="space-between" align="center">
    <slot></slot>

    <!-- <Tabs
      ref="tabsRef"
      @click="onTabClick"
      @remove="onTabRemove"
      @home="onHomeClick"
      :tabs="tabs"
      :items="showTabs"></Tabs>
    <Toolbar
      :tabs="menuTabs"
      @closeAllTabs="onRemoveAll"
      @closeOtherTabs="onRemoveOther"
      @clickTab="onChangeTab"
      @closeTab="onTabRemove"></Toolbar> -->
  </XContainer>
</template>
<script lang="ts" setup>
  // import { ref, computed, nextTick } from 'vue';
  // import { useRouter } from 'vue-router';
  // import { XContainer, MenuDataItem } from '../../';

  // import { useElementSize } from '@vueuse/core';
  // import { useInjectState } from '../hooks';

  // const emit = defineEmits<{
  //   tabClick: [menu: MenuDataItem];
  //   tabRemove: [menu: MenuDataItem];
  //   homeClick: [];
  // }>();
  // const state = useInjectState();
  // const TAB_ITEM_WIDTH = 150;
  // const tabsRef = ref();
  // const tabs = computed(() => state.tabs.value);
  // const { width } = useElementSize(tabsRef);
  // const showCount = computed(() => Math.floor(width.value / TAB_ITEM_WIDTH));
  // const showTabs = computed(() => tabs.value.slice(0, showCount.value));
  // const menuTabs = computed(() => tabs.value.slice(showCount.value));
  // const router = useRouter();

  // const onTabClick = (menu: MenuDataItem) => {
  //   emit('tabClick', menu);
  // };

  // const onTabRemove = (menu: MenuDataItem) => {
  //   emit('tabRemove', menu);
  // };

  // const onHomeClick = () => {
  //   emit('homeClick');
  // };

  // const onRemoveAll = () => {
  //   const home = state.home.value;
  //   state.tabs.value = [];
  //   state.activeMenu.value = home;
  //   if (home?.url) {
  //     router.push(home.url).catch((e) => e);
  //   }
  // };

  // const onRemoveOther = () => {
  //   const active = state.activeMenu.value;
  //   state.tabs.value = state.tabs.value.filter((n) => n.id === active?.id);
  // };

  // const onChangeTab = async (menu: MenuDataItem) => {
  //   const items = state.tabs.value.filter((n) => n.id !== menu.id);
  //   state.tabs.value = [menu, ...items];
  //   await nextTick();
  //   onTabClick(menu);
  // };
</script>
