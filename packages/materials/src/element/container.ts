import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription[] = [
  {
    name: 'ElContainer',
    label: '布局容器',

    categoryId: 'layout',
    doc: 'https://element-plus.org/zh-CN/component/container.html',
    package: 'element-plus',
    props: [
      {
        name: 'direction',
        title: '子元素的排列方向',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        style: {
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  {
    name: 'ElHeader',
    parentIncludes: ['ElContainer'],
    label: '顶栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        title: '顶栏高度',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ]
  },
  {
    name: 'ElAside',
    parentIncludes: ['ElContainer'],
    label: '侧边栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'width',
        title: '侧边栏宽度',
        defaultValue: '300px',
        setters: ['InputSetter']
      }
    ],
    slots: ['default']
  },
  {
    name: 'ElMain',
    parentIncludes: ['ElContainer'],
    label: '主要区域容器',

    categoryId: 'layout',
    package: 'element-plus'
  },
  {
    name: 'ElFooter',
    parentIncludes: ['ElContainer'],
    label: '底栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        title: '底栏高度',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ],
    slots: ['default']
  }
];

export default components;
