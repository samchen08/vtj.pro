import type { MaterialDescription } from '@vtj/core';
const Pagination: MaterialDescription = {
  name: 'ElPagination',
  label: '分页',

  categoryId: 'data',
  doc: 'https://element-plus.org/zh-CN/component/pagination.html',
  package: 'element-plus',
  props: [
    {
      name: 'small',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'background',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'pageSize',
      defaultValue: 10,
      setters: 'NumberSetter'
    },
    {
      name: 'defaultPageSize',
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
      defaultValue: undefined,
      setters: 'NumberSetter'
    },
    {
      name: 'pagerCount',
      defaultValue: 7,
      setters: 'NumberSetter'
    },
    {
      // name: 'current-page',
      name: 'currentPage',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'defaultCurrentPage',
      label: '默认当前页',
      defaultValue: undefined,
      setters: 'NumberSetter'
    },
    {
      name: 'layout',
      defaultValue: undefined,
      setters: 'InputSetter'
    },
    {
      name: 'pageSizes',
      defaultValue: [10, 20, 30, 40, 50, 100],
      setters: 'JSONSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'prevText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'prevIcon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'nextText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'nextIcon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported ',
      label: 'teleported ',
      title: '是否将下拉菜单teleport至 body',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'hideOnSinglePage',
      defaultValue: '',
      label: '只有一页隐藏',
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
