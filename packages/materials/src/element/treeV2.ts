import type { MaterialDescription } from '@vtj/core';
const TreeV2: MaterialDescription = {
  name: 'ElTreeV2',
  label: '虚拟化树形控件',

  doc: 'https://element-plus.org/zh-CN/component/tree-v2.html',
  categoryId: 'data',
  childIncludes: false,
  package: 'element-plus',
  props: [
    {
      name: 'data',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'empty-text',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'highlight-current',
      defaultValue: false,
      label: '高亮选中节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'expand-on-click-node',
      defaultValue: true,
      title:
        '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点',
      label: 'expand-on',
      setters: 'BooleanSetter'
    },
    {
      name: 'check-on-click-node',
      defaultValue: false,
      title:
        '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点',
      label: 'check-on',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expanded-keys',
      defaultValue: '',
      title: '默认展开的节点的 key 的数组',
      label: 'check-on',
      setters: 'JSONSetter'
    },
    {
      name: 'show-checkbox',
      defaultValue: false,
      title: '节点是否可被选择',
      label: 'check-on',
      setters: 'BooleanSetter'
    },
    {
      name: 'check-strictly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'default-checked-keys',
      defaultValue: '',
      title: '默认勾选的节点的 key 的数组',
      label: 'checked-keys',
      setters: 'JSONSetter'
    },
    {
      name: 'current-node-key',
      defaultValue: '',
      label: '选中的节点',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'filter-method',
      defaultValue: '',
      title:
        '对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示， 返回 false 则表示这个节点会被隐藏',
      setters: 'JSONSetter'
    },
    {
      name: 'indent',
      defaultValue: 16,
      title: '相邻级节点间的水平缩进，单位为像素',
      setters: 'NumberSetter'
    },
    {
      name: 'icon',
      defaultValue: '',
      title: '相邻级节点间的水平缩进，单位为像素',
      setters: 'InputSetter'
    }
  ],
  events: [
    'node-click',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse'
  ]
};

export default TreeV2;
