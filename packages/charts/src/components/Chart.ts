import {
  defineComponent,
  h,
  ref,
  computed,
  toRefs,
  type PropType,
  type ComputedRef
} from 'vue';
import type { EChartsOption, ECharts } from 'echarts';
import * as echarts from 'echarts';
import { useChart } from '../hooks';

export type ChartOption = EChartsOption;
export type EChartsInstance = ECharts;

export default defineComponent({
  name: 'XChart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    option: {
      type: Object as PropType<ChartOption>
    }
  },
  setup(props) {
    const { width, height, option } = toRefs(props);
    const chartRef = ref();

    const styles: ComputedRef<Record<string, any>> = computed(() => {
      return {
        width: width.value,
        height: height.value
      };
    });
    const { echartsInstance } = useChart(echarts, chartRef, option);
    return {
      chartRef,
      option,
      styles,
      echartsInstance
    };
  },
  render() {
    const { styles } = this as any;
    return h('div', { class: 'x-chart', ref: 'chartRef', style: styles });
  },
  expose: ['chartRef', 'option', 'echartsInstance']
});
