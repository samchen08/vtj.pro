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
  setup(props, { expose, attrs }) {
    const { width, height, option } = toRefs(props);
    const elRef = ref();

    const styles: ComputedRef<Record<string, any>> = computed(() => {
      return {
        width: width.value,
        height: height.value
      };
    });
    const { instance, getEChart } = useChart(elRef, option, attrs);

    expose({
      elRef,
      option,
      instance,
      getEChart
    });

    return {
      elRef,
      option,
      styles,
      instance,
      getEChart
    };
  },
  render() {
    return h('div', { class: 'x-chart', ref: 'elRef', style: this.styles });
  }
});
