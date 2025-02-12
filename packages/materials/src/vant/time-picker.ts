import type { MaterialDescription } from '@vtj/core';

const TimePicker: MaterialDescription = {
  name: 'VanTimePicker',
  alias: 'TimePicker',
  label: '时间选择',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/time-picker',
  props: [
    {
      name: 'modelValue',
      title: '当前选中的时间',
      setters: 'ArraySetter'
    },
    {
      name: 'columns-type',
      title: '选项类型，由 hour、minute 和 second 组成的数组',
      defaultValue: ['hour', 'minute'],
      setters: 'ArraySetter'
    },
    {
      name: 'min-hour',
      title: '可选的最小小时',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'max-hour',
      title: '可选的最大小时',
      defaultValue: 23,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min-minute',
      title: '可选的最小分钟',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'max-minute',
      title: '可选的最大分钟',
      defaultValue: 59,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min-second',
      title: '可选的最小秒数',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'max-second',
      title: '可选的最大秒数',
      defaultValue: 59,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min-time',
      title:
        '可选的最小时间，格式参考 07:40:00，使用时 min-hour min-minute min-second 不会生效',
      setters: 'StringSetter'
    },
    {
      name: 'max-time',
      title:
        '可选的最大时间，格式参考 10:20:00，使用时 max-hour max-minute max-second 不会生效',
      setters: 'StringSetter'
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
    { name: 'confirm', params: ['data'] },
    { name: 'cancel', params: ['data'] },
    { name: 'change', params: ['data'] },
    { name: 'update:modelValue' }
  ],
  slots: [
    { name: 'toolbar' },
    { name: 'title' },
    { name: 'confirm' },
    { name: 'cancel' },
    { name: 'toolbar' },
    { name: 'option', params: ['option', 'index'] },
    { name: 'toolbar' },
    { name: 'columns-top' },
    { name: 'columns-bottom' }
  ],
  snippet: {
    props: {
      title: '选择时间',
      columnsType: ['hour', 'minute', 'second']
    }
  }
};

export default TimePicker;
