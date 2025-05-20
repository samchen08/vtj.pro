import type { MaterialDescription } from '@vtj/core';
import Chart from './chart';
const desc: MaterialDescription = {
  name: 'XMapChart',
  label: 'Geo地图',
  categoryId: 'map',
  props: [
    {
      name: 'option',
      label: 'option',
      title: 'ECharts option',
      setters: 'ObjectSetter'
    },
    {
      name: 'width',
      label: 'width',
      setters: ['StringSetter']
    },
    {
      name: 'height',
      label: 'height',
      setters: ['StringSetter']
    },
    {
      name: 'name',
      label: '地图名称',
      defaultValue: 'china',
      setters: ['StringSetter']
    },
    {
      name: 'geoJson',
      title: '文件路径或GeoJSON对象',
      defaultValue:
        'https://unpkg.com/vtj-geojson@0.1.3/geo/100000/100000.geoJson',
      setters: ['StringSetter', 'ObjectSetter']
    }
  ],
  events: [...(Chart.events || [])],
  snippet: {
    props: {
      width: '100%',
      height: '400px',
      option: {
        series: [
          {
            data: [],
            type: 'map'
          }
        ]
      }
    }
  }
};

export default desc;
