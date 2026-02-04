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
      title: '进度条类型',
      defaultValue: 'line',
      options: ['line', 'circle', 'dashboard'],
      setters: 'SelectSetter'
    },
    {
      name: 'strokeWidth',
      title: '进度条的宽度',
      defaultValue: 6,
      setters: 'NumberSetter'
    },
    {
      name: 'textInside',
      title: '进度条显示文字内置在进度条内（仅 type 为 \'line\' 时可用）',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'status',
      title: '进度条当前状态',
      defaultValue: '',
      options: ['success', 'exception', 'warning'],
      setters: 'SelectSetter'
    },
    {
      name: 'indeterminate',
      title: '是否为动画进度条',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'duration',
      title: '控制动画进度条速度和条纹进度条流动速度',
      defaultValue: 3,
      setters: 'NumberSetter'
    },
    {
      name: 'color',
      title: '进度条背景色 （会覆盖 status 状态颜色）',
      defaultValue: '',
      setters: ['ColorSetter', 'FunctionSetter', 'ArraySetter', 'JSONSetter']
    },
    {
      name: 'width',
      title: '环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）',
      defaultValue: 126,
      setters: 'NumberSetter'
    },
    {
      name: 'showText',
      title: '是否显示进度条文字内容',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'strokeLinecap',
      title: 'circle/dashboard 类型路径两端的形状',
      defaultValue: 'round',
      options: ['butt', 'round', 'square'],
      setters: 'SelectSetter'
    },
    {
      name: 'format',
      title: '指定进度条文字内容',
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
