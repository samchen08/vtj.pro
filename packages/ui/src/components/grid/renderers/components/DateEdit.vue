<template>
  <ElDatePicker
    size="small"
    clearable
    value-format="YYYY-MM-DD"
    v-model="cellValue"
    @change="onChange"
    v-bind="renderProps"></ElDatePicker>
</template>
<script lang="ts" setup>
  import type { VxeGlobalRendererHandles } from '../../types';
  import { ElDatePicker } from 'element-plus';
  import { useEditRender } from '../../hooks';
  export interface Props {
    params: VxeGlobalRendererHandles.RenderEditParams;
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions;
  }
  const props = defineProps<Props>();
  const { renderProps, cellValue, onChange } = useEditRender(
    props.renderOpts,
    props.params
  );

  defineOptions({
    name: 'DateEdit'
  });
</script>
