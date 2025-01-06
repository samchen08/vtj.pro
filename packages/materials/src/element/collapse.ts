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
      }
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
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'title',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'icon',
        defaultValue: 'ArrowRight',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
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
