import { type Ref, watch, nextTick } from 'vue';
import type { Emits } from '../../shared';
import type {
  GridProps,
  VxeGridInstance,
  VxeGridDefines,
  GridEmits
} from '../types';
import { useState } from './useState';

export function useLoader(
  props: GridProps,
  vxeRef: Ref<VxeGridInstance | undefined>,
  emit: Emits<GridEmits>
) {
  const { auto, pager } = props;
  const { state } = useState(props);

  const loadData = (data: any[], reset?: boolean) => {
    const grid = vxeRef.value;
    if (!grid) return;
    if (reset) {
      grid.reloadData(data);
    } else {
      grid.loadData(data);
    }
  };

  const load = async (reset?: boolean) => {
    if (props.loader) {
      const { list = [], total = 0 } = (await props.loader(state)) || {};
      await nextTick();
      loadData(list, reset);
      state.total = total;
      await nextTick();
      emit('loaded', list);
    }
  };

  const search = (reset?: boolean) => {
    state.page = props.page || 1;
    load(reset);
  };

  const onPagerChange = (currentPage: number, pageSize: number) => {
    state.page = currentPage;
    state.pageSize = pageSize;
    vxeRef.value?.scrollTo(0, 0);
    load();
  };

  const onFilterChange = (e: VxeGridDefines.FilterChangeEventParams) => {
    state.filters = e.filterList;
    if (pager) {
      load();
    }
  };

  const onSortChange = (e: VxeGridDefines.SortChangeEventParams) => {
    state.sorts = e.sortList;
    if (pager) {
      load();
    }
  };

  const doLayout = () => {
    vxeRef.value?.recalculate(true);
  };

  if (auto) {
    load();
  }

  watch(
    () => props.pager,
    () => {
      nextTick(doLayout);
    }
  );

  return {
    state,
    load,
    search,
    onPagerChange,
    onFilterChange,
    onSortChange,
    doLayout
  };
}
