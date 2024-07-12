import { h, createTextVNode } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { sharedFilterOptions } from './shared';
import InputFilter from './components/InputFilter.vue';
import GridEdit from './components/GridEdit.vue';

const renderCell = (_renderOpts: any, params: any) => {
  const { row, column } = params;
  return [createTextVNode(row[column.field] || '')];
};

export const XGrider: RendererOptions = {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-input__inner',
  renderEdit(renderOpts, params) {
    return [h(GridEdit, { params, renderOpts })];
  },
  renderCell,
  renderDefault: renderCell,
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return [h(InputFilter, { params, renderOpts })];
  }
};
