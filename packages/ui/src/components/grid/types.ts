import type { ComponentPropsType } from '../shared';
import { gridProps } from './props';
import Sortable from 'sortablejs';
import type Grid from './Grid.vue';

import type {
  VxeGridInstance,
  VxeTableDefines,
  VxeGridPropTypes,
  VxeGridDefines,
  VxeColumnPropTypes,
  VxeGridEvents,
  VxeGridProps,
  VxeGlobalRendererHandles,
  VxeColumnSlotTypes,
  DefineRendererOption,
  VxeGlobalInterceptorHandles
} from 'vxe-table';

export type GridSortableOptions = Sortable.Options;

export type GridSortableRowInfo = {
  rowid: string;
  item: any;
  items: any[];
  index: number;
  parent?: any;
};

export interface GridSortableEvent {
  info: GridSortableRowInfo | VxeTableDefines.ColumnInfo | null;
  newIndex?: number;
  oldIndex?: number;
  e: Sortable.SortableEvent;
}

export type GridColumns = VxeGridPropTypes.Columns;

export type GridCustomInfo = {
  id: string;
  resize?: Record<string, number>;
  visible?: Record<string, boolean>;
  sort?: string[];
  fixed?: Record<string, VxeColumnPropTypes.Fixed>;
};

export type GridCellRender = VxeColumnPropTypes.CellRender & {
  props:
    | ((
        params: VxeGlobalRendererHandles.RenderDefaultParams
      ) => Record<string, any>)
    | Record<string, any>;
};

export type GridCellRenders = Record<string, string | GridCellRender>;

export type GridEditRender = VxeColumnPropTypes.EditRender & {
  props:
    | ((
        params: VxeGlobalRendererHandles.RenderEditParams
      ) => Record<string, any>)
    | Record<string, any>;
};

export type GridEditRenders = Record<string, string | GridEditRender>;

export type GridFilterRender = VxeColumnPropTypes.FilterRender & {
  props:
    | ((
        params: VxeGlobalRendererHandles.RenderFilterParams
      ) => Record<string, any>)
    | Record<string, any>;
};

export type GridFilterRenders = Record<string, string | GridFilterRender>;

export type GridProps = ComponentPropsType<typeof gridProps>;

export type GridEmits = {
  rowSort: [e: GridSortableEvent];
  columnSort: [e: GridSortableEvent];
  cellSelected: [params: any];
  editChange: [data: any[]];
};

export type GridInstance = InstanceType<typeof Grid>;

export type {
  VxeGridInstance,
  VxeTableDefines,
  VxeGridPropTypes,
  VxeColumnPropTypes,
  VxeGridEvents,
  VxeGridDefines,
  VxeGridProps,
  VxeGlobalRendererHandles,
  VxeColumnSlotTypes,
  DefineRendererOption,
  VxeGlobalInterceptorHandles
};
