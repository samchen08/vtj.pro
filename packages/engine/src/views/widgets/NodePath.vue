<template>
  <ElBreadcrumb
    v-if="selected"
    class="vtj-nodepath"
    :separator-icon="ArrowRight">
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
  import { ArrowRight } from '@element-plus/icons-vue';
  import { useDesigner } from '../../hooks';
  import {
    emitter,
    EVENT_OUTLINE_SELECTED,
    EVENT_OUTLINE_HOVER
  } from '../../core';

  const { selected } = useDesigner();

  const paths = computed<any[]>(() => {
    const path = (selected.value?.path || []).slice(0);
    return path.reverse();
  });

  const onSelected = (node: any) => {
    emitter.emit(EVENT_OUTLINE_SELECTED, node);
  };

  const onMouseOver = (node: any) => {
    emitter.emit(EVENT_OUTLINE_HOVER, node);
  };
</script>

<style lang="scss">
  .vtj-nodepath {
    font-size: 12px;
    padding: 0 20px;
    .el-breadcrumb__item {
      cursor: pointer;
      font-size: 12px;
    }
  }
</style>
