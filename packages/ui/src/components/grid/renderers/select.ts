import { h, createTextVNode } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { sharedFilterOptions } from './shared';
import SelectEdit from './components/SelectEdit.vue';
import SelectFilter from './components/SelectFilter.vue';
import { baseRendererOptions } from './input';

function renderCell(renderOpts: any, params: any) {
  const { props = {} } = renderOpts;
  const { options = [], multiple, parser } = props;
  const { row, column } = params;
  const value = row[column.field] ?? '';
  let label;
  if (Array.isArray(options)) {
    if (multiple) {
      const values = parser ? parser(value) : value || [];
      const matches = options.filter((n) => values.includes(n.value));
      label = matches.map((n) => n.label).join(',');
    } else {
      const option = options.find((n) => n.value === value);
      label = option?.label;
    }
  }
  return [createTextVNode(label || value)];
}

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
  renderDefault: renderCell,
  renderCell
};
