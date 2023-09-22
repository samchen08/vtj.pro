<template>
  <XContainer
    v-show="!props.favorite && !props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-show="props.collapse"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="menus"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      @select="onSelect"></XMenu>
    <XMenu
      v-show="!props.collapse"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true
      }"
      :data="menus"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      @select="onSelect"></XMenu>
    <ElEmpty v-if="!menus.length" description="暂无菜单数据"></ElEmpty>
  </XContainer>

  <XContainer
    v-show="props.favorite && !props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-show="props.collapse"
      class="x-mask-menu__favorites"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="favorites"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[FAVORITES_KEY]"
      @select="onSelect"></XMenu>

    <XMenu
      v-show="!props.collapse"
      class="x-mask-menu__favorites"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="favorites"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[FAVORITES_KEY]"
      @select="onSelect"></XMenu>
  </XContainer>

  <XContainer
    v-if="props.keyword"
    v-show="!!props.keyword"
    class="x-mask-menu"
    grow
    :flex="false"
    overflow="auto">
    <XMenu
      v-show="props.collapse"
      class="x-mask-menu__search"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="searchResult"
      :default-icon="Document"
      :collapse="true"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[SEARCH_KEY]"
      @select="onSelect"></XMenu>

    <XMenu
      v-show="!props.collapse"
      class="x-mask-menu__search"
      :subMenu="{
        popperClass: 'x-mask-menu-popper',
        teleported: true,
        showTimeout: 200,
        hideTimeout: 200
      }"
      :data="searchResult"
      :default-icon="Document"
      :collapse="false"
      :collapse-transition="false"
      :default-active="defaultActive"
      :default-openeds="[SEARCH_KEY]"
      @select="onSelect"></XMenu>
  </XContainer>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { XContainer, XMenu, MenuDataItem } from '../../';
  import { Document, Star, Search } from '@element-plus/icons-vue';
  import { ElEmpty } from 'element-plus';

  export interface Props {
    collapse?: boolean;
    keyword?: string;
    favorite?: boolean;
    favorites?: MenuDataItem[];
    flatMenus?: MenuDataItem[];
    menus?: MenuDataItem[];
    active?: MenuDataItem | null;
  }
  const FAVORITES_KEY = '__favorites__';
  const SEARCH_KEY = '__search__';

  const props = withDefaults(defineProps<Props>(), { collapse: false });
  const menus = computed(() => props.menus || []);
  const emit = defineEmits<{
    select: [item: MenuDataItem];
  }>();

  const defaultActive = computed(() => String(props.active?.id));

  const favorites = computed(() => {
    return [
      {
        id: FAVORITES_KEY,
        title: '收藏',
        icon: Star,
        children: props.favorites?.length
          ? props.favorites
          : [
              {
                id: FAVORITES_KEY + 'empty',
                disabled: true,
                title: '暂无收藏菜单'
              }
            ]
      }
    ];
  });

  const searchResult = computed(() => {
    const keyword = (props.keyword || '').trim();
    const list: MenuDataItem[] = keyword
      ? (props.flatMenus || []).filter((n) => n.title?.includes(keyword))
      : [];

    return [
      {
        id: SEARCH_KEY,
        title: '搜索',
        icon: Search,
        children: list?.length
          ? list
          : [
              {
                id: SEARCH_KEY + 'empty',
                disabled: true,
                title: '查询匹配不到菜单项'
              }
            ]
      }
    ];
  });

  const onSelect = (item: MenuDataItem) => {
    emit('select', item);
  };
</script>
