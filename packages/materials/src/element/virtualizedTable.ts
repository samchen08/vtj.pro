import type { MaterialDescription } from '@vtj/core';
const VirtualizedTable: MaterialDescription = {
  name: 'ElTableV2',
  label: '虚拟化表格',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/table-v2.html',
  package: 'element-plus',
  props: [
    {
      name: 'cache',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'estimated-row-height',
      defaultValue: '',
      title: '渲染动态的单元格的预估高度',
      label: 'row-height',
      setters: 'NumberSetter'
    },
    {
      name: 'header-class',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
    },
    {
      name: 'header-props',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'header-cell-props',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'header-height',
      defaultValue: 50,
      setters: ['NumberSetter', 'ExpressionSetter']
    },
    {
      name: 'footer-height',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'row-class',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
    },
    {
      name: 'row-key',
      defaultValue: 'id',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'row-props',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'columns',
      defaultValue: '50',
      setters: 'NumberSetter'
    },
    {
      name: 'data',
      defaultValue: [],
      setters: 'JSONSetter'
    },
    {
      name: 'data-getter',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'fixed-data',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'expand-column-key',
      defaultValue: '',
      title: '列的 key 来标记哪个行可以被展开',
      label: 'column-key',
      setters: 'InputSetter'
    },
    {
      name: 'expanded-row-keys',
      defaultValue: '',
      title: '列的 key 来标记哪个行可以被展开',
      label: 'column-key',
      setters: 'JSONSetter'
    },
    {
      name: 'default-expanded-row-keys',
      defaultValue: '',
      title: '默认展开的行的 key 的数组, 这个数据不是响应式的',
      label: '默认展开行',
      setters: 'JSONSetter'
    },
    {
      name: 'class',
      defaultValue: '',
      setters: ['JSONSetter', 'InputSetter']
    },
    {
      name: 'fixed',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      defaultValue: '',
      label: '表宽必填',
      setters: 'NumberSetter'
    },
    {
      name: 'height',
      defaultValue: '',
      label: '表高必填',
      setters: 'NumberSetter'
    },
    {
      name: 'max-height',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'h-scrollbar-size',
      defaultValue: 6,
      label: '水平滚动条大小',
      setters: 'NumberSetter'
    },
    {
      name: 'h-scrollbar-size',
      defaultValue: 6,
      label: '垂直滚动条大小',
      setters: 'NumberSetter'
    },
    {
      name: 'scrollbar-always-on',
      defaultValue: false,
      title: '如果开启，滚动条将一直显示，反之只会在鼠标经过时显示。',
      label: 'scrollbar',
      setters: 'BooleanSetter'
    },
    {
      name: 'sort-by',
      defaultValue: {},
      title: '排序方式',
      setters: 'JSONSetter'
    },
    {
      name: 'sort-state',
      defaultValue: undefined,
      title: '多个排序',
      setters: 'JSONSetter'
    }
  ],
  slots: ['cell', 'header', 'header-cell', 'row', 'footer', 'empty', 'overlay'],
  events: [
    'column-sort',
    'expanded-rows-change',
    'end-reached',
    'scroll',
    'rows-rendered',
    'row-event-handlers'
  ],
  snippet: {
    props: {
      width: 700,
      height: 400
    }
  }
};

export default VirtualizedTable;
