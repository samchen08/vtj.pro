import type { MaterialDescription } from '@vtj/core';
import { mockTableData } from '../shared';
const Table: MaterialDescription[] = [
  {
    name: 'ElTable',
    label: '表格',

    doc: 'https://element-plus.org/zh-CN/component/table.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'data',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'height',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'maxHeight',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'stripe',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        defaultValue: '',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'fit',
        defaultValue: true,
        title: '列的宽度是否自撑开',
        setters: 'BooleanSetter'
      },
      {
        name: 'showHeader',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'highlightCurrentRow',
        defaultValue: false,
        label: '是否高亮',
        setters: 'BooleanSetter'
      },
      {
        name: 'currentRowKey',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'rowClassName',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'rowStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'cellClassName',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'cellStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'headerRowClassName',
        defaultValue: '',
        title: '表头行类名',
        label: 'RowClassName',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'headerRowStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'headerCellClassName',
        defaultValue: '',
        title: '表头单元格类名',
        label: 'CellClassName',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'headerCellStyle',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'rowKey',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'emptyText',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'defaultExpandAll',
        defaultValue: false,
        label: '展开所有',
        setters: 'BooleanSetter'
      },
      {
        name: 'expand-row-keys',
        defaultValue: '',
        title:
          '可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。',
        label: 'row-keys',
        setters: 'JSONSetter'
      },
      {
        name: 'default-sort',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'tooltip-effect',
        defaultValue: 'dark',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'show-summary',
        defaultValue: false,
        label: '显示合计行',
        setters: 'BooleanSetter'
      },
      {
        name: 'sum-text',
        defaultValue: '合计',
        setters: 'InputSetter'
      },
      {
        name: 'summary-method',
        defaultValue: '',
        label: '合计计算方法',
        setters: 'FunctionSetter'
      },
      {
        name: 'span-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'select-on-indeterminate',
        defaultValue: true,
        title:
          '在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行',
        label: 'indeterminate',
        setters: 'BooleanSetter'
      },
      {
        name: 'indent',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'lazy',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'load',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'tree-props',
        defaultValue: { hasChildren: 'hasChildren', children: 'children' },
        setters: 'JSONSetter'
      },
      {
        name: 'tableLayout',
        defaultValue: 'fixed',
        title: '设置表格单元、行和列的布局方式',
        options: ['fixed', 'auto'],
        setters: 'SelectSetter'
      },
      {
        name: 'scrollbar-always-on',
        defaultValue: false,
        label: '显示滚动条',
        setters: 'BooleanSetter'
      },
      {
        name: 'flexible',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: [
      'select',
      'select-all',
      'selection-change',
      'cell-mouse-enter',
      'cell-mouse-leave',
      'cell-click',
      'cell-dblclick',
      'cell-contextmenu',
      'row-click',
      'row-contextmenu',
      'row-dblclick',
      'header-click',
      'header-contextmenu',
      'sort-change',
      'filter-change',
      'current-change',
      'header-dragend',
      'expand-change'
    ],
    slots: ['default', 'append', 'empty'],
    snippet: {
      name: 'ElTable',
      props: {
        data: mockTableData()
      },
      children: [
        {
          name: 'ElTableColumn',
          props: {
            prop: 'date',
            label: 'Date'
          }
        },
        {
          name: 'ElTableColumn',
          props: {
            prop: 'name',
            label: 'Name'
          }
        },
        {
          name: 'ElTableColumn',
          props: {
            prop: 'address',
            label: 'Address'
          }
        }
      ]
    }
  },
  {
    name: 'ElTableColumn',
    label: '表头',

    categoryId: 'data',
    package: 'element-plus',
    parentIncludes: ['ElTable'],
    props: [
      {
        name: 'type',
        defaultValue: '',
        options: ['selection', 'index', 'expand'],
        setters: 'SelectSetter'
      },
      {
        name: 'index',
        defaultValue: 0,
        title: '如果设置了 type=index，可以通过传递 index 属性来自定义索引',
        setters: ['NumberSetter', 'FunctionSetter']
      },
      {
        name: 'label',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'column-key',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prop',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        defaultValue: '',
        title: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'fixed',
        defaultValue: '',
        options: ['left', 'right'],
        setters: ['SelectSetter', 'BooleanSetter']
      },
      {
        name: 'render-header',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sortable',
        defaultValue: false,
        options: ['', 'custom'],
        setters: ['BooleanSetter', 'SelectSetter']
      },
      {
        name: 'sort-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sort-by',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter', 'JSONSetter']
      },
      {
        name: 'sort-orders',
        defaultValue: ['ascending', 'descending', null],
        title:
          '数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序',
        setters: 'JSONSetter'
      },
      {
        name: 'resizable',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'show-overflow-tooltip',
        defaultValue: false,
        title: '当内容过长被隐藏时显示 tooltip',
        label: 'tooltip',
        setters: 'BooleanSetter'
      },
      {
        name: 'align',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'header-align',
        defaultValue: '',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        defaultValue: '',
        title: '当前列标题的自定义类名',
        label: '当前列类名',
        setters: 'InputSetter'
      },
      {
        name: 'selectable',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'reserve-selection',
        defaultValue: false,
        title:
          '仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效。',
        label: '反选',
        setters: 'BooleanSetter'
      },
      {
        name: 'filters',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'filter-placement',
        defaultValue: '',
        title: '过滤弹出框的定位,与 Tooltip 的 placement 属性相同',
        label: 'placement',
        setters: 'InputSetter'
      },
      {
        name: 'filter-multiple',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'filter-method',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'filtered-value',
        defaultValue: '',
        setters: 'JSONSetter'
      }
    ],
    slots: [
      {
        name: 'default',
        params: ['row', 'column', '$index']
      },
      {
        name: 'header',
        params: ['column', '$index']
      }
    ],
    snippet: {
      props: {
        label: '列名'
      }
    }
  }
];

export default Table;
