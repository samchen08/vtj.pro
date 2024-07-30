import { h } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { createCellRenderProps } from '../utils';
import { ElText } from 'element-plus';
import { baseRendererOptions } from './input';

export const XText: RendererOptions = {
  ...baseRendererOptions,
  cellClassName: 'x-grid__x-text',
  renderDefault(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return [h(ElText, { ...props }, () => cellValue)];
  },
  renderCell(renderOpts, params) {
    const { props, cellValue } = createCellRenderProps(renderOpts, params);
    return [h(ElText, { ...props }, () => cellValue)];
  }
};
