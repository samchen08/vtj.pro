import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'AAffix',
    alias: 'Affix',
    label: '固钉',
    categoryId: 'other',
    doc: 'https://antdv.com/components/affix-cn',
    props: [
      {
        name: 'offsetBottom',
        label: 'offsetBottom',
        title: '距离窗口底部达到指定偏移量后触发',
        setters: 'NumberSetter'
      },
      {
        name: 'offsetTop',
        label: 'offsetTop',
        title: '距离窗口顶部达到指定偏移量后触发',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'target',
        label: 'target',
        title:
          '设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数',
        setters: 'FunctionSetter'
      }
    ],
    events: ['change'],
    slots: ['default'],
    snippet: {
      props: {
        offsetTop: '30',
        target: {
          type: 'JSFunction',
          value: '() => window'
        }
      },
      children: [
        {
          name: 'AButton',
          props: { type: 'primary' },
          children: 'Affix Button'
        }
      ]
    }
  }
];
export default components;
