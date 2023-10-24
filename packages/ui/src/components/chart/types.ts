import { PropType } from 'vue';
import { ComponentPropsType } from '../shared';
import { EChartsOption } from 'echarts';

export const chartProps = {
  option: {
    type: Object as PropType<EChartsOption>
  },
  width: {
    type: [Number, String],
    default: '100%'
  },
  height: {
    type: [Number, String],
    default: '400px'
  }
};

export type ChartProps = ComponentPropsType<typeof chartProps>;
