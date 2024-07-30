<template>
  <ElInput
    size="small"
    clearable
    v-model="cellValue"
    @input="onChange"
    v-bind="renderProps"
    v-on="renderEvents"></ElInput>
</template>
<script lang="ts" setup>
  import { ElInput } from 'element-plus';
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
    name: 'InputEdit'
  });
</script>
