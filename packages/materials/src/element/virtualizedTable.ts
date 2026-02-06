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
      title: '为了更好的渲染效果预先多加载的行数',
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
      title: 'header 部分的自定义 class 名',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
    },
    {
      name: 'header-props',
      title: 'header 部分的自定义 props 名',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'header-cell-props',
      title: 'header cell 部分的自定义 props 名',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'header-height',
      title: 'Header 的高度由height设置。 如果传入数组，它会使 header row 等于数组长度',
      defaultValue: 50,
      setters: ['NumberSetter', 'ExpressionSetter']
    },
    {
      name: 'footer-height',
      title: 'Footer 部分的高度，当传入值时，这部分将被计算入 table 的高度里',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'row-class',
      title: 'row wrapper 部分的自定义 class 名',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
    },
    {
      name: 'row-key',
      title: '每行的 key 值，如果不提供，将使用索引 index 代替',
      defaultValue: 'id',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'row-props',
      title: 'row component 部分的自定义 class 名',
      defaultValue: '',
      setters: ['JSONSetter', 'ExpressionSetter']
    },
    {
      name: 'row-height',
      title: '每行的高度, 用于计算表的总高度',
      defaultValue: 50,
      setters: 'NumberSetter'
    },
    {
      name: 'row-event-handlers',
      title: '当每行添加了一系列事件处理器时触发',
      setters: 'ObjectSetter'
    },
    {
      name: 'cell-props',
      title: '每个单元格 cell 的自定义 props (除了 header cell 以外)',
      defaultValue: 50,
      setters: ['ObjectSetter', 'FunctionSetter']
    },
    {
      name: 'columns',
      title: '列 column 的配置数组',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'data',
      title: '要在表中渲染的数据数组',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'data-getter',
      title: '一个自定义方法从数据源获取数据',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'fixed-data',
      title: '渲染行在表格主内容上方和 header 下方区域的数据',
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
      title: '存放行展开状态的 key 的数组，可以和 v-model 搭配使用',
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
      title: '表格的类名称，将应用于表格的全部的三个部分 (左、右、主)',
      defaultValue: '',
      setters: ['JSONSetter', 'InputSetter']
    },
    {
      name: 'fixed',
      title: '单元格宽度是自适应还是固定',
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
      title: '表格的最大高度',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'indent-size',
      title: '树形表的水平缩进',
      defaultValue: 12,
      setters: 'NumberSetter'
    },
    {
      name: 'h-scrollbar-size',
      title: '配置表格的水平滚动条大小，防止水平和垂直滚动条重叠',
      defaultValue: 6,
      label: '水平滚动条大小',
      setters: 'NumberSetter'
    },
    {
      name: 'v-scrollbar-size',
      title: '配置表格的垂直滚动条大小，防止水平和垂直滚动条重叠',
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
    // 'row-event-handlers',
    'row-expand'
  ],
  snippet: {
    props: {
      height: 400,
      data: [],
      columns: []
    }
  }
};

export default VirtualizedTable;
