<template>
  <div class="x-grid__filter">
    <SelectEditor
      size="small"
      placeholder="选择筛选项"
      clearable
      v-model="state.option.value"
      @change="onChange"
      @keyup.enter.stop="onKeyup"
      v-bind="renderProps"
      v-on="renderEvents"></SelectEditor>
  </div>
</template>
<script lang="ts" setup>
  import SelectEditor from '../../../field/editors/SelectEditor.vue';
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
    name: 'SelectFilter'
  });
</script>
