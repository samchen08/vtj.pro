import type {
  Material,
  MaterialCategory,
  MaterialDescription
} from '@vtj/core';
import { version } from '../version';
import { setPackageName } from '../shared';
import chart from './chart';
import mapChart from './map-chart';

const name = '@vtj/charts';
const components: MaterialDescription[] = [chart, mapChart].flat();

const categories: MaterialCategory[] = [
  {
    id: 'base',
    category: '基础图表'
  },
  {
    id: 'map',
    category: '地图'
  },
  {
    id: '3D',
    category: '3D'
  }
];

const material: Material = {
  name,
  version,
  label: '图表',
  library: 'VtjChartsMaterial',
  order: 7,
  categories,
  components: setPackageName(components, name)
};

export default material;
