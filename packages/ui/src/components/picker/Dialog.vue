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
      @cell-dblclick="onDblClick">
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
  import type { PickerColumns, PrickerFields, PickerLoader } from './types';
  import {
    VtjIconNpSearch,
    VtjIconNpReturn,
    VtjIconDatabase
  } from '@vtj/icons';

  export interface Props {
    gridProps?: any;
    formProps?: any;
    columns?: PickerColumns;
    fields?: PrickerFields;
    loader?: PickerLoader;
    formModel?: Record<string, any>;
    multiple?: boolean;
    onPick: (rows: any[]) => void;
  }

  const props = defineProps<Props>();
  const gridRef = ref();

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
    if (props.multiple) return;
    props.onPick(e.row);
  };

  onMounted(() => {
    gridRef.value?.vxeRef.focus();
  });

  const onKeydown = (e: any) => {
    if (e.$event.key !== 'Enter') return;
    if (props.multiple) {
      pick();
    } else {
      const { row } = gridRef.value?.vxeRef.getSelectedCell();
      if (row) {
        props.onPick(row);
      }
    }
  };

  const onLoaded = () => {
    gridRef.value?.setSelectCell();
  };
</script>
