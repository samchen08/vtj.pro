import type { MaterialDescription } from '@vtj/core';
const TimeSelect: MaterialDescription = {
  name: 'ElTimeSelect',
  label: '时间选择',

  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/time-select.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '选中项绑定值',
      defaultValue: '',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'disabled',
      title: '禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'editable',
      title: '文本框可输入',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearable',
      title: '是否显示清除按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'include-end-time',
      title: '是否在选项中包含end',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      title: '输入框尺寸',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'placeholder',
      title: '非范围选择时的占位内容',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      title: '原生属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      title: 'Tooltip 主题',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'prefixIcon',
      title: '自定义前缀图标',
      defaultValue: 'Clock',
      setters: 'InputSetter'
    },
    {
      name: 'clearIcon',
      title: '自定义清除图标',
      defaultValue: 'CircleClose',
      setters: 'InputSetter'
    },
    {
      name: 'start',
      title: '开始时间',
      defaultValue: '09:00',
      setters: 'InputSetter'
    },
    {
      name: 'end',
      title: '结束时间',
      defaultValue: '18:00',
      setters: 'InputSetter'
    },
    {
      name: 'step',
      title: '间隔时间',
      defaultValue: '00:30',
      setters: 'InputSetter'
    },
    {
      name: 'minTime',
      title: '最早时间点，早于该时间的时间段将被禁用',
      defaultValue: '00:00',
      setters: 'InputSetter'
    },
    {
      name: 'maxTime',
      title: '最晚时间点，晚于该时间的时间段将被禁用',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'format',
      title: '设置时间格式',
      defaultValue: 'HH:mm',
      setters: 'InputSetter'
    },
    {
      name: 'emptyValues',
      title: '组件的空值配置',
      setters: 'ArraySetter'
    },
    {
      name: 'valueOnClear',
      title: '清空选项的值',
      setters: [
        'StringSetter',
        'NumberSetter',
        'BooleanSetter',
        'FunctionSetter'
      ]
    },
    {
      name: 'popper-class',
      title: '为 TimeSelect 下拉面板设置自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'popper-style',
      title: '为 TimeSelect 下拉面板设置自定义样式',
      setters: ['StringSetter', 'ObjectSetter'],
    },
  ],
  events: ['change', 'blur', 'focus', 'clear', 'update:modelValue']
};

export default TimeSelect;
