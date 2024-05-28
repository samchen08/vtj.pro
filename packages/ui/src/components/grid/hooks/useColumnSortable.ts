import { type MaybeRef, unref, ref, onMounted, onUnmounted, watch } from 'vue';
import { delay } from '@vtj/utils';
import type {
  VxeGridInstance,
  GridProps,
  GridEmits,
  GridSortableOptions,
  GridSortableEvent
} from '../types';
import type { Emits } from '../../shared';
import {
  createColumnMoveHandler,
  createColumnSortHandler,
  createSortable
} from '../utils';

export function useColumnSortable(
  vxeRef: MaybeRef<VxeGridInstance | undefined>,
  props: GridProps,
  emit: Emits<GridEmits>,
  onChange?: (e: GridSortableEvent) => void
) {
  const sortables = ref<any[]>([]);
  if (!props.columnSortable) return sortables;

  const init = async () => {
    const grid = unref(vxeRef);
    if (!grid || !grid.$el) return;
    // 分组的标题需要延时才能获取到，nextTick失效
    await delay(200);
    const headerRows: HTMLElement[] = Array.from(
      grid.$el.querySelectorAll('.vxe-header--row')
    );
    const options: GridSortableOptions = {
      draggable: '.vxe-header--column:not(.col--fixed)',
      filter: '.vxe-header--gutter',
      handle: '.vxe-cell',
      ...(props.columnSortable as GridSortableOptions),
      onMove: createColumnMoveHandler(grid),
      onUpdate: createColumnSortHandler(grid, emit, onChange)
    };
    sortables.value = headerRows.map((el) => {
      return createSortable(el, options);
    });
  };

  const destroy = () => {
    sortables.value.forEach((n) => {
      n.destroy();
    });
    sortables.value = [];
  };

  const reset = async () => {
    if (sortables.value.length > 0) {
      destroy();
    }
    if (props.columns) {
      await init();
    }
  };

  watch(() => props.columns, reset);
  onMounted(init);
  onUnmounted(destroy);
  return sortables;
}
