import type { MaterialDescription } from '@vtj/core';
const Progress: MaterialDescription = {
  name: 'ElProgress',
  label: '进度条',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/progress.html',
  package: 'element-plus',
  props: [
    {
      name: 'percentage',
      defaultValue: 0,
      title: '百分比，必填',
      setters: {
        name: 'NumberSetter',
        props: {
          min: 0,
          max: 100
        }
      }
    },
    {
      name: 'type',
      defaultValue: 0,
      options: ['line', 'circle', 'dashboard'],
      setters: 'SelectSetter'
    },
    {
      name: 'strokeWidth',
      defaultValue: 6,
      setters: 'NumberSetter'
    },
    {
      name: 'textInside',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'status',
      defaultValue: '',
      options: ['success', 'exception', 'warning'],
      setters: 'SelectSetter'
    },
    {
      name: 'indeterminate',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'duration',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'color',
      defaultValue: '',
      setters: ['ColorSetter', 'FunctionSetter', 'JSONSetter']
    },
    {
      name: 'width',
      defaultValue: 126,
      setters: 'NumberSetter'
    },
    {
      name: 'showText',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'strokeLinecap',
      defaultValue: 'round',
      options: ['butt', 'round', 'square'],
      setters: 'BooleanSetter'
    },
    {
      name: 'format',
      defaultValue: '',
      setters: 'FunctionSetter'
    }
  ],
  snippet: {
    name: 'ElProgress',
    props: {
      percentage: 50
    }
  }
};

export default Progress;
