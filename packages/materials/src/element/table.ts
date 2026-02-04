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
        title: '表数据',
        defaultValue: '',
        setters: ['ArraySetter', 'JSONSetter']
      },
      {
        name: 'height',
        title: 'table 的高度。 默认为自动高度',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'maxHeight',
        title: 'table 的最大高度',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'stripe',
        title: '是否为斑马纹 table',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'border',
        title: '是否带有纵向边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        title: 'Table 的尺寸',
        defaultValue: '',
        options: ['', 'large', 'default', 'small'],
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
        title: '是否显示表头',
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
        title: '当前行的 key，只写属性名',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'rowClassName',
        title: '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'rowStyle',
        title: '行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'cellClassName',
        title: '单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'cellStyle',
        title: '单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style',
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
        title: '表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style',
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
        title: '表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style',
        defaultValue: '',
        setters: ['JSONSetter', 'FunctionSetter']
      },
      {
        name: 'rowKey',
        title: '行数据的 Key，用来优化 Table 的渲染。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function',
        defaultValue: '',
        setters: ['InputSetter', 'FunctionSetter']
      },
      {
        name: 'emptyText',
        title: '空数据时显示的文本内容',
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
        title: '默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'tooltip-effect',
        title: '溢出的 tooltip 的 effect',
        defaultValue: 'dark',
        options: ['dark', 'light'],
        setters: 'SelectSetter'
      },
      {
        name: 'tooltip-options',
        title: '溢出 tooltip 的选项',
        defaultValue: {
          enterable: true,
          placement: 'top',
          showArrow: true,
          hideAfter: 200,
          popperOptions: { strategy: 'fixed' }
        },
        setters: 'ObjectSetter'
      },
      {
        name: 'append-filter-panel-to',
        title: '挂载到哪个 DOM 元素',
        setters: 'StringSetter'
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
        title: '合并行或列的计算方法',
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
        title: '展示树形数据时，树节点的缩进',
        defaultValue: 16,
        setters: 'NumberSetter'
      },
      {
        name: 'lazy',
        title: '是否懒加载子节点数据',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'load',
        title: '加载子节点数据的函数，lazy 为 true 时生效',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'tree-props',
        title: '渲染嵌套数据的配置选项',
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
        name: 'show-overflow-tooltip',
        setters: ['BooleanSetter', 'JSONSetter']
      },
      {
        name: 'flexible',
        title: '确保主轴的最小尺寸，以便不超过内容',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'scrollbarTabindex',
        title: 'body 的滚动条的包裹容器 tabindex',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'allowDragLastColumn',
        title: '是否允许拖动最后一列',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'tooltipFormatter',
        title: '自定义 show-overflow-tooltip 时的 tooltip 内容',
        setters: 'FunctionSetter'
      },
      {
        name: 'preserveExpandedContent',
        title: '在折叠后是否在DOM中保留展开行内容',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'nativeScrollbar',
        title: '是否使用原生滚动条样式',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'rowExpandable',
        title: '启用可展开行，当表格具有 type="expand" 列时有效',
        setters: 'FunctionSetter'
      },
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
      'expand-change',
      'scroll'
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
    // parentIncludes: ['ElTable'],
    props: [
      {
        name: 'type',
        title: '对应列的类型',
        defaultValue: 'default',
        options: ['default', 'selection', 'index', 'expand'],
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
        title: '显示的标题',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'column-key',
        title: 'column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'prop',
        title: '字段名称 对应列内容的字段名， 也可以使用 property属性',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'width',
        title: '对应列的宽度',
        defaultValue: '',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'min-width',
        defaultValue: '',
        title: '对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列',
        setters: ['InputSetter', 'NumberSetter']
      },
      {
        name: 'fixed',
        title: '列是否固定在左侧或者右侧。 true 表示固定在左侧',
        defaultValue: '',
        options: ['left', 'right'],
        setters: ['SelectSetter', 'BooleanSetter']
      },
      {
        name: 'render-header',
        title: '列标题 Label 区域渲染使用的 Function',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sortable',
        title: '对应列是否可以排序， 如果设置为 \'custom\'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件',
        defaultValue: false,
        options: ['', 'custom'],
        setters: ['BooleanSetter', 'SelectSetter']
      },
      {
        name: 'sort-method',
        title: '指定数据按照哪个属性进行排序，仅当sortable设置为true的时候有效。 应该如同 Array.sort 那样返回一个 Number',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'sort-by',
        title: '指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推',
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
        title: '对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'formatter',
        title: '用来格式化内容',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'show-overflow-tooltip',
        defaultValue: undefined,
        title: '当内容过长被隐藏时显示 tooltip',
        setters: ['BooleanSetter', 'JSONSetter']
      },
      {
        name: 'align',
        title: '对齐方式',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'header-align',
        title: '表头对齐方式， 若不设置该项，则使用表格的对齐方式',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
        setters: 'SelectSetter'
      },
      {
        name: 'class-name',
        title: '列的 className',
        defaultValue: '',
        setters: 'InputSetter'
      },
      {
        name: 'label-class-name',
        defaultValue: '',
        title: '当前列标题的自定义类名',
        setters: 'InputSetter'
      },
      {
        name: 'selectable',
        title: '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
        setters: 'FunctionSetter'
      },
      {
        name: 'reserve-selection',
        defaultValue: false,
        title:
          '仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效。',
        setters: 'BooleanSetter'
      },
      {
        name: 'filters',
        title: '数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'filter-placement',
        defaultValue: '',
        title: '过滤弹出框的定位,与 Tooltip 的 placement 属性相同',
        setters: 'InputSetter'
      },
      {
        name: 'filter-class-name',
        title: '过滤弹出框的 className',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'filter-multiple',
        title: '数据过滤的选项是否多选',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'filter-method',
        title: '数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示',
        defaultValue: '',
        setters: 'FunctionSetter'
      },
      {
        name: 'filtered-value',
        title: '选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性',
        defaultValue: '',
        setters: 'JSONSetter'
      },
      {
        name: 'tooltip-formatter',
        title: '使用 show-overflow-tooltip 时自定义 tooltip 内容',
        setters: 'FunctionSetter'
      },
    ],
    slots: [
      {
        name: 'default',
        params: ['row', 'column', '$index']
      },
      {
        name: 'header',
        params: ['column', '$index']
      },
      {
        name: 'filter-icon',
        params: ['filterOpened']
      },
      {
        name: 'expand',
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
