<template>
  <VxeGrid
    ref="vxeRef"
    class="x-grid"
    v-bind="vxeProps"
    :columns="columns"
    @custom="onCustom"
    :loading="false"
    @resizable-change="onResize">
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

  const reload = async () => {
    const info = getProxyInfo();
    if (info && props.query) {
      info.pager.currentPage = 1;
      const res = await props.query(info as any).catch(() => null);
      info.pager.total = res?.total || 0;
      vxeRef.value?.reloadData(res?.list || []);
    }
  };

  defineExpose({
    vxeRef,
    rowSortable,
    columnSortable,
    insertActived,
    getProxyInfo,
    reload
  });

  defineOptions({
    name: 'XGrid',
    inheritAttrs: false
  });
</script>
