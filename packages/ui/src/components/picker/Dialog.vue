<template>
  <XDialog
    title="选择数据"
    width="70%"
    height="70%"
    :icon="VtjIconDatabase"
    primary
    resizable
    maximizable>
    <XGrid
      ref="gridRef"
      v-if="props.columns && props.columns.length"
      :columns="props.columns"
      pager
      auto-resize
      resizable
      virtual
      :checkbox-config="{ highlight: true, trigger: 'row' }"
      :radio-config="{ highlight: true, trigger: 'row' }"
      :row-config="{ isHover: true }"
      :mouse-config="{ selected: true }"
      editable
      :keyboard-config="{ isArrow: true, isChecked: true, isEnter: false }"
      :loader="props.loader"
      @keydown="onKeydown"
      @loaded="onLoaded"
      @cell-dblclick="onDblClick"
      v-bind="props.gridProps">
      <template #toolbar__buttons>
        <XAction
          label="查询"
          type="primary"
          :icon="VtjIconNpSearch"
          @click="onSearch"></XAction>
        <XAction
          label="返回数据"
          type="primary"
          :icon="VtjIconNpReturn"
          @click="pick"></XAction>
      </template>
      <template v-if="props.fields" #form>
        <XQueryForm
          :model="props.formModel"
          :items="props.fields"
          @submit="onFormSubmit"
          v-bind="props.formProps"></XQueryForm>
      </template>
    </XGrid>
  </XDialog>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElNotification } from 'element-plus';
  import { XDialog } from '../dialog';
  import { XGrid } from '../grid';
  import { XAction } from '../action';
  import { XQueryForm } from '../query-form';
  import type { PickerColumns, PickerFields, PickerLoader } from './types';
  import {
    VtjIconNpSearch,
    VtjIconNpReturn,
    VtjIconDatabase
  } from '@vtj/icons';

  export interface Props {
    gridProps?: any;
    formProps?: any;
    columns?: PickerColumns;
    fields?: PickerFields;
    loader?: PickerLoader;
    formModel?: Record<string, any>;
    multiple?: boolean;
    onPick: (rows: any[]) => void;
  }

  const props = defineProps<Props>();
  const gridRef = ref();

  // const columnsComputed = computed(() => props.columns ?? []);

  const onSearch = () => {
    gridRef.value?.search();
  };

  const pick = () => {
    const rows = gridRef.value?.getSelected();
    if (!rows || (Array.isArray(rows) && !rows.length)) {
      ElNotification.info({
        message: '请选择需要返回的行数据'
      });
      return;
    }
    props.onPick(rows);
  };

  const onDblClick = (e: any) => {
    props.onPick(props.multiple ? [e.row] : e.row);
  };

  onMounted(() => {
    gridRef.value?.vxeRef.focus();
  });

  const onKeydown = (e: any) => {
    if (e.$event.key !== 'Enter') return;
    e.$event.stopPropagation();
    e.$event.preventDefault();
    const nodeName = e.$event.target.nodeName || '';
    const inputs = ['INPUT', 'SELECT', 'RADIO', 'CHECKBOX'];
    if (inputs.includes(nodeName.toUpperCase())) {
      return;
    }

    if (props.multiple) {
      pick();
    } else {
      const { row } = gridRef.value?.vxeRef.getSelectedCell() || {};
      if (row) {
        props.onPick(row);
      }
    }
    return false;
  };

  const onLoaded = () => {
    gridRef.value?.setSelectCell();
  };

  const onFormSubmit = () => {
    onSearch();
  };

  defineExpose({
    pick,
    gridRef
  });
</script>
