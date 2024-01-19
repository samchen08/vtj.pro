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
      defaultValue: 'horizontal',
      setters: 'SelectSetter',
      options: ['horizontal', 'vertical']
    },
    {
      name: 'borderStyle',
      defaultValue: 'solid',
      setters: 'InputSetter'
    },
    {
      name: 'trigger',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['left', 'right', 'center']
    }
  ],
  snippet: {
    name: 'ElDivider',
    children: '分割线'
  }
};

export default components;
