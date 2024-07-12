<template>
  <ElInput
    ref="inputRef"
    :suffix-icon="EditPen"
    readonly
    @focus="open"
    :model-value="inputString"
    v-bind="$attrs"></ElInput>
  <XDialogGrid
    v-model="dialogVisible"
    :title="props.title"
    :model="props.modelValue"
    :columns="props.columns"
    :formatter="props.formatter"
    :valueFormatter="props.valueFormatter"
    :rules="props.rules"
    :plus="props.plus"
    :minus="props.minus"
    :submit-method="submit"
    :grid-props="props.gridProps"
    v-bind="props.dialogProps"></XDialogGrid>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { ElInput } from 'element-plus';
  import { EditPen } from '@vtj/icons';
  import { XDialogGrid } from '../dialog-grid';

  import type { GridEditorProps, GridEditorEmits } from './types';
  const props = withDefaults(defineProps<GridEditorProps>(), {
    plus: true,
    minus: true
  });
  const emit = defineEmits<GridEditorEmits>();
  const dialogVisible = ref(false);
  const inputRef = ref();
  const inputString = computed(() =>
    typeof props.modelValue === 'object'
      ? JSON.stringify(props.modelValue)
      : props.modelValue
  );

  const open = () => {
    dialogVisible.value = true;
  };

  const focus = () => {
    inputRef.value?.focus();
  };

  const blur = () => {
    inputRef.value?.blur();
  };

  const submit = async (data: any) => {
    emit('change', data);
    emit('update:modelValue', data);
    return true;
  };

  defineOptions({
    name: 'XGridEditor'
  });

  defineExpose({
    open,
    dialogVisible,
    focus,
    blur
  });
</script>
