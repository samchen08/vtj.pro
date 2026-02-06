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
      title: '滚动条高度',
      defaultValue: '',
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'maxHeight',
      title: '滚动条最大高度',
      defaultValue: '',
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'native',
      title: '是否使用原生滚动条样式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'wrapStyle',
      title: '包裹容器的自定义样式',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'wrapClass',
      title: '包裹容器的自定义类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'viewStyle',
      title: '视图的自定义样式',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'viewClass',
      title: '视图的自定义类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'noresize',
      title: '不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'tag',
      title: '视图的元素标签',
      defaultValue: 'div',
      setters: 'InputSetter'
    },
    {
      name: 'always',
      title: '滚动条总是显示',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'minSize',
      title: '滚动条最小尺寸',
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
    },
    {
      name: 'tabindex',
      title: '容器的tabindex',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'distance',
      title: '触发到达底部事件的距离（像素）',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
  ],
  events: [
    {
      name: 'scroll'
    },
    {
      name: 'end-reached'
    },
  ],
  slots: ['default'],
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
