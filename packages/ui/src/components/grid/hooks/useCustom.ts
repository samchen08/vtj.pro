import { type MaybeRef, shallowRef, unref, watch } from 'vue';
import { cloneDeep } from '@vtj/utils';
import type {
  VxeGridInstance,
  GridProps,
  VxeGridPropTypes,
  VxeGridDefines,
  GridCustomInfo,
  GridSortableEvent,
  VxeTableDefines,
  VxeColumnPropTypes,
  GridColumns
} from '../types';
import { mergeCustomInfo, getName } from '../utils';
import { useAdapter } from '../../../adapter';

function createColumns(props: GridProps) {
  const {
    columns = [],
    cellRenders = {},
    filterRenders = {},
    editRenders = {},
    editable
  } = props;
  const cloneColumns = cloneDeep(columns);
  for (const col of cloneColumns) {
    const { field, children = [] } = col;
    if (field) {
      if (editable && editRenders[field]) {
        const render = editRenders[field];
        col.editRender =
          typeof render === 'string' ? { name: render, props: {} } : render;
      } else if (cellRenders[field]) {
        const render = cellRenders[field];
        col.cellRender =
          typeof render === 'string' ? { name: render, props: {} } : render;
      }

      if (filterRenders[field]) {
        const render = filterRenders[field];
        col.filterRender =
          typeof render === 'string' ? { name: render } : render;
        if (!col.filters) {
          col.filters = [{ value: '' }];
        }
      }
    }
    if (children.length) {
      col.children = createColumns({
        columns: col.children,
        cellRenders,
        editRenders,
        filterRenders,
        editable
      });
    }
  }
  return cloneColumns;
}

export function useCustom(
  vxeRef: MaybeRef<VxeGridInstance | undefined>,
  props: GridProps
) {
  const columns = shallowRef<VxeGridPropTypes.Columns>([]);
  const adapter = useAdapter();
  let info: GridCustomInfo | null = null;
  const {
    customable,
    getCustom = adapter.getCustom,
    saveCustom = adapter.saveCustom
  } = props;

  const getId = (grid?: VxeGridInstance) => {
    return props.id || `X_Grid_${grid?.id || grid?.$.uid}`;
  };

  const onResize = (e: VxeGridDefines.ResizableChangeEventParams) => {
    if (!customable || !info) return;
    const column = e.column;
    const name = getName(column);
    const value = column.renderWidth;
    if (info.resize) {
      info.resize[name] = value;
    } else {
      info.resize = { [name]: value };
    }
    if (saveCustom) {
      saveCustom(info);
    }
  };

  const onCustom = (e: VxeGridDefines.CustomEventParams) => {
    if (!customable || !info) return;
    if (['confirm', 'reset'].includes(e.type)) {
      const { fullColumn, collectColumn } = e.$grid.getTableColumn();
      const visible: Record<string, boolean> = {};
      const fixed: Record<string, VxeColumnPropTypes.Fixed> = {};
      fullColumn.forEach((column) => {
        const name = getName(column);
        visible[name] = column.visible;
      });

      collectColumn.forEach((column) => {
        const name = getName(column);
        if (column.fixed) {
          fixed[name] = column.fixed;
        }
      });
      info.visible = visible;
      info.fixed = fixed;
      if (saveCustom) {
        saveCustom(info);
      }
    }
  };

  const onSort = (_e: GridSortableEvent) => {
    const grid = unref(vxeRef);
    if (!customable || !grid || !info) return;
    const { collectColumn } = grid.getTableColumn();
    const getSort = (columns: VxeTableDefines.ColumnInfo[]) => {
      const result: string[] = [];
      for (let col of columns) {
        result.push(getName(col));
        if (col.children) {
          result.push(...getSort(col.children));
        }
      }
      return result;
    };
    info.sort = getSort(collectColumn);
    if (saveCustom) {
      saveCustom(info);
    }
  };

  const updateColumns = async (columnsValue: GridColumns) => {
    const grid = unref(vxeRef);
    if (!customable || !getCustom) {
      columns.value = columnsValue;
      return;
    }
    const id = getId(grid);
    info = (await getCustom(id).catch(() => null)) || { id };
    if (info) {
      columns.value = mergeCustomInfo(columnsValue, info).slice(0);
    }
  };

  // onMounted(updateColumns);

  watch(
    () => [props.columns, props.editable],
    () => {
      updateColumns(createColumns(props));
    },
    { immediate: true }
  );

  return {
    columns,
    onResize,
    onCustom,
    onSort
  };
}
