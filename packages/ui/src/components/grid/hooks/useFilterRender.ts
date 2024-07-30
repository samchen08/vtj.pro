import { reactive } from 'vue';
import type { VxeGlobalRendererHandles } from '../types';

export function useFilterRender(
  renderOpts: VxeGlobalRendererHandles.RenderFilterOptions,
  params: VxeGlobalRendererHandles.RenderFilterParams
) {
  const { props = {}, events = {} } = renderOpts;

  const state = reactive({
    option: null as any
  });

  const load = () => {
    if (params) {
      const { column } = params;
      const option = column.filters[0];
      state.option = option;
    }
  };

  const onChange = () => {
    const { option } = state;
    if (params && option) {
      const { $panel } = params;
      const checked = !!option.value;
      $panel.changeOption(null, checked, option);
    }
  };

  const onKeyup = (e: any) => {
    if (params) {
      const { $panel } = params;
      $panel.confirmFilter(e);
    }
  };

  return {
    renderProps: props,
    renderEvents: events,
    state,
    load,
    onChange,
    onKeyup
  };
}
