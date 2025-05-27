import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ABreadcrumb',
    alias: 'Breadcrumb',
    label: '面包屑',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/breadcrumb-cn',
    props: [
      {
        name: 'itemRender',
        label: 'itemRender',
        title:
          '自定义链接函数，和 vue-router 配置使用， 也可使用 #itemRender="props"'
      },
      {
        name: 'params',
        label: 'params',
        title: '路由的参数',
        setters: 'ObjectSetter'
      },
      {
        name: 'routes',
        label: 'routes',
        title: 'router 的路由栈信息',
        setters: 'ArraySetter'
      },
      {
        name: 'separator',
        label: 'separator',
        title: '分隔符自定义',
        setters: 'StringSetter',
        defaultValue: '/'
      }
    ],
    slots: ['default', 'separator'],
    snippet: {
      children: [
        { name: 'BreadcrumbItem', children: 'Home' },
        { name: 'ABreadcrumbSeparator' },
        { name: 'BreadcrumbItem', children: 'Application Center' },
        { name: 'ABreadcrumbSeparator' },
        { name: 'BreadcrumbItem', children: 'Application List' },
        { name: 'ABreadcrumbSeparator' },
        {
          name: 'BreadcrumbItem',
          props: { style: { fontWeight: '700', color: '#000' } },
          children: 'An Application'
        }
      ]
    }
  },
  {
    name: 'ABreadcrumbItem',
    alias: 'Item',
    parent: 'Breadcrumb',
    label: '面包屑项',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/breadcrumb-cn',
    props: [
      {
        name: 'href',
        label: 'href',
        title: '链接的目的地',
        setters: 'StringSetter'
      },
      {
        name: 'overlay',
        label: 'overlay',
        title: '下拉菜单的内容',
        setters: ['ObjectSetter', 'FunctionSetter'] //?? Menu | () => Menu
      }
    ],
    events: ['click'],
    snippet: { children: '面包屑项' }
  },
  {
    name: 'ABreadcrumbSeparator',
    alias: 'Separator',
    parent: 'Breadcrumb',
    label: '面包屑分隔符',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/breadcrumb-cn'
  }
];
export default components;
