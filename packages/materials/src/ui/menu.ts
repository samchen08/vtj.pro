import type { MaterialDescription } from '@vtj/core';
import ElMenu from '../element/menu';

const desc: MaterialDescription = {
  name: 'XMenu',
  label: '菜单',
  categoryId: 'data',
  props: [
    {
      name: 'data',
      title: '菜单项数据',
      setters: 'ArraySetter'
    },
    ...(ElMenu[0].props || []),
    {
      name: 'subMenu',
      title: 'ElSubMenu组件参数配置',
      setters: 'ObjectSetter'
    },
    {
      name: 'defaultIcon',
      title: '默认Icon',
      setters: 'ExpressionSetter'
    }
  ],
  events: [...(ElMenu[0].events || [])],
  slots: [],
  snippet: {
    props: {
      data: [
        {
          id: '1',
          title: '菜单一',
          icon: 'Setting',
          children: [
            {
              id: '1-1',
              title: '子菜单一'
            },
            {
              id: '1-2',
              title: '子菜单一'
            }
          ]
        },
        {
          id: '2',
          title: '菜单二',
          icon: 'Edit',
          children: [
            {
              id: '2-1',
              title: '子菜单一'
            },
            {
              id: '2-2',
              title: '子菜单一'
            }
          ]
        }
      ]
    }
  }
};

export default desc;
