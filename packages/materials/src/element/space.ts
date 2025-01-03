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
      title: 'className',
      defaultValue: '',
      setters: ['StringSetter', 'ObjectSetter', 'ArraySetter']
    },
    {
      name: 'direction',
      title: '排列的方向',
      defaultValue: 'horizontal',
      options: ['vertical', 'horizontal'],
      setters: 'SelectSetter'
    },
    {
      name: 'prefixCls',
      title: '给 space-items 的类名前缀',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'style',
      title: '额外样式',
      defaultValue: '',
      setters: ['StringSetter', 'JSONSetter']
    },
    {
      name: 'spacer',
      title: '间隔符',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'size',
      title: '间隔大小',
      defaultValue: 'small',
      setters: ['SelectSetter', 'NumberSetter', 'ArraySetter'],
      options: ['large', 'default', 'small']
    },
    {
      name: 'wrap',
      title: '设置是否自动折行',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fill',
      title: '子元素是否填充父容器',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fillRatio',
      title: '填充父容器的比例',
      defaultValue: 100,
      setters: 'NumberSetter'
    }
  ],
  slots: ['default', 'spacer'],
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
