import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ATable',
    alias: 'Table',
    label: '表格',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/table-cn',
    props: [
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否展示外边框和列边框',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'childrenColumnName',
        label: 'childrenColumnName',
        title: '指定树形结构的列名',
        setters: 'StringSetter',
        defaultValue: 'children'
      },
      {
        name: 'columns',
        label: 'columns',
        title: '表格列的配置描述',
        setters: 'ArraySetter' //?? 	array
      },
      {
        name: 'components',
        label: 'components',
        title: '覆盖默认的 table 元素',
        setters: 'ObjectSetter' //?? object
      },
      {
        name: 'customHeaderRow',
        label: 'customHeaderRow',
        title: '设置头部行属性',
        setters: 'FunctionSetter' //?? Function(columns, index)
      },
      {
        name: 'customRow',
        label: 'customRow',
        title: '设置行属性',
        setters: 'FunctionSetter' //?? Function(record, index)
      },
      {
        name: 'dataSource',
        label: 'dataSource',
        title: '数据数组',
        setters: 'ArraySetter' //?? 	object[]
      },
      {
        name: 'defaultExpandAllRows',
        label: 'defaultExpandAllRows',
        title: '初始时，是否展开所有行',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultExpandedRowKeys',
        label: 'defaultExpandedRowKeys',
        title: '默认展开的行',
        setters: 'ArraySetter' //?? 	string[]
      },
      {
        name: 'expandedRowKeys',
        label: 'expandedRowKeys',
        title: '展开的行，控制属性',
        setters: 'ArraySetter' //?? string[]
      },
      {
        name: 'expandedRowRender',
        label: 'expandedRowRender',
        title: '额外的展开行',
        setters: 'FunctionSetter' //?? <= 	Function(record, index, indent, expanded):VNode | v-slot:expandedRowRender="{record, index, indent, expanded}"
      },
      {
        name: 'expandFixed',
        label: 'expandFixed',
        title: '控制展开图标是否固定，可选 true left right',
        setters: ['BooleanSetter', 'StringSetter'], //?? boolean | string
        defaultValue: false
      },
      {
        name: 'expandIcon',
        label: 'expandIcon',
        title: '自定义展开图标',
        setters: 'FunctionSetter' //?? Function(props):VNode | v-slot:expandIcon="props"
      },
      {
        name: 'expandRowByClick',
        label: 'expandRowByClick',
        title: '通过点击行来展开子行',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'footer',
        label: 'footer',
        title: '表格尾部',
        setters: 'FunctionSetter' //?? Function(currentPageData)|v-slot:footer="currentPageData"
      },
      {
        name: 'getPopupContainer',
        label: 'getPopupContainer',
        title: '设置表格内各类浮层的渲染节点，如筛选菜单',
        setters: 'FunctionSetter'
      },
      {
        name: 'indentSize',
        label: 'indentSize',
        title: '展示树形数据时，每层缩进的宽度，以 px 为单位',
        setters: 'NumberSetter',
        defaultValue: 15
      },
      {
        name: 'loading',
        label: 'loading',
        title: '页面是否加载中',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? 	boolean|object
        defaultValue: false
      },
      {
        name: 'locale',
        label: 'locale',
        title: '默认文案设置，目前包括排序、过滤、空数据文案',
        setters: 'ObjectSetter',
        defaultValue: {
          filterConfirm: '确定',
          filterReset: '重置',
          emptyText: '暂无数据'
        }
      },
      {
        name: 'pagination',
        label: 'pagination',
        title:
          '分页器，参考配置项或 pagination文档，设为 false 时不展示和进行分页',
        setters: ['ObjectSetter', 'BooleanSetter'] //?? 	object | false
      },
      {
        name: 'rowClassName',
        label: 'rowClassName',
        title: '表格行的类名',
        setters: 'FunctionSetter' //?? Function(record, index):string
      },
      {
        name: 'rowExpandable',
        label: 'rowExpandable',
        title: '设置是否允许行展开',
        setters: 'FunctionSetter' //?? (record) => boolean
      },
      {
        name: 'rowKey',
        label: 'rowKey',
        title: '表格行 key 的取值，可以是字符串或一个函数',
        setters: ['StringSetter', 'FunctionSetter'], //?? string|Function(record):string
        defaultValue: 'key'
      },
      {
        name: 'rowSelection',
        label: 'rowSelection',
        title: '列表项是否可选择',
        setters: 'ObjectSetter',
        defaultValue: null
      },
      {
        name: 'scroll',
        label: 'scroll',
        title: '表格是否可滚动，也可以指定滚动区域的宽、高',
        setters: 'ObjectSetter'
      },
      {
        name: 'showExpandColumn',
        label: 'showExpandColumn',
        title: '设置是否展示行展开列',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'showHeader',
        label: 'showHeader',
        title: '是否显示表头',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'showSorterTooltip',
        label: 'showSorterTooltip',
        title:
          '表头是否显示下一次排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 的属性',
        setters: ['BooleanSetter', 'ObjectSetter'], //?? boolean | Tooltip props
        defaultValue: true
      },
      {
        name: 'size',
        label: 'size',
        title: '表格大小',
        setters: 'SelectSetter',
        options: ['large', 'middle', 'small'],
        defaultValue: 'large'
      },
      {
        name: 'sortDirections',
        label: 'sortDirections',
        title: '支持的排序方式，取值为 ascend descend',
        setters: 'ArraySetter',
        defaultValue: ['ascend', 'descend']
      },
      {
        name: 'sticky',
        label: 'sticky',
        title: '设置粘性头部和滚动条',
        setters: ['BooleanSetter', 'ObjectSetter'] //?? 	boolean | {offsetHeader?: number, offsetScroll?: number, getContainer?: () => HTMLElement}
      },
      {
        name: 'tableLayout',
        label: 'tableLayout',
        title:
          '表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局',
        setters: 'SelectSetter', //?? 	- | 'auto' | 'fixed'
        options: ['-', 'auto', 'fixed']
      },
      {
        name: 'title',
        label: 'title',
        title: '表格标题',
        setters: 'FunctionSetter'
      },
      {
        name: 'transformCellText',
        label: 'transformCellText',
        title:
          '数据渲染前可以再次改变，一般用于空数据的默认配置，可以通过 ConfigProvider 全局统一配置',
        setters: 'FunctionSetter' //?? Function({ text, column, record, index }) => any，此处的 text 是经过其它定义单元格 api 处理后的数据，有可能是 VNode | string | number 类型
      }
    ],
    events: [
      'change',
      'expand',
      'expandedRowsChange',
      'resizeColumn',
      'update:expandedRowKeys'
    ],
    slots: [
      { name: 'default' },
      { name: 'bodyCell', params: ['text', 'record', 'index', 'column'] },
      { name: 'customFilterDropdown' },
      { name: 'customFilterIcon', params: ['filtered', 'column'] },
      { name: 'emptyText' },
      {
        name: 'expandedRowRender',
        params: ['record', 'index', 'indent', 'expanded']
      },
      {
        name: 'expandColumnTitle'
      },
      { name: 'expandIcon', params: ['props'] },
      { name: 'expandIcon', params: ['currentPageData'] },
      {
        name: 'headerCell',
        params: ['title', 'column']
      },
      {
        name: 'summary'
      },
      { name: 'title', params: ['currentPageData'] },
      { name: 'transformCellText' }
    ],
    snippet: {
      props: {
        columns: [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
          },
          {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags'
          },
          {
            title: 'Action',
            key: 'action'
          }
        ],
        dataSource: [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser']
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
          }
        ]
      }
      // children: [
      //   {
      //     name: 'div',
      //     slot: { name: 'headerCell', params: ['column'] },
      //     children: [{ name: 'span', children: 'Name??' }]
      //   },
      //   {
      //     name: 'div',
      //     slot: { name: 'bodyCell', params: ['column', 'record'] },
      //     children: [
      //       { name: 'a', children: 'record.name' },
      //       {
      //         name: 'template',
      //         children: [
      //           {
      //             name: 'span',
      //             children: [
      //               {
      //                 name: 'ATag',
      //                 props: { color: 'volcano' },
      //                 children: 'tag.toUpperCase()'
      //               }
      //             ]
      //           }
      //         ]
      //       },
      //       {
      //         name: 'template',
      //         children: [
      //           {
      //             name: 'span',
      //             children: [
      //               {
      //                 name: 'a',
      //                 children: 'Invite 一 {{ record.name }}'
      //               },
      //               {
      //                 name: 'ADivider',
      //                 props: { type: 'vertical' }
      //               },
      //               {
      //                 name: 'a',
      //                 children: 'Delete'
      //               },
      //               {
      //                 name: 'ADivider',
      //                 props: { type: 'vertical' }
      //               },
      //               {
      //                 name: 'a',
      //                 children: 'More actions'
      //               }
      //             ]
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    }
  }
];
export default components;
