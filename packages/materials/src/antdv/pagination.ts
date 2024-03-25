import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'APagination',
    alias: 'Pagination',
    label: '分页',
    categoryId: 'nav',
    doc: 'https://www.antdv.com/components/pagination-cn',
    props: [
      {
        name: 'current',
        label: 'current',
        title: '当前页数',
        setters: 'NumberSetter'
      },
      {
        name: 'defaultPageSize',
        label: 'defaultPageSize',
        title: '默认的每页条数',
        setters: 'NumberSetter',
        defaultValue: 10
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '禁用分页',
        setters: 'BooleanSetter'
      },
      {
        name: 'hideOnSinglePage',
        label: 'hideOnSinglePage',
        title: '只有一页时是否隐藏分页器',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'itemRender',
        label: 'itemRender',
        title: '用于自定义页码的结构，可用于优化 SEO',
        setters: 'FunctionSetter'
      },
      {
        name: 'pageSize',
        label: 'pageSize',
        title: '每页条数',
        setters: 'NumberSetter'
      },
      {
        name: 'pageSizeOptions',
        label: 'pageSizeOptions',
        title: '指定每页可以显示多少条',
        setters: 'ArraySetter',
        defaultValue: ['10', '20', '50', '100']
      },
      {
        name: 'responsive',
        label: 'responsive',
        title: '当 size 未指定时，根据屏幕宽度自动调整尺寸',
        setters: 'BooleanSetter'
      },
      {
        name: 'showLessItems',
        label: 'showLessItems',
        title: '是否显示较少页面内容',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'showQuickJumper',
        label: 'showQuickJumper',
        title: '是否可以快速跳转至某页',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'showSizeChanger',
        label: 'showSizeChanger',
        title: '是否展示 pageSize 切换器，当 total 大于 50 时默认为 true',
        setters: 'BooleanSetter'
      },
      {
        name: 'showTotal',
        label: 'showTotal',
        title: '用于显示数据总量和当前数据顺序',
        setters: 'FunctionSetter'
      },
      {
        name: 'simple',
        label: 'simple',
        title: '当添加该属性时，显示为简单分页',
        setters: 'BooleanSetter'
      },
      {
        name: 'size',
        label: 'size',
        title: '当为「small」时，是小尺寸分页',
        setters: 'StringSetter',
        defaultValue: ''
      },
      {
        name: 'total',
        label: 'total',
        title: '数据总数',
        setters: 'NumberSetter',
        defaultValue: 0
      }
    ],
    events: ['change', 'showSizeChange', 'update:current', 'update:pageSize'],
    snippet: {
      name: 'APagination',
      props: {
        total: 1000,
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true
      }
    }
  }
];
export default components;
