import { computed } from 'vue';
import { isFunction } from '@vtj/utils';
import type { VxeGlobalRendererHandles } from '../types';

export function useEditRender(
  renderOpts: VxeGlobalRendererHandles.RenderEditOptions,
  params: VxeGlobalRendererHandles.RenderEditParams
) {
  const { row, column } = params;
  const { props = {}, events = {} } = renderOpts;
  const { parser, stringify } = props;

  const cellValue = computed({
    get() {
      const value = row[column.field];
      return parser ? parser(value) : value;
    },
    set(v) {
      row[column.field] = stringify ? stringify(v) : v;
    }
  });

  const renderProps = isFunction(props)
    ? props({ row, column, cellValue })
    : props;

  // const renderEvents: Record<string, any> = Object.entries(events).reduce(
  //   (prev, [name, handler]) => {
  //     const eventName = camelCase(`on-${name}`);
  //     prev[eventName] = (...args: any[]) =>
  //       handler({ cellValue, row, column } as any, ...args);
  //     return prev;
  //   },
  //   {} as Record<string, any>
  // );

  const onChange = () => {
    params.$grid?.updateStatus(params, cellValue.value);
  };

  return {
    renderProps,
    renderEvents: events,
    cellValue,
    row,
    column,
    onChange
  };
}
