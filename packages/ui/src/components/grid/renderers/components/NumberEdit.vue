<template>
  <ElInputNumber
    size="small"
    clearable
    v-model="cellValue"
    @input="onChange"
    v-bind="renderProps"
    v-on="renderEvents"></ElInputNumber>
</template>
<script lang="ts" setup>
  import { ElInputNumber } from 'element-plus';
  import type { VxeGlobalRendererHandles } from '../../types';
  import { useEditRender } from '../../hooks';
  export interface Props {
    params: VxeGlobalRendererHandles.RenderEditParams;
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions;
  }
  const props = defineProps<Props>();
  const { renderProps, renderEvents, cellValue, onChange } = useEditRender(
    props.renderOpts,
    props.params
  );

  defineOptions({
    name: 'NumberEdit'
  });
</script>
