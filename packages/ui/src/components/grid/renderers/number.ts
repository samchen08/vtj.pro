import { h, createTextVNode } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { sharedFilterOptions } from './shared';
import NumberEdit from './components/NumberEdit.vue';
import NumberFilter from './components/NumberFilter.vue';

export const baseRendererOptions: RendererOptions = {
  autofocus: '.el-input__inner',
  renderDefault(_renderOpts, params) {
    const { row, column } = params;
    return [createTextVNode(row[column.field] ?? '')];
  },
  renderEdit(renderOpts, params) {
    return [h(NumberEdit, { params, renderOpts })];
  },
  renderCell(_renderOpts, params) {
    const { row, column } = params;
    return [createTextVNode(row[column.field] ?? '')];
  }
};

export const XNumber: RendererOptions = {
  cellClassName: 'x-grid__edit',
  ...baseRendererOptions,
  ...sharedFilterOptions,
  renderFilter(renderOpts, params) {
    return [h(NumberFilter, { params, renderOpts })];
  }
};
