import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniBreadcrumb',
    label: '面包屑',
    categoryId: 'ext',
    props: [
      {
        name: 'separator',
        title: '分隔符',
        defaultValue: '/',
        setters: 'StringSetter'
      },
      {
        name: 'separatorClass',
        title: '图标分隔符 class',
        setters: 'StringSetter'
      }
    ],
    snippet: {
      props: {
        separator: '/'
      },
      children: [
        {
          name: 'UniBreadcrumbItem',
          children: '首页'
        }
      ]
    }
  },
  {
    name: 'UniBreadcrumbItem',
    label: '面包屑项',
    parentIncludes: ['UniBreadcrumb'],
    categoryId: 'ext',
    props: [
      {
        name: 'to',
        title: '路由跳转页面路径',
        setters: 'StringSetter'
      },
      {
        name: 'replace',
        title:
          '在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录(仅 h5 支持）',
        setters: 'BooleanSetter'
      }
    ],
    snippet: {
      children: '菜单项'
    }
  }
];

export default desc;
