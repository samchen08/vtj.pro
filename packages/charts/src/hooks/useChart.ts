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

import { useResizeObserver } from '@vueuse/core';
import type { ECharts, EChartsOption } from 'echarts';
import { debounce } from '@vtj/utils';

export function useChart(
  echarts: any,
  el: MaybeRef<HTMLElement>,
  option: Ref<EChartsOption | undefined>
) {
  const echartsInstance = ref<ECharts | undefined>();
  onMounted(() => {
    const target = unref(el);
    if (!target) return;
    if (!echartsInstance.value) {
      echartsInstance.value = markRaw(echarts.init(target));
    }
    if (echartsInstance.value) {
      echartsInstance.value.setOption(option.value || {});
    }
  });

  onUnmounted(() => {
    if (echartsInstance.value) {
      echartsInstance.value.dispose();
    }
  });

  watch(
    option,
    (o) => {
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

  return {
    echartsInstance
  };
}
