import {
  type MaybeRef,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  markRaw,
  shallowRef
} from 'vue';

import { useResizeObserver } from '@vueuse/core';
import type { ECharts } from 'echarts';
import type { ChartProps } from './types';
import { debounce } from '@vtj/utils';

// function loadEcharts() {
//   return import('echarts');
// }

export function useChart(
  _echarts: any,
  el: MaybeRef<HTMLElement>,
  props: ChartProps
) {
  const echartsInstance = ref<ECharts | undefined>();
  const echarts = shallowRef();
  onMounted(async () => {
    echarts.value = _echarts;
    const target = unref(el);
    if (!target) return;
    if (!echartsInstance.value) {
      echartsInstance.value = markRaw(echarts.value.init(target));
    }
    if (echartsInstance.value) {
      echartsInstance.value.setOption(props.option || {});
    }
  });

  onUnmounted(() => {
    if (echartsInstance.value) {
      echartsInstance.value.dispose();
    }
  });

  watch(
    () => props.option,
    (option) => {
      if (echartsInstance.value) {
        echartsInstance.value.setOption(option || {});
      }
    },
    { deep: true }
  );

  useResizeObserver(
    el,
    debounce(() => {
      if (echartsInstance.value) {
        echartsInstance.value.resize();
      }
    }, 150)
  );

  return {
    echartsInstance,
    echarts
  };
}
