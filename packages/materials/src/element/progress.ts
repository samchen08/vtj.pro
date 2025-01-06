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
      defaultValue: 'line',
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
      setters: ['ColorSetter', 'FunctionSetter', 'ArraySetter', 'JSONSetter']
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
      setters: 'SelectSetter'
    },
    {
      name: 'format',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'striped',
      label: 'striped',
      title: '在进度条上增加条纹',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'stripedFlow',
      label: 'stripedFlow',
      title: '让进度条上的条纹流动起来',
      setters: 'BooleanSetter',
      defaultValue: false
    }
  ],
  slots: ['default'],
  snippet: {
    name: 'ElProgress',
    props: {
      percentage: 50
    }
  }
};

export default Progress;
