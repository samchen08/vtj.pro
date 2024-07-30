<template>
  <div class="x-grid__filter x-grid__DateFilter">
    <ElDatePicker
      size="small"
      placeholder="选择日期筛选"
      value-format="YYYY-MM-DD"
      clearable
      v-model="state.option.value"
      @change="onChange"
      @keyup.enter.stop="onKeyup"
      v-bind="renderProps"
      v-on="renderEvents"></ElDatePicker>
  </div>
</template>
<script lang="ts" setup>
  import { ElDatePicker } from 'element-plus';
  import type { VxeGlobalRendererHandles } from '../../types';
  import { useFilterRender } from '../../hooks';

  export interface Props {
    params: VxeGlobalRendererHandles.RenderFilterParams;
    renderOpts: VxeGlobalRendererHandles.RenderFilterOptions;
  }

  const props = defineProps<Props>();

  const { renderProps, renderEvents, state, load, onChange, onKeyup } =
    useFilterRender(props.renderOpts, props.params);

  load();

  defineOptions({
    name: 'DateFilter'
  });
</script>
