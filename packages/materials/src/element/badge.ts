import type { MaterialDescription } from '@vtj/core';
const Badge: MaterialDescription = {
  name: 'ElBadge',
  label: '徽章',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/badge.html',
  package: 'element-plus',
  props: [
    {
      name: 'value',
      defaultValue: '',
      title: '显示值',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'max',
      defaultValue: 99,
      setters: 'NumberSetter'
    },
    {
      name: 'isDot',
      defaultValue: false,
      title: '是否显示小圆点。',
      setters: 'BooleanSetter'
    },
    {
      name: 'hidden',
      defaultValue: false,
      title: '是否隐藏 Badge。',
      setters: 'BooleanSetter'
    },
    {
      name: 'type',
      defaultValue: 'danger',
      title: 'badge 类型。',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      setters: 'SelectSetter'
    },
    {
      name: 'showZero',
      title: '值为零时是否显示 Badge  ',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'color',
      title: '背景色',
      setters: 'ColorSetter'
    }
  ],
  slots: ['default'],
  snippet: {
    props: {
      value: 12
    },
    children: [
      {
        name: 'ElButton',
        children: '评论'
      }
    ]
  }
};

export default Badge;
