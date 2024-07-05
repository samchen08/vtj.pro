<template>
  <SelectEditor
    size="small"
    clearable
    v-model="cellValue"
    @change="onChange"
    v-bind="renderProps"
    v-on="renderEvents"></SelectEditor>
</template>
<script lang="ts" setup>
  import type { VxeGlobalRendererHandles } from '../../types';
  import SelectEditor from '../../../field/editors/SelectEditor.vue';
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
    name: 'SelectEdit'
  });
</script>
