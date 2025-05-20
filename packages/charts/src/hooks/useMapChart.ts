import { onMounted, onUnmounted, watch, ref, shallowRef, type Ref } from 'vue';
import * as echarts from 'echarts';
import XChart from '../components/Chart';

export function useMapChart(
  name: Ref<string>,
  geoJson: Ref<any>,
  attrs: Record<string, any>
) {
  const chartRef = ref<InstanceType<typeof XChart>>();
  const geoJSON = shallowRef<any>(null);
  const option = ref<any>({});

  const loader = async (map: string, json: any) => {
    const instance = chartRef.value?.instance;
    if (instance) {
      instance.showLoading();
    }
    const result =
      typeof json === 'string'
        ? await fetch(json)
            .then((res) => res.json())
            .catch(() => null)
        : json;

    if (instance) {
      instance.hideLoading();
    }
    if (result) {
      echarts.registerMap(map, result as any);
    }
    return result;
  };

  watch([name, geoJson], async () => {
    geoJSON.value = await loader(name.value, geoJson.value);
  });

  watch(geoJSON, (val) => {
    if (val) {
      const opts: any = attrs.option || {};
      if (opts.geo) {
        opts.geo.map = name.value;
      }
      const series = opts.series || [];
      series.map((n: any) => {
        if (n?.type === 'map') {
          n.map = name.value;
        }
      });
      option.value = opts;
    }
  });

  onMounted(async () => {
    geoJSON.value = await loader(name.value, geoJson.value);
  });

  onUnmounted(() => {
    const instance = chartRef.value?.instance;
    if (instance) {
      instance.hideLoading();
    }
  });

  return {
    chartRef,
    geoJSON,
    option
  };
}
