<template>
  <div class="x-grid__filter">
    <ElInputNumber
      size="small"
      placeholder="输入数量回车筛选"
      clearable
      v-model="state.option.value"
      @input="onChange"
      @keyup.enter.stop="onKeyup"
      v-bind="renderProps"
      v-on="renderEvents"></ElInputNumber>
  </div>
</template>
<script lang="ts" setup>
  import { ElInputNumber } from 'element-plus';
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
    name: 'NumberFilter'
  });
</script>
