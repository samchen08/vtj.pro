<template>
  <ElBreadcrumb v-if="selected" class="v-nodepath-widget" :separator-icon="ArrowRight">
    <ElBreadcrumbItem
      v-for="item in paths"
      @click="onSelected(item)"
      @mouseover="onMouseOver(item)">
      {{ item.name }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
  import { ArrowRight } from '@vtj/icons';

  import { useSelected } from '../../hooks';

  const { selected, designer } = useSelected();

  const paths = computed(() => {
    const path = (selected.value?.path || []).slice(0);
    return path.reverse();
  });

  const onSelected = (node: any) => {
    designer.value?.setSelected(node);
  };

  const onMouseOver = (node: any) => {
    designer.value?.setHover(node);
  };

  defineOptions({
    name: 'NodePathWidget',
    inheritAttrs: false
  });
</script>
