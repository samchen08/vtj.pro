import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniTable',
    label: '表格',
    childIncludes: ['UniTr'],
    categoryId: 'ext',
    props: [
      {
        name: 'border',
        title: '是否带有纵向边框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'stripe',
        title: '是否显示斑马线样式',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'type',
        title: '值为type="selection" 时开启多选',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'emptyText',
        title: '空数据时显示的文本内容',
        defaultValue: '没有更多数据',
        setters: 'StringSetter'
      },
      {
        name: 'loading',
        title: '显示加载中',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['selection-change'],
    snippet: {
      props: {
        border: true,
        stripe: true,
        emptyText: '暂无更多数据'
      },
      children: [
        {
          name: 'UniTr',
          children: [
            { name: 'UniTh', props: { align: 'center' }, children: '日期' },
            { name: 'UniTh', props: { align: 'center' }, children: '姓名' },
            { name: 'UniTh', props: { align: 'center' }, children: '地址' }
          ]
        },
        {
          name: 'UniTr',
          children: [
            { name: 'UniTd', children: '2020-10-20' },
            { name: 'UniTd', children: 'Jason' },
            { name: 'UniTd', children: '北京市海淀区' }
          ]
        }
      ]
    }
  },
  {
    name: 'UniTr',
    label: '表格行',
    childIncludes: ['UniTh', 'UniTd'],
    categoryId: 'ext',
    props: [],
    snippet: {
      children: 'tr'
    }
  },
  {
    name: 'UniTh',
    label: '表格头',
    categoryId: 'ext',
    props: [
      {
        name: 'width',
        title: '单元格宽度',
        defaultValue: '',
        setters: 'StringSetter'
      },
      {
        name: 'align',
        title: '表头对齐方式',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      },
      {
        name: 'filter-type',
        title: '筛选类型',
        setters: 'SelectSetter',
        options: ['search', 'select', 'range', 'date']
      },
      {
        name: 'filter-data',
        title: '筛选数据',
        setters: 'ArraySetter'
      },
      {
        name: 'sortable',
        title: '是否启用排序',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['sort-change', 'filter-change'],
    snippet: {
      children: 'th'
    }
  },
  {
    name: 'UniTd',
    label: '单元格',
    categoryId: 'ext',
    props: [
      {
        name: 'align',
        title: '表头对齐方式',
        defaultValue: 'left',
        setters: 'SelectSetter',
        options: ['left', 'center', 'right']
      }
    ],
    snippet: {
      children: 'td'
    }
  }
];

export default desc;
