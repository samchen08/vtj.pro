import { h } from 'vue';
import type { RendererOptions } from 'vxe-table';
import { createCellRenderProps } from '../utils';
import { XActionBar } from '../../action-bar';

export const XActions: RendererOptions = {
  cellClassName: 'x-grid__x-actions',
  renderDefault(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return [h(XActionBar, { ...props })];
  },
  renderCell(renderOpts, params) {
    const { props } = createCellRenderProps(renderOpts, params);
    return [h(XActionBar, { ...props })];
  }
};
