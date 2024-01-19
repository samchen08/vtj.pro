import type { MaterialDescription } from '@vtj/core';
const Card: MaterialDescription = {
  name: 'ElCard',
  label: '卡片',

  categoryId: 'data',
  package: 'element-plus',
  doc: 'https://element-plus.org/zh-CN/component/card.html',
  props: [
    {
      name: 'header',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'bodyStyle',
      defaultValue: undefined,
      setters: 'JSONSetter'
    },
    {
      name: 'shadow',
      defaultValue: 'always',
      options: ['always', 'hover', 'neve'],
      setters: 'SelectSetter'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'header'
    }
  ],
  snippet: {
    props: {
      header: '标题'
    },
    children: '内容文本'
  }
};

export default Card;
