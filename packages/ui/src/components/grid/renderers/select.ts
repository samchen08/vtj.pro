import { h, createTextVNode } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { sharedFilterOptions } from './shared';
import SelectEdit from './components/SelectEdit.vue';
import SelectFilter from './components/SelectFilter.vue';
import { baseRendererOptions } from './input';

export const XSelect: RendererOptions = {
  ...baseRendererOptions,
  cellClassName: 'x-grid__edit',
  autofocus: '.el-select__input',
  renderEdit(renderOpts, params) {
    return [h(SelectEdit, { params, renderOpts })];
  },
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return [h(SelectFilter, { params, renderOpts })];
  },
  renderDefault(_renderOpts, params) {
    const { row, column } = params;
    return [createTextVNode(row[column.field] ?? '')];
  },
  renderCell(_renderOpts, params) {
    const { row, column } = params;
    return [createTextVNode(row[column.field] ?? '')];
  }
};
