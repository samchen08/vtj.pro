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
        defaultValue: '/',
        setters: 'InputSetter'
      },
      {
        name: 'separatorIcon',
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
        defaultValue: '',
        setters: ['InputSetter', 'JSONSetter']
      },
      {
        name: 'replace',
        defaultValue: '',
        setters: 'InputSetter'
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
