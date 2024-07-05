import {
  type MaybeRef,
  unref,
  ref,
  onMounted,
  onUnmounted,
  onUpdated
} from 'vue';
import type {
  VxeGridInstance,
  GridProps,
  GridEmits,
  GridSortableOptions
} from '../types';
import type { Emits } from '../../shared';
import { createRowSortHandler, createSortable } from '../utils';

export function useRowSortable(
  vxeRef: MaybeRef<VxeGridInstance | undefined>,
  props: GridProps,
  emit: Emits<GridEmits>
) {
  const sortable = ref();
  if (!props.rowSortable) return sortable;

  const init = () => {
    const grid = unref(vxeRef);
    if (!grid) return;
    const el = grid.$el.querySelector('.vxe-table--body>tbody');

    if (el) {
      const options: GridSortableOptions = {
        ...(props.rowSortable as GridSortableOptions),
        onUpdate: createRowSortHandler(grid, emit)
      };
      sortable.value = createSortable(el, options);
    }
  };
  onMounted(init);

  onUnmounted(() => {
    sortable.value?.destroy();
  });

  onUpdated(() => {
    sortable.value?.destroy();
    init();
  });

  return sortable;
}
