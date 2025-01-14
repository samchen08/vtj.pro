import type { MaterialDescription } from '@vtj/core';

const Pagination: MaterialDescription = {
  name: 'VanPagination',
  alias: 'Pagination',
  label: '分页',
  categoryId: 'nav',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/pagination',
  props: [
    {
      name: 'modelValue',
      title: '当前页码',
      setters: 'NumberSetter'
    },
    {
      name: 'mode',
      title: '显示模式',
      defaultValue: 'multi',
      setters: 'SelectSetter',
      options: ['simple', 'multi']
    },
    {
      name: 'prev-text',
      title: '上一页按钮文字',
      defaultValue: '上一页',
      setters: 'StringSetter'
    },
    {
      name: 'next-text',
      title: '下一页按钮文字',
      defaultValue: '下一页',
      setters: 'StringSetter'
    },
    {
      name: 'page-count',
      title: '总页数',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'total-items',
      title: '总记录数',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'items-per-page',
      title: '每页记录数',
      defaultValue: 10,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'show-page-size',
      title: '显示的页码个数',
      defaultValue: 5,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'force-ellipses',
      title: '是否显示省略号',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-prev-button',
      title: '是否展示上一页按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-next-button',
      title: '是否展示下一页按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['update:modelValue', 'change'],
  slots: ['page', 'prev-text', 'next-text'],
  snippet: {
    props: {
      modelValue: 1,
      'total-items': 24,
      'items-per-page': 5
    }
  }
};

export default Pagination;
