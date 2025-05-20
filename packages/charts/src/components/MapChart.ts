import { defineComponent, h, computed, toRefs, onMounted } from 'vue';
import XChart from './Chart';
import { useMapChart } from '../hooks';

export default defineComponent({
  name: 'XMapChart',
  inheritAttrs: false,
  props: {
    geoJson: {
      type: [String, Object],
      default: 'https://unpkg.com/vtj-geojson@0.1.3/geo/100000/100000.geoJson'
    },
    name: {
      type: String,
      default: 'china'
    }
  },
  emits: ['ready'],
  async setup(props, { attrs, emit }) {
    const { name, geoJson } = toRefs(props);
    const { chartRef, geoJSON, option } = useMapChart(name, geoJson, attrs);

    const instance = computed(() => chartRef.value?.instance);
    onMounted(() => {
      emit('ready', instance.value);
    });

    return {
      chartRef,
      option,
      instance,
      getChartRef: () => chartRef.value,
      getEChart: () => chartRef.value?.getEChart(),
      geoJSON
    };
  },
  render() {
    return h(
      XChart,
      {
        ...this.$attrs,
        ref: 'chartRef',
        class: 'x-map-chart',
        option: this.option
      },
      this.$slots
    );
  },
  methods: {}
});
