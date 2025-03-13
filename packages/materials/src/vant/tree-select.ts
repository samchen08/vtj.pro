import type { MaterialDescription } from '@vtj/core';

const TreeSelect: MaterialDescription = {
  name: 'VanTreeSelect',
  alias: 'TreeSelect',
  label: '分类选择',
  categoryId: 'nav',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/tree-select',
  props: [
    {
      name: 'main-active-index',
      title: '左侧选中项的索引',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'active-id',
      title: '右侧选中项的 id，支持传入数组',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
    },
    {
      name: 'items',
      title: '分类显示所需的数据',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'height',
      title: '高度，默认单位为px',
      defaultValue: 300,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'max',
      title: '右侧项最大选中个数',
      defaultValue: Infinity,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'selected-icon',
      title: '自定义右侧栏选中状态的图标',
      defaultValue: 'success',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'update:mainActiveIndex' },
    { name: 'update:activeId' },
    { name: 'clickNav', params: ['index'] },
    { name: 'clickItem', params: ['item'] }
  ],
  slots: ['nav-text', 'content'],
  snippet: {
    props: {
      'active-id': 1,
      items: [
        {
          text: '浙江',
          children: [
            { text: '杭州', id: 1 },
            { text: '温州', id: 2 },
            { text: '宁波', id: 3, disabled: true }
          ]
        },
        {
          text: '江苏',
          children: [
            { text: '南京', id: 4 },
            { text: '无锡', id: 5 },
            { text: '徐州', id: 6 }
          ]
        },
        { text: '福建', disabled: true }
      ]
    }
  }
};

export default TreeSelect;
