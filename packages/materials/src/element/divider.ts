import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription = {
  name: 'ElDivider',
  label: '分割线',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/divider.html',
  package: 'element-plus',
  props: [
    {
      name: 'direction',
      title: '设置分割线方向',
      defaultValue: 'horizontal',
      setters: 'SelectSetter',
      options: ['horizontal', 'vertical']
    },
    {
      name: 'borderStyle',
      title: '设置分隔符样式',
      defaultValue: 'solid',
      setters: 'SelectSetter',
      options: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
    },
    {
      name: 'contentPosition',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['left', 'right', 'center']
    }
  ],
  slots: ['default'],
  snippet: {
    name: 'ElDivider',
    children: '分割线'
  }
};

export default components;
