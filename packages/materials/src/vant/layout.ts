import type { MaterialDescription } from '@vtj/core';

const Layout: MaterialDescription[] = [
  {
    name: 'VantRow',
    alias: 'Row',
    label: '布局行',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/col',
    props: [
      {
        name: 'gutter',
        title: '列元素之间的间距(单位为 px)',
        setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
      },
      {
        name: 'tag',
        title: '自定义元素标签',
        defaultValue: 'div',
        setters: 'StringSetter'
      },
      {
        name: 'justify',
        title: '主轴对齐方式',
        defaultValue: 'start',
        setters: 'SelectSetter',
        options: ['start', 'end', 'center', 'space-around', 'space-between']
      },
      {
        name: 'align',
        title: '交叉轴对齐方式',
        defaultValue: 'top',
        setters: 'SelectSetter',
        options: ['top', 'center', 'bottom']
      },
      {
        name: 'wrap',
        title: '是否自动换行',
        defaultValue: true,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click'],
    snippet: {
      children: [
        {
          name: 'VantCol',
          children: 'span:8',
          props: {
            span: '8'
          }
        },
        {
          name: 'VantCol',
          children: 'span:8',
          props: {
            span: '8'
          }
        }
      ]
    }
  },
  {
    name: 'VantCol',
    alias: 'Col',
    label: '布局列',
    categoryId: 'base',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/col',
    props: [
      {
        name: 'span',
        title: '列元素宽度',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'offset',
        title: '列元素偏移距离',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'tag',
        title: '自定义元素标签',
        defaultValue: 'div',
        setters: 'StringSetter'
      }
    ],
    events: ['click'],
    snippet: {
      name: 'VantCol',
      children: 'span:8',
      props: {
        span: '8'
      }
    }
  }
];

export default Layout;
