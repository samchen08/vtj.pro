import type { MaterialDescription } from '@vtj/core';
const Space: MaterialDescription = {
  name: 'ElSpace',
  label: '间距',

  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/space.html',
  package: 'element-plus',
  props: [
    {
      name: 'alignment',
      defaultValue: 'center',
      title: '对齐的方式',
      options: [
        'normal',
        'stretch',
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'baseline',
        'first baseline',
        'last baseline',
        'safe center',
        'unsafe center',
        'inherit',
        'initial',
        'revert',
        'revert-layer',
        'unset'
      ],
      setters: 'SelectSetter'
    },
    {
      name: 'class',
      defaultValue: '',
      setters: ['InputSetter']
    },
    {
      name: 'direction',
      defaultValue: 'horizontal',
      options: ['vertical', 'horizontal'],
      setters: 'SelectSetter'
    },
    {
      name: 'prefixCls',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'style',
      defaultValue: '',
      setters: ['InputSetter', 'JSONSetter']
    },
    {
      name: 'spacer',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'size',
      defaultValue: 'small',
      setters: ['InputSetter', 'NumberSetter', 'JSONSetter']
    },
    {
      name: 'wrap',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fill',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fillRatio',
      defaultValue: 100,
      setters: 'NumberSetter'
    }
  ],
  slots: ['default'],
  snippet: {
    props: {
      fill: true,
      style: {
        width: '100%'
      }
    },
    children: [
      {
        name: 'ElCard'
      },
      {
        name: 'ElCard'
      }
    ]
  }
};

export default Space;
