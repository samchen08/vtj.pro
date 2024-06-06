<template>
  <SelectEditor
    size="small"
    clearable
    v-model="cellValue"
    @change="onChange"
    v-bind="renderProps"></SelectEditor>
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
  const { renderProps, cellValue, onChange } = useEditRender(
    props.renderOpts,
    props.params
  );

  defineOptions({
    name: 'SelectEdit'
  });
</script>
