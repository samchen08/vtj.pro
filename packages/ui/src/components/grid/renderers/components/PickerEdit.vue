<template>
  <XPicker
    ref="elRef"
    size="small"
    v-model="cellValue"
    @change="onChange"
    :data="props.params"
    v-bind="renderProps"
    v-on="renderEvents"></XPicker>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import type { VxeGlobalRendererHandles } from '../../types';
  import { XPicker } from '../../../picker';
  import { useEditRender } from '../../hooks';
  export interface Props {
    params: VxeGlobalRendererHandles.RenderEditParams;
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions;
  }
  const props = defineProps<Props>();
  const elRef = ref();
  const { renderProps, renderEvents, cellValue, onChange } = useEditRender(
    props.renderOpts,
    props.params
  );

  onMounted(() => {
    elRef.value?.focus();
  });

  defineOptions({
    name: 'PickerEdit'
  });
</script>
