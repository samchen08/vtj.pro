import type { MaterialDescription } from '@vtj/core';
const TreeV2: MaterialDescription = {
  name: 'ElTreeV2',
  label: '虚拟化树形控件',

  doc: 'https://element-plus.org/zh-CN/component/tree-v2.html',
  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'data',
      title: '展示数据',
      defaultValue: '',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'empty-text',
      title: '内容为空的时候展示的文本',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      title: '配置选项',
      defaultValue: {
        value: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        class : '',
      },
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'highlight-current',
      title: '是否高亮当前选中节点',
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
      name: 'check-on-click-leaf',
      title:
        '点击叶节点(最后一个子节点)时是否检查或取消节点',
      defaultValue: true,
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
      title: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
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
      title: '当前选中的节点',
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
    },
    {
      name: 'itemSize ',
      label: 'itemSize ',
      title: '自定义树节点的高度',
      setters: 'NumberSetter',
      defaultValue: 26
    },
    {
      name: 'scrollbar-always-on',
      title: '总是显示滚动条',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'height',
      title: 'tree 的高度',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
  ],
  events: [
    'node-click',
    'node-drop',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse'
  ],
  slots: [{ name: 'default', params: ['node', 'data'] }, { name: 'empty' }]
};

export default TreeV2;
