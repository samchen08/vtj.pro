<template>
  <ElSubMenu
    v-if="!!props.item.children"
    :disabled="props.item.disabled"
    v-bind="props.subMenu"
    :index="String(props.item.id)">
    <template #title>
      <div class="x-menu__wrapper">
        <XIcon v-if="props.item.icon" :icon="getIcon(props.item.icon)"></XIcon>
        <span v-if="props.item.title" class="x-menu__title">
          {{ props.item.title }}
        </span>
        <ElBadge
          class="x-menu__badge"
          v-if="props.item.badge"
          v-bind="getBadge(props.item.badge)">
          <i></i>
        </ElBadge>
      </div>
    </template>
    <ChildMenuItem
      v-for="child in getShowItems(props.item.children)"
      :key="child.id"
      :item="child"
      :subMenu="props.subMenu"
      :defaultIcon="props.defaultIcon"></ChildMenuItem>
  </ElSubMenu>
  <ElMenuItem
    v-else
    :index="String(props.item.id)"
    :disabled="props.item.disabled">
    <XIcon v-if="props.item.icon" :icon="getIcon(props.item.icon)"></XIcon>
    <template #title>
      <span v-if="props.item.title" class="x-menu__title">
        {{ props.item.title }}
      </span>
      <ElBadge
        class="x-menu__badge"
        v-if="props.item.badge"
        v-bind="getBadge(props.item.badge)">
        <i></i>
      </ElBadge>
    </template>
  </ElMenuItem>
</template>
<script lang="ts" setup>
  import { ElSubMenu, ElMenuItem, ElBadge } from 'element-plus';
  import { XIcon } from '../';
  import type { MenuDataItem, SubMenuProps, MenuBadge } from './types';
  import { XMenuItem as ChildMenuItem } from './components';
  import { getCurrentInstance, type DefineComponent } from 'vue';

  export interface Props {
    item: MenuDataItem;
    subMenu?: SubMenuProps;
    defaultIcon?: DefineComponent<any, any, any, any>;
  }

  defineOptions({
    inheritAttrs: false,
    name: 'XMenuItem'
  });

  const props = defineProps<Props>();
  const instance = getCurrentInstance();

  const getIcon = (name: unknown) => {
    if (!name) return undefined;
    if (typeof name === 'string') {
      const app = instance?.appContext.app;
      return app?.component(name) || props.defaultIcon || name;
    }
    return name;
  };

  const getBadge = (badge: MenuBadge) => {
    return typeof badge === 'object' ? badge : { value: badge };
  };

  const getShowItems = (items: MenuDataItem[] = []) => {
    return items.filter((n) => !n.hidden);
  };
</script>
