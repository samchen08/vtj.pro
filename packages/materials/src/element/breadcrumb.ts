import type { MaterialDescription } from '@vtj/core';
const Breadcrumb: MaterialDescription[] = [
  {
    name: 'ElBreadcrumb',
    childIncludes: ['ElBreadcrumbItem'],
    label: '面包屑',

    categoryId: 'nav',
    doc: 'https://element-plus.org/zh-CN/component/breadcrumb.html',
    package: 'element-plus',
    props: [
      {
        name: 'separator',
        title: '分隔符',
        defaultValue: '/',
        setters: 'InputSetter'
      },
      {
        name: 'separatorIcon',
        title: '图标分隔符的组件或组件名',
        defaultValue: '',
        setters: ['InputSetter']
      }
    ],
    slots: ['default', 'separatorIcon'],
    snippet: {
      children: [
        {
          name: 'ElBreadcrumbItem',
          children: '主页'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '列表'
        },
        {
          name: 'ElBreadcrumbItem',
          children: '详情'
        }
      ]
    }
  },
  {
    name: 'ElBreadcrumbItem',
    label: '面包屑项',

    categoryId: 'nav',
    package: 'element-plus',
    props: [
      {
        name: 'to',
        title: '路由跳转目标',
        defaultValue: '',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'replace',
        title: '如果设置该属性为 true, 导航将不会留下历史记录',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    slots: ['default'],
    snippet: {
      name: 'ElBreadcrumbItem',
      children: 'BreadcrumbItem'
    }
  }
];

export default Breadcrumb;
