<template>
  <VxeGrid
    ref="vxeRef"
    class="x-grid"
    v-bind="vxeProps"
    :columns="columns"
    @custom="onCustom"
    :loading="false"
    @resizable-change="onResize"
    @edit-closed="onEditClosed">
    <template v-for="name in slots" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope"></slot>
    </template>
    <template #loading>
      <div></div>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup>
  import { ref, provide, getCurrentInstance } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import {
    useVxe,
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
  const { vxeProps, getProxyInfo } = useProps(props, slots, emit, vxeRef);
  const { columns, onResize, onCustom, onSort } = useCustom(vxeRef, props);
  const rowSortable = useRowSortable(vxeRef, props, emit);
  const columnSortable = useColumnSortable(vxeRef, props, emit, onSort);
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

  /**
   * 重新加载数据
   */
  const reload = async () => {
    const info = getProxyInfo();
    if (info && props.query) {
      info.pager.currentPage = 1;
      const res = await props.query(info as any).catch(() => null);
      info.pager.total = res?.total || 0;
      vxeRef.value?.reloadData(res?.list || []);
    }
  };

  const loadData = (data: any[], reload?: boolean) => {
    const grid = vxeRef.value;
    if (!grid) return;
    if (reload) {
      grid.reloadData(data);
    } else {
      grid.loadData(data);
    }
  };

  const getRows = () => {
    const grid = vxeRef.value;
    if (!grid) return [];
    const { tableData = [] } = grid.getTableData();
    return tableData;
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
      return grid.getRadioRecord(true);
    }
    const hasCheckbox = !!columns.find((n) => n.type === 'checkbox');
    if (hasCheckbox) {
      return grid.getCheckboxRecords(true);
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
    const ret = await ElMessageBox.confirm('确认删除？', '提示', {
      type: 'warning'
    });
    if (ret) {
      await grid.remove(rows);
      onEditClosed();
    }
  };

  defineExpose({
    vxeRef,
    rowSortable,
    columnSortable,
    insertActived,
    getProxyInfo,
    reload,
    validate,
    getSelected,
    remove,
    getRows,
    loadData,
    setActived
  });

  defineOptions({
    name: 'XGrid',
    inheritAttrs: false
  });
</script>
