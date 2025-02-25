import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniPagination',
  label: '分页器',
  categoryId: 'ext',
  props: [
    {
      name: 'prevText',
      title: '左侧按钮文字',
      defaultValue: '上一页',
      setters: 'StringSetter'
    },
    {
      name: 'nextText',
      title: '右侧按钮文字',
      defaultValue: '下一页',
      setters: 'StringSetter'
    },
    {
      name: 'modelValue',
      title: '当前页',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'current',
      title: '当前页, 优先级高于 value',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'total',
      title: '数据总量',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'pageSize',
      title: '每页数据量',
      defaultValue: 10,
      setters: 'NumberSetter'
    },
    {
      name: 'showIcon',
      title: '是否以 icon 形式展示按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change'],
  snippet: {
    props: {
      total: 50
    }
  }
};

export default desc;
