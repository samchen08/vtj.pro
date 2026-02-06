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
      title: '卡片的标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'footer',
      title: '卡片页脚',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'bodyStyle',
      title: 'body 的 CSS 样式',
      defaultValue: undefined,
      setters: 'JSONSetter'
    },
    {
      name: 'headerClass',
      title: '卡片header 的自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'bodyClass',
      title: '卡片body 的自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'footerClass',
      title: '卡片footer 的自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'shadow',
      title: '卡片阴影显示时机',
      defaultValue: 'always',
      options: ['always', 'hover', 'never'],
      setters: 'SelectSetter'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'header'
    },
    {
      name: 'footer'
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
