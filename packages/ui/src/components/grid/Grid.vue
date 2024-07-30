<template>
  <VxeGrid
    ref="vxeRef"
    class="x-grid"
    v-bind="vxeProps"
    :columns="columns"
    @custom="onCustom"
    :loading="false"
    @resizable-change="onResize"
    @edit-closed="onEditClosed"
    @filter-change="onFilterChange"
    @sort-change="onSortChange">
    <template v-for="name in slots" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
    <template #empty>
      <slot name="empty">
        <ElEmpty></ElEmpty>
      </slot>
    </template>
    <template #pager>
      <ElPagination
        v-if="props.pager"
        class="x-grid__pager"
        size="small"
        background
        layout="slot, -> ,total, sizes, prev, pager, next, jumper"
        :page-sizes="props.pageSizes"
        :default-page-size="props.pageSizes[0]"
        v-model:current-page="state.page"
        :v-model:page-size="state.pageSize"
        :total="state.total"
        @change="onPagerChange">
        <slot name="pager__left"></slot>
      </ElPagination>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup>
  import { ref, provide, getCurrentInstance } from 'vue';
  import {
    ElMessageBox,
    ElPagination,
    ElNotification,
    ElEmpty
  } from 'element-plus';
  import {
    useVxe,
    useLoader,
    useProps,
    useRowSortable,
    useColumnSortable,
    useCustom,
    useVxeSlots
  } from './hooks';
  import { gridProps, GridInstanceKey } from './props';
  import type { VxeGridInstance, GridEmits } from './types';
  const { VxeGrid } = useVxe();
  const vxeRef = ref<VxeGridInstance>();
  const props = defineProps(gridProps);
  const emit = defineEmits<GridEmits>();
  const slots = useVxeSlots();
  const { vxeProps } = useProps(props, slots, emit);
  const { columns, onResize, onCustom, onSort } = useCustom(vxeRef, props);
  const rowSortable = useRowSortable(vxeRef, props, emit);
  const columnSortable = useColumnSortable(vxeRef, props, emit, onSort);
  const {
    state,
    onPagerChange,
    onFilterChange,
    onSortChange,
    load,
    search,
    doLayout
  } = useLoader(props, vxeRef, emit);
  const instance = getCurrentInstance();
  provide(GridInstanceKey, instance);

  /**
   * 新增行，并激活编辑状态
   */
  const insertActived = async (record: any = {}, row: any = -1) => {
    if (!props.editable) {
      console.warn('XGrid在编辑模式需要开启editable');
    }
    const instance = vxeRef.value;
    if (!instance) return;
    const { row: newRow } = await instance.insertAt(record, row);
    await instance.setEditRow(newRow);
  };

  const setActived = async (row: any) => {
    return vxeRef.value?.setEditRow(row);
  };

  const getRows = () => {
    const grid = vxeRef.value;
    if (!grid) return [];
    const { fullData = [] } = grid.getTableData();
    return fullData;
  };

  const getColumns = () => {
    const grid = vxeRef.value;
    if (!grid) return [];
    return grid.getColumns();
  };

  const validate = async () => {
    const rows = getRows();
    return vxeRef.value?.validate(rows);
  };

  const getSelected = () => {
    const grid = vxeRef.value;
    if (!grid) return null;
    const columns = grid.getColumns();
    const hasRadio = !!columns.find((n) => n.type === 'radio');
    if (hasRadio) {
      return grid.getRadioRecord(false);
    }
    const hasCheckbox = !!columns.find((n) => n.type === 'checkbox');
    if (hasCheckbox) {
      return grid.getCheckboxRecords(false);
    }
    return null;
  };

  const onEditClosed = () => {
    const rows = getRows();
    emit('editChange', rows);
  };

  const remove = async (rows: any) => {
    const grid = vxeRef.value;
    if (!grid) return;
    if (!rows || (Array.isArray(rows) && !rows.length)) {
      ElNotification.info({
        message: '请选择需要删除的数据'
      });
      return;
    }
    const ret = await ElMessageBox.confirm('确认删除数据？', '提示', {
      type: 'warning'
    });
    if (ret) {
      await grid.remove(rows);
      onEditClosed();
    }
  };

  const getRecords = () => {
    return vxeRef.value?.getRecordset();
  };

  const setSelectCell = (row?: any, column?: any) => {
    if (!vxeRef.value) return;
    if (!row) {
      const rows = getRows();
      const columns = getColumns();
      vxeRef.value.setSelectCell(rows[0], columns[0]);
    } else {
      vxeRef.value.setSelectCell(row, column ?? getColumns()[0]);
    }
    vxeRef.value.focus();
  };

  const $vtjDynamicSlots = () => {
    const { fullColumn = [] } = vxeRef.value?.getTableColumn() || {};
    let result: string[] = [];
    for (const col of fullColumn) {
      const slots = Object.values(col.slots || {}).filter(
        (v) => typeof v === 'string'
      );
      result = result.concat(slots as string[]);
    }
    return result;
  };

  defineExpose({
    state,
    load,
    search,
    vxeRef,
    rowSortable,
    columnSortable,
    insertActived,
    validate,
    getSelected,
    remove,
    getRows,
    setActived,
    doLayout,
    getRecords,
    setSelectCell,
    $vtjDynamicSlots
  });

  defineOptions({
    name: 'XGrid',
    inheritAttrs: false
  });
</script>
