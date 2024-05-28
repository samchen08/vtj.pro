import Sortable from 'sortablejs';
import { isFunction, camelCase } from '@vtj/utils';
import type {
  GridSortableOptions,
  VxeGridInstance,
  GridEmits,
  GridSortableEvent,
  VxeTableDefines,
  GridColumns,
  GridCustomInfo,
  VxeGlobalRendererHandles
} from './types';
import type { Emits } from '../shared';

export function createSortable(
  el: HTMLElement,
  options: GridSortableOptions = {}
) {
  return new Sortable(el, {
    forceFallback: true,
    delay: 150,
    touchStartThreshold: 30,
    ...options
  });
}

export function createRowSortHandler(
  grid: VxeGridInstance,
  emit: Emits<GridEmits>
) {
  return (e: Sortable.SortableEvent) => {
    const { getRowNode } = grid;
    const { newIndex, oldIndex } = e;
    const info = getRowNode(e.item);
    emit('rowSort', {
      info,
      newIndex,
      oldIndex,
      e
    });
  };
}

export function createColumnMoveHandler(
  grid: VxeGridInstance
): (e: Sortable.MoveEvent) => boolean | void | 1 | -1 {
  const { getColumnNode } = grid;
  return (e: Sortable.MoveEvent) => {
    const { dragged, related } = e;
    const draggedColumn = getColumnNode(dragged);
    const relatedColumn = getColumnNode(related);
    // 只允许在相同的分组下拖拽排序
    return draggedColumn?.parent === relatedColumn?.parent;
  };
}

export function createColumnSortHandler(
  grid: VxeGridInstance,
  emit: Emits<GridEmits>,
  onChange?: (e: GridSortableEvent) => void
) {
  const { getTableColumn, getColumnNode, getColumnIndex, loadColumn } = grid;
  // 根据拖拽的DOM 索引获取对应的Vxe列对象
  const getColumnByDomIndex = (
    columns: VxeTableDefines.ColumnInfo[],
    index: number = 0
  ) => columns.filter((col) => col.visible)[index];

  return (e: Sortable.SortableEvent) => {
    const { item, newIndex = -1, oldIndex = -1 } = e;
    const { collectColumn, fullColumn } = getTableColumn();
    // 当前拖拽的th获取列数据信息
    const columnNode = getColumnNode(item);
    if (!columnNode) return;
    // 有父对象是分组的列
    const parentColumn = columnNode.parent;
    const columns = parentColumn ? parentColumn.children : collectColumn;
    // 相同层级的列
    const levelColumns = fullColumn.filter(
      (n) => n.level === columnNode.item.level
    );
    // 当前分组的列在相同层级的位置
    const startIndex = levelColumns.findIndex((n) => n.id === columns[0]?.id);

    const oldColumnIndex = getColumnIndex(
      getColumnByDomIndex(columns, oldIndex - startIndex)
    );
    const newColumnIndex = getColumnIndex(
      getColumnByDomIndex(columns, newIndex - startIndex)
    );

    // 拖拽的列
    const col = columns.splice(oldColumnIndex, 1)[0];
    // 移动放置到新位置
    columns.splice(newColumnIndex, 0, col);
    // collectColumn引用类型， 更改 parentColumn.children 也会更新
    loadColumn(collectColumn);

    const evt: GridSortableEvent = {
      info: col,
      newIndex: newColumnIndex,
      oldIndex: oldColumnIndex,
      e
    };
    onChange && onChange(evt);
    emit('columnSort', evt);
  };
}

export function createSortMap(sort: string[]) {
  const map: Record<string, number> = {};
  sort.forEach((n, i) => {
    map[n] = i;
  });
  return map;
}

export function getName(
  field: VxeTableDefines.ColumnOptions | VxeTableDefines.ColumnInfo
) {
  return field.field || field.type || '';
}

export function mergeCustomInfo(columns: GridColumns, info: GridCustomInfo) {
  const { resize = {}, visible = {}, sort = [], fixed = {} } = info;
  const sortMap = createSortMap(sort);
  const doMerge = (fields: GridColumns) => {
    fields.sort((a, b) => {
      return sortMap[getName(a)] - sortMap[getName(b)] || 0;
    });
    for (let item of fields) {
      const name = getName(item);
      const width = resize[name];
      const visibleValue = visible[name];
      const fixedValue = fixed[name];
      if (width) {
        item.width = width;
      }
      if (visibleValue !== undefined) {
        item.visible = visibleValue;
      }
      if (fixedValue !== undefined) {
        item.fixed = fixedValue;
      }
      if (item.children) {
        doMerge(item.children);
      }
    }
  };
  doMerge(columns);
  return columns;
}

export function createCellRenderProps(
  renderOpts: VxeGlobalRendererHandles.RenderDefaultOptions,
  params: VxeGlobalRendererHandles.RenderDefaultParams
) {
  const { row, column } = params;
  let cellValue = row[column.field];
  const { props = {}, events = {} } = renderOpts;

  const renderProps = isFunction(props)
    ? props({ row, column, cellValue })
    : props;

  const renderEvents = Object.entries(events).reduce(
    (prev, [name, handler]) => {
      const eventName = camelCase(`on-${name}`);
      prev[eventName] = (...args: any[]) =>
        handler({ cellValue, row, column } as any, ...args);
      return prev;
    },
    {} as Record<string, any>
  );

  if (isFunction(column.formatter)) {
    cellValue = column.formatter({ row, column, cellValue });
  }

  return {
    props: Object.assign({}, renderProps, renderEvents),
    cellValue,
    row,
    column
  };
}
