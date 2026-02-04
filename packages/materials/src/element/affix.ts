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
      title: '偏移距离',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'position',
      title: '固钉位置',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['top', 'bottom']
    },
    {
      name: 'target',
      title: '通过设置target属性 (CSS 选择器)，让固钉始终保持在容器内， 超过范围则隐藏',
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
  slots: ['default'],
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
