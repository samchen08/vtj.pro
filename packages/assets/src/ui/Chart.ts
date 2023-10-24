import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XChart',
  title: '图表',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'option',
      label: '配置选项',
      setters: 'JSONSetter'
    },
    {
      name: 'width',
      label: '宽度',
      setters: 'InputSetter'
    },
    {
      name: 'height',
      label: '高度',
      setters: 'InputSetter'
    }
  ],
  events: [],
  slots: [],
  snippet: {
    props: {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  }
};

export default component;
