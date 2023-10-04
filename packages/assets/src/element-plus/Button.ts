import { ComponentDescription } from '@vtj/engine';
const components: ComponentDescription[] = [
  {
    name: 'ElButton',
    title: '按钮',

    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/button.html',
    package: 'element-plus',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      },
      {
        name: 'plain',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'round',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'circle',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'loading',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'icon',
        defaultValue: undefined,
        setters: 'IconSetter'
      },
      {
        name: 'autofocus',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'nativeType',
        defaultValue: 'button',
        setters: 'SelectSetter',
        options: ['button', 'submit', 'reset']
      }
    ],
    events: ['click'],
    snippet: {
      name: 'ElButton',
      children: '按钮',
      props: {
        type: 'primary'
      }
    }
  },
  {
    name: 'ElButtonGroup',
    childIncludes: ['ElButton'],
    title: '按钮组',

    categoryId: 'base',
    package: 'element-plus',
    props: [
      {
        name: 'size',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'large', 'small']
      },
      {
        name: 'type',
        defaultValue: 'default',
        setters: 'SelectSetter',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'info']
      }
    ],
    snippet: {
      name: 'ElButtonGroup',
      children: [
        {
          name: 'ElButton',
          children: 'Button1'
        },
        {
          name: 'ElButton',
          children: 'Button2'
        },
        {
          name: 'ElButton',
          children: 'Button3'
        }
      ]
    }
  }
];

export default components;
