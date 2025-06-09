import type { MaterialDescription } from '@vtj/core';
const Scrollbar: MaterialDescription = {
  name: 'ElScrollbar',
  label: '滚动条',

  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/scrollbar.html',
  package: 'element-plus',
  props: [
    {
      name: 'height',
      defaultValue: '',
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'maxHeight',
      defaultValue: '',
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'native',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'wrapStyle',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'wrapClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'viewStyle',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'viewClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'noresize',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tag',
      defaultValue: 'div',
      setters: 'InputSetter'
    },
    {
      name: 'always',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'minSize',
      defaultValue: 20,
      setters: 'NumberSetter'
    },
    {
      name: 'id',
      label: 'id',
      title: '视图id',
      setters: 'StringSetter'
    },
    {
      name: 'role',
      label: 'role',
      title: '视图的角色',
      setters: 'StringSetter'
    },
    {
      name: 'ariaLabel',
      label: 'ariaLabel',
      title: '视图的 aria-label',
      setters: 'StringSetter'
    },
    {
      name: 'ariaOrientation',
      label: 'ariaOrientation',
      title: '视图的 aria-orientation',
      setters: 'SelectSetter',
      options: ['horizontal', 'vertical']
    }
  ],
  events: [
    {
      name: 'scroll'
    }
  ],
  snippet: {
    props: {
      style: {
        height: '300px'
      }
    },
    children: [
      {
        name: 'component',
        props: {
          style: {
            height: '50px',
            margin: '10px',
            background: '#ecf5ff'
          }
        },
        directives: [
          {
            name: 'vFor',
            value: {
              type: 'JSExpression',
              value: '6'
            }
          }
        ]
      }
    ]
  }
};

export default Scrollbar;
