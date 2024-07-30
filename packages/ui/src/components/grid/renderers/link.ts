import { h } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { createCellRenderProps } from '../utils';
import { ElLink } from 'element-plus';
import { baseRendererOptions } from './input';

export const XLink: RendererOptions = {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-link',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return [h(
      ElLink,
      { type: 'primary', target: '_blank', href: cellValue, ...props },
      () => cellValue
    )];
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return [h(
      ElLink,
      { type: 'primary', target: '_blank', href: cellValue, ...props },
      () => cellValue
    )];
  }
};
