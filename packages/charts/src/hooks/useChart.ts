import {
  type MaybeRef,
  type Ref,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  markRaw
} from 'vue';
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core';
import type { ECharts, EChartsOption } from 'echarts';
import { debounce } from '@vtj/utils';
import { useListeners } from './useListeners';

export function useChart(
  el: MaybeRef<HTMLElement>,
  option: Ref<EChartsOption | undefined>,
  attrs: Record<string, any>
) {
  const echartsInstance = ref<ECharts | undefined>();
  const listeners = useListeners(attrs);

  onMounted(() => {
    const target = unref(el);
    if (!target) return;
    if (!echartsInstance.value) {
      echartsInstance.value = markRaw(echarts.init(target));
    }
    if (echartsInstance.value) {
      for (const [name, handler] of Object.entries(listeners)) {
        echartsInstance.value.on(name, handler);
      }
      echartsInstance.value.setOption(option.value || {});
    }
  });

  onUnmounted(() => {
    if (echartsInstance.value) {
      for (const name of Object.keys(listeners)) {
        echartsInstance.value.off(name);
      }
      echartsInstance.value.dispose();
    }
  });

  watch(
    option,
    async (o) => {
      if (echartsInstance.value) {
        echartsInstance.value.setOption(o || {});
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

  const getEChart = () => {
    return echartsInstance.value;
  };

  return {
    instance: echartsInstance,
    getEChart
  };
}
