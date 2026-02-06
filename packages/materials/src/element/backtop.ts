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
      title: '触发滚动的对象',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'visibilityHeight',
      title: '滚动高度达到此参数值才出现',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'right',
      title: '控制其显示位置，距离页面右边距',
      defaultValue: 40,
      setters: 'NumberSetter'
    },
    {
      name: 'bottom',
      title: '控制其显示位置，距离页面底部距离',
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
