<template>
  <ElMenu class="x-menu" v-bind="$attrs" @select="onSelect">
    <XMenuItem
      v-for="item in items"
      :item="{ ...item, icon: item.icon }"
      :defaultIcon="props.defaultIcon"
      :subMenu="props.subMenu"></XMenuItem>
  </ElMenu>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElMenu } from 'element-plus';
  import type { MenuProps, MenuDataItem, MenuEmits } from './types';
  import { XMenuItem } from './components';

  defineOptions({
    inheritAttrs: false,
    name: 'XMenu'
  });

  const props = withDefaults(defineProps<MenuProps>(), {
    data: () => [],
    subMenuProps: () => ({})
  });

  const emit = defineEmits<MenuEmits>();

  const items = computed(() => props.data.filter((n) => !n.hidden));

  const findItem = (data: MenuDataItem[], id: string | number) => {
    const finder = (
      id: string | number,
      items: MenuDataItem[] = []
    ): MenuDataItem | undefined => {
      for (const item of items) {
        if (item.id.toString() === id.toString()) {
          return item;
        } else {
          if (item.children?.length) {
            const match = finder(id, item.children);
            if (match) {
              return match;
            }
          }
        }
      }
    };
    return finder(id, data);
  };

  const onSelect = (id: string | number) => {
    const item = findItem(items.value, id);
    if (item) {
      emit('select', item);
    }
  };
</script>
