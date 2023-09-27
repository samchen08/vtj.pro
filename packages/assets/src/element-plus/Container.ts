import { ComponentDescription } from '@vtj/engine';
const components: ComponentDescription[] = [
  {
    name: 'ElContainer',
    title: '布局容器',

    categoryId: 'layout',
    doc: 'https://element-plus.org/zh-CN/component/container.html',
    package: 'element-plus',
    props: [
      {
        name: 'direction',
        defaultValue: '',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      }
    ],
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
    title: '顶栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ]
  },
  {
    name: 'ElAside',
    parentIncludes: ['ElContainer'],
    title: '侧边栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'width',
        defaultValue: '300px',
        setters: ['InputSetter']
      }
    ]
  },
  {
    name: 'ElMain',
    parentIncludes: ['ElContainer'],
    title: '主要区域容器',

    categoryId: 'layout',
    package: 'element-plus'
  },
  {
    name: 'ElFooter',
    parentIncludes: ['ElContainer'],
    title: '底栏容器',

    categoryId: 'layout',
    package: 'element-plus',
    props: [
      {
        name: 'height',
        defaultValue: '60px',
        setters: ['InputSetter']
      }
    ]
  }
];

export default components;
