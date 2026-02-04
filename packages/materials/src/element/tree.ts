import type { MaterialDescription } from '@vtj/core';
import { mockTreeData } from '../shared';
const Tree: MaterialDescription = {
  name: 'ElTree',
  label: '树形控件',
  doc: 'https://element-plus.org/zh-CN/component/tree.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'data',
      title: '展示数据',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'empty-text',
      title: '内容为空的时候展示的文本',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'node-key',
      title: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      title: '配置选项',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'render-after-expand',
      title: '是否在第一次展开某个树节点后才渲染其子节点',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'load',
      title: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'render-content',
      title: '树节点的内容区的渲染 Function',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'highlight-current',
      title: '是否高亮当前选中节点',
      defaultValue: false,
      label: '高亮当前节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expand-all',
      title: '是否默认展开所有节点',
      defaultValue: false,
      label: '展开所有节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'expand-on-click-node',
      defaultValue: true,
      title:
        '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
      label: '点击展开',
      setters: 'BooleanSetter'
    },
    {
      name: 'check-on-click-node',
      defaultValue: false,
      title:
        '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
      label: '点击选中',
      setters: 'BooleanSetter'
    },
    {
      name: 'auto-expand-parent',
      defaultValue: true,
      title: '展开子节点的时候是否自动展开父节点',
      label: '自动展开',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expanded-keys',
      defaultValue: '',
      title: '默认展开的节点的 key 的数组',
      label: '默认展开',
      setters: 'JSONSetter'
    },
    {
      name: 'show-checkbox',
      title: '节点是否可被选择',
      defaultValue: false,
      label: '显示checkbox',
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
      label: '默认勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'current-node-key',
      title: '当前选中的节点',
      defaultValue: '',
      label: '当前节点key',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'filter-node-method',
      defaultValue: '',
      title:
        'filter-node-method 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏',
      label: '筛选节点函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'accordion',
      title: '是否每次只打开一个同级树节点展开',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'indent',
      title: '相邻级节点间的水平缩进，单位为像素',
      defaultValue: 16,
      setters: 'NumberSetter'
    },
    {
      name: 'icon',
      title: '自定义树节点图标组件',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'lazy',
      title: '是否懒加载子节点，需与 load 方法结合使用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'draggable',
      title: '是否开启拖拽节点功能',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allow-drag',
      defaultValue: '',
      title: '判断节点能否被拖拽 如果返回 false ，节点不能被拖动',
      setters: 'FunctionSetter'
    },
    {
      name: 'allow-drop',
      defaultValue: '',
      title:
        '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 false ，拖动节点不能被拖放到目标节点。 type 参数有三种情况：prev、inner 和 next，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
      setters: 'FunctionSetter'
    }
  ],
  events: [
    'node-click',
    'node-contextmenu',
    'check-change',
    'check',
    'current-change',
    'node-expand',
    'node-collapse',
    'node-drag-start',
    'node-drag-enter',
    'node-drag-leave',
    'node-drag-over',
    'node-drop',
    'node-drag-end'
  ],
  slots: [{ name: 'default', params: ['node', 'data'] }, { name: 'empty' }],
  snippet: {
    props: {
      data: mockTreeData()
    }
  }
};

export default Tree;
