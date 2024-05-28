import { computed } from 'vue';
import { isFunction, camelCase } from '@vtj/utils';
import type { VxeGlobalRendererHandles } from '../types';

export function useEditRender(
  renderOpts: VxeGlobalRendererHandles.RenderEditOptions,
  params: VxeGlobalRendererHandles.RenderEditParams
) {
  const { row, column } = params;
  const cellValue = computed({
    get() {
      return row[column.field];
    },
    set(v) {
      row[column.field] = v;
    }
  });
  const { props = {}, events = {} } = renderOpts;
  const renderProps = isFunction(props)
    ? props({ row, column, cellValue })
    : props;

  const renderEvents: Record<string, any> = Object.entries(events).reduce(
    (prev, [name, handler]) => {
      const eventName = camelCase(`on-${name}`);
      prev[eventName] = (...args: any[]) =>
        handler({ cellValue, row, column } as any, ...args);
      return prev;
    },
    {} as Record<string, any>
  );

  const onChange = () => {
    params.$grid?.updateStatus(params, cellValue.value);
  };

  return {
    renderProps: Object.assign({}, renderProps, renderEvents),
    cellValue,
    row,
    column,
    onChange
  };
}
