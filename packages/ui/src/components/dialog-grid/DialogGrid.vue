<template>
  <XDialog
    ref="dialogRef"
    class="x-dialog-grid"
    submit
    cancel
    primary
    v-model="modelValue"
    @submit="onSubmit">
    <XGrid
      ref="gridRef"
      editable
      :columns="props.columns"
      :data="tableData"
      :edit-rules="props.rules"
      v-bind="props.gridProps">
      <template #toolbar__buttons>
        <XAction
          v-if="props.plus"
          size="small"
          label="增行"
          type="primary"
          :icon="Plus"
          @click="addRow"></XAction>
        <XAction
          v-if="props.minus"
          size="small"
          label="删行"
          type="default"
          :icon="Minus"
          @click="removeRow"></XAction>
        <slot name="buttons"></slot>
      </template>
      <template #top>
        <slot name="top"></slot>
      </template>
    </XGrid>
    <template #extra>
      <slot name="extra"></slot>
    </template>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import { delay } from '@vtj/utils';
  import { XDialog } from '../dialog';
  import { XGrid } from '../grid';
  import { XAction } from '../action';
  import { Plus, Minus } from '@vtj/icons';
  import type { DialogGridProps, DialogGridEmits } from './types';

  const gridRef = ref();
  const dialogRef = ref();

  const props = withDefaults(defineProps<DialogGridProps>(), {
    plus: true,
    minus: true
  });

  const emit = defineEmits<DialogGridEmits>();
  const modelValue = defineModel<boolean>();
  const $vtjEl = computed(() => dialogRef.value?.$vtjEl);

  const tableData = computed(() => {
    return props.formatter ? props.formatter(props.model) : props.model;
  });

  const addRow = () => {
    gridRef.value?.insertActived();
  };

  const removeRow = () => {
    if (!gridRef.value) return;
    const rows = gridRef.value.getSelected() || [];
    gridRef.value.remove(rows);
  };

  const validate = async () => {
    if (!gridRef.value) return false;
    return !(await gridRef.value.validate());
  };

  const onSubmit = async () => {
    if (!gridRef.value) return;
    const valid = await validate();
    if (valid) {
      const rows = gridRef.value.getRows();
      const data = props.valueFormatter ? props.valueFormatter(rows) : rows;
      if (props.submitMethod) {
        const ret = await props.submitMethod(data);
        if (ret) {
          modelValue.value = false;
        }
      }
      emit('submit', data);
    }
  };

  watch(gridRef, async (grid) => {
    if (grid) {
      await delay();
      grid.doLayout();
    }
  });

  defineOptions({
    name: 'XDialogGrid'
  });

  defineExpose({
    $vtjEl,
    gridRef,
    dialogRef,
    addRow,
    removeRow,
    validate
  });
</script>
