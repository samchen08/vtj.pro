import type { MaterialDescription } from '@vtj/core';
const Pagination: MaterialDescription = {
  name: 'ElPagination',
  label: '分页',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/pagination.html',
  package: 'element-plus',
  props: [
    {
      name: 'size',
      title: '分页大小',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'background',
      title: '是否为分页按钮添加背景色',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'pageSize',
      title: '每页显示条目个数',
      defaultValue: 10,
      setters: 'NumberSetter'
    },
    {
      name: 'defaultPageSize',
      title: '每页默认的条目个数',
      label: '默认页大小',
      defaultValue: undefined,
      setters: 'NumberSetter'
    },
    {
      name: 'total',
      defaultValue: undefined,
      title: '总条目数',
      setters: 'NumberSetter'
    },
    {
      name: 'pageCount',
      title: '总页数',
      defaultValue: undefined,
      setters: 'NumberSetter'
    },
    {
      name: 'pagerCount',
      title: '设置最大页码按钮数',
      defaultValue: 7,
      setters: 'NumberSetter'
    },
    {
      name: 'currentPage',
      title: '当前页数',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'defaultCurrentPage',
      label: '当前页数的默认初始值',
      defaultValue: undefined,
      setters: 'NumberSetter'
    },
    {
      name: 'layout',
      title: '组件布局',
      defaultValue: 'prev, pager, next, jumper, ->, total',
      setters: 'InputSetter'
    },
    {
      name: 'pageSizes',
      title: '每页显示个数选择器的选项设置',
      defaultValue: [10, 20, 30, 40, 50, 100],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'appendSizeTo',
      title: '下拉框挂载到哪个 DOM 元素',
      setters: 'StringSetter'
    },
    {
      name: 'popperClass',
      title: '每页显示个数选择器的下拉框类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popperStyle',
      title: '\t每页显示个数选择器的下拉框样式',
      defaultValue: '',
      setters: ['InputSetter', 'ObjectSetter']
    },
    {
      name: 'prevText',
      title: '替代图标显示的上一页文字',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'prevIcon',
      title: '上一页的图标， 比 prev-text 优先级更高',
      defaultValue: 'ArrowLeft',
      setters: 'InputSetter'
    },
    {
      name: 'nextText',
      title: '替代图标显示的下一页文字',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'nextIcon',
      title: '下一页的图标， 比 next-text 优先级更低',
      defaultValue: 'ArrowRight',
      setters: 'InputSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用分页',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported ',
      title: '是否将下拉菜单teleport至 body',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'hideOnSinglePage',
      title: '只有一页时是否隐藏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'small',
      title: '是否使用小型分页样式',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'size-change',
    'current-change',
    'change',
    'prev-click',
    'next-click',
    'update:pageSize',
    'update:currentPage'
  ],
  slots: ['default'],
  snippet: {
    props: {
      total: 1000,
      background: true
    }
  }
};
export default Pagination;
