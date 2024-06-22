import { h, createTextVNode } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { sharedFilterOptions } from './shared';
import InputFilter from './components/InputFilter.vue';
import PickerEdit from './components/PickerEdit.vue';

const renderCell = (_renderOpts: any, params: any) => {
  const { row, column } = params;
  return [createTextVNode(row[column.field] || '')];
};

export const XPicker: RendererOptions = {
  cellClassName: 'x-grid__edit',
  autofocus: '.el-select__input',
  renderEdit(renderOpts, params) {
    return [h(PickerEdit, { params, renderOpts })];
  },
  renderCell,
  renderDefault: renderCell,
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return [h(InputFilter, { params, renderOpts })];
  }
};
