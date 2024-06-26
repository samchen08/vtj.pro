import { reactive, toRef, watch } from 'vue';
import type { GridProps, GridState } from '../types';

export function useState(props: GridProps) {
  const page = toRef(props, 'page');
  const pageSize = toRef(props, 'pageSize');
  const state = reactive<GridState>({
    page: props.page,
    pageSize: props.pageSize,
    total: 0,
    filters: [],
    sorts: []
  });

  const resetState = () => {
    Object.assign(state, {
      page: props.page,
      pageSize: props.pageSize,
      total: 0,
      filters: [],
      sorts: []
    });
  };

  watch(
    [page, pageSize],
    ([p, s]) => {
      state.page = p;
      state.pageSize = s;
    },
    { immediate: true }
  );

  return {
    state,
    resetState
  };
}
