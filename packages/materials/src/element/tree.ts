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
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'empty-text',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'node-key',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'props',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'render-after-expand',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'load',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'render-content',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'highlight-current',
      defaultValue: false,
      label: '高亮当前节点',
      setters: 'BooleanSetter'
    },
    {
      name: 'default-expand-all',
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
      defaultValue: false,
      label: '显示checkbox',
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
      label: '默认勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'current-node-key',
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
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'indent',
      defaultValue: 16,
      setters: 'NumberSetter'
    },
    {
      name: 'icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'lazy',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'draggable',
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
  snippet: {
    props: {
      data: mockTreeData()
    }
  }
};

export default Tree;
