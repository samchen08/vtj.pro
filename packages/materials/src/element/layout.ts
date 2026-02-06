import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'ElRow',
    label: '布局行',

    categoryId: 'layout',
    doc: 'https://element-plus.org/zh-CN/component/layout.html',
    package: 'element-plus',
    props: [
      {
        name: 'gutter',
        defaultValue: 0,
        label: '栅格间隔',
        setters: 'NumberSetter'
      },
      {
        name: 'justify',
        defaultValue: 'start',
        title: 'flex 布局下的水平排列方式',
        options: [
          'start',
          'end',
          'center',
          'space-around',
          'space-between',
          'space-evenly'
        ],
        setters: 'SelectSetter'
      },
      {
        name: 'align',
        defaultValue: 'top',
        title: 'flex 布局下的垂直排列方式',
        options: ['top', 'middle', 'bottom'],
        setters: 'SelectSetter'
      },
      {
        name: 'tag',
        defaultValue: 'div',
        title: '自定义元素标签',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        gutter: 10
      }
    }
  },
  {
    name: 'ElCol',
    label: '布局列',

    categoryId: 'layout',
    package: 'element-plus',
    parentIncludes: ['ElRow'],
    props: [
      {
        name: 'span',
        title: '栅格占据的列数',
        defaultValue: 24,
        setters: 'NumberSetter'
      },
      {
        name: 'offset',
        title: '栅格左侧的间隔格数',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'push',
        title: '栅格向右移动格数',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'pull',
        title: '栅格向左移动格数',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'xs',
        title: '<768px 响应式栅格数或者栅格属性对象',
        defaultValue: undefined,
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'sm',
        title: '≥768px 响应式栅格数或者栅格属性对象',
        defaultValue: undefined,
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'md',
        title: '≥992px 响应式栅格数或者栅格属性对象',
        defaultValue: undefined,
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'lg',
        title: '≥1200px 响应式栅格数或者栅格属性对象',
        defaultValue: undefined,
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'xl',
        title: '≥1920px 响应式栅格数或者栅格属性对象',
        defaultValue: undefined,
        setters: ['JSONSetter', 'NumberSetter']
      },
      {
        name: 'tag',
        defaultValue: 'div',
        title: '自定义元素标签',
        setters: 'InputSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        span: 6
      }
    }
  }
];

export default components;
