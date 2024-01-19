import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElAffix',
  label: '固钉',

  categoryId: 'nav',
  doc: 'https://element-plus.org/zh-CN/component/affix.html',

  package: 'element-plus',
  props: [
    {
      name: 'offset',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'position',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['top', 'bottom']
    },
    {
      name: 'target',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'z-index',
      defaultValue: 100,
      setters: 'NumberSetter'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'scroll'
    }
  ],
  snippet: {
    name: 'ElAffix',
    children: [
      {
        name: 'ElButton',
        props: {
          type: 'primary'
        },
        children: 'Affix 固钉'
      }
    ]
  }
};

export default components;
