import {
  MaybeRef,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  markRaw
} from 'vue';
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core';
import { ECharts } from 'echarts';
import { ChartProps } from './types';
import { debounce } from '@vtj/utils';

export function useChart(el: MaybeRef<HTMLElement>, props: ChartProps) {
  const echartsInstance = ref<ECharts | undefined>();
  onMounted(() => {
    const target = unref(el);
    if (!target) return;
    if (!echartsInstance.value) {
      echartsInstance.value = markRaw(echarts.init(target));
    }
    echartsInstance.value.setOption(props.option || {});
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
