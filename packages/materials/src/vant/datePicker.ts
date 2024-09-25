import type { MaterialDescription } from '@vtj/core';

const DatePicker: MaterialDescription = {
  name: 'VantDatePicker',
  alias: 'DatePicker',
  label: '日期选择',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/date-picker',
  props: [
    {
      name: 'modelValue',
      title: '当前选中的日期',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'columns-type',
      title: '选项类型，由 year、month 和 day 组成的数组',
      defaultValue: ['year', 'month', 'day'],
      setters: 'ArraySetter'
    },
    {
      name: 'min-date',
      title: '可选的最小时间，精确到日',
      setters: 'ExpressionSetter'
    },
    {
      name: 'max-date',
      title: '可选的最大时间，精确到日',
      setters: 'ExpressionSetter'
    },
    {
      name: 'title',
      title: '顶部栏标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-text',
      title: '确认按钮文字',
      defaultValue: '确认',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-text',
      title: '取消按钮文字',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'show-toolbar',
      title: '是否显示顶部栏',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否显示加载状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法切换选项',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'filter',
      title: '选项过滤函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'formatter',
      title: '选项格式化函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'option-height',
      title: '选项高度，支持 px vw vh rem 单位，默认 px',
      defaultValue: 44,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'visible-option-num',
      title: '可见的选项个数',
      defaultValue: 6,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'swipe-duration',
      title: '快速滑动时惯性滚动的时长，单位 ms',
      defaultValue: 1000,
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'confirm', params: ['data'] },
    { name: 'cancel', params: ['data'] },
    { name: 'change', params: ['data'] }
  ],
  slots: [
    'toolbar',
    'title',
    'confirm',
    'cancel',
    'option',
    'columns-top',
    'columns-bottom'
  ],
  snippet: {
    props: {
      modelValue: []
    }
  }
};

export default DatePicker;
