import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElBacktop',
  label: '回到顶部',

  categoryId: 'nav',
  doc: 'https://element-plus.org/zh-CN/component/backtop.html',
  package: 'element-plus',
  props: [
    {
      name: 'target',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'visibilityHeight',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'right',
      defaultValue: 40,
      setters: 'NumberSetter'
    },
    {
      name: 'bottom',
      defaultValue: 40,
      setters: 'NumberSetter'
    }
  ],
  events: [
    {
      name: 'click'
    }
  ],
  slots: ['default'],
  snippet: {
    name: 'ElBacktop',
    children: [
      {
        name: 'component',
        props: {
          is: 'div',
          style: {
            height: '100%',
            textAlign: 'center',
            width: '100px',
            lineHeight: '40px',
            color: '#1989fa'
          }
        },
        children: 'UP'
      }
    ]
  }
};

export default components;
