import type { MaterialDescription } from '@vtj/core';
const Collapse: MaterialDescription[] = [
  {
    name: 'ElCollapse',
    label: '折叠面板',

    categoryId: 'data',
    doc: 'https://element-plus.org/zh-CN/component/collapse.html',
    childIncludes: ['ElCollapseItem'],
    package: 'element-plus',
    props: [
      {
        name: 'modelValue',
        defaultValue: '',
        title:
          '当前激活的面板(如果是手风琴模式，绑定值类型需要为string，否则为array)',
        setters: ['InputSetter', 'ArraySetter', 'JSONSetter']
      },
      {
        name: 'accordion',
        defaultValue: false,
        title: '是否手风琴模式',
        setters: 'BooleanSetter'
      },
      {
        name: 'expandIconPosition',
        title: '设置展开图标位置',
        defaultValue: 'right',
        options: ['left', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'beforeCollapse',
        title: '折叠状态更改之前的回调事件。 返回 false 或者返回 Promise 且被 reject 则停止切换',
        defaultValue: '',
        setters: 'FunctionSetter' // () => Promise<boolean> | boolean
      },
    ],
    events: ['change'],
    slots: ['default'],
    snippet: {
      children: [
        {
          name: 'ElCollapseItem',
          children: '面板内容',
          props: {
            title: '面板标题'
          },
          directives: [
            {
              name: 'vFor',
              value: {
                type: 'JSExpression',
                value: '3'
              }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ElCollapseItem',
    label: '折叠面板子项',

    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'name',
        title: '唯一标志符',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'title',
        title: '面板标题',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        title: '折叠项目的图标',
        defaultValue: 'ArrowRight',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    slots: [
      {
        name: 'default'
      },
      {
        name: 'title'
      },
      {
        name: 'icon'
      }
    ],
    snippet: {
      children: '面板内容',
      props: {
        title: '面板标题'
      }
    }
  }
];

export default Collapse;
