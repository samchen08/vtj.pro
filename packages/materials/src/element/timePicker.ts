import type { MaterialDescription } from '@vtj/core';
const TimePicker: MaterialDescription = {
  name: 'ElTimePicker',
  label: '时间选择器',

  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/time-picker.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '绑定值',
      defaultValue: '',
      setters: [
        'NumberSetter',
        'StringSetter',
        'ArraySetter',
        'ExpressionSetter'
      ]
    },
    {
      name: 'readonly',
      title: '完全只读',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '禁用',
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
      name: 'startPlaceholder',
      title: '范围选择时开始日期的占位内容',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'endPlaceholder',
      title: '范围选择时结束日期的占位内容',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'isRange',
      title: '是否为时间范围选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'arrowControl',
      title: '是否使用箭头进行时间选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperClass',
      title: 'TimePicker 下拉框的类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popperStyle',
      title: '为 TimePicke 的下拉菜单自定义样式',
      defaultValue: '',
      setters: ['InputSetter', 'ObjectSetter']
    },
    {
      name: 'popperOptions',
      title: '自定义 popper 选项',
      defaultValue: '',
      setters: 'ObjectSetter'
    },
    {
      name: 'fallbackPlacements',
      title: 'Tooltip 可用的 positions ',
      defaultValue: ['bottom', 'top', 'right', 'left'],
      setters: 'ArraySetter'
    },
    {
      name: 'placement',
      title: '下拉框出现的位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: [
        'top'
        ,'top-start'
        ,'top-end'
        ,'bottom'
        ,'bottom-start'
        ,'bottom-end'
        ,'left'
        ,'left-start'
        ,'left-end'
        ,'right'
        ,'right-start'
        ,'right-end'
      ],
    },
    {
      name: 'rangeSeparator',
      title: '选择范围时的分隔符',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'format',
      title: '显示在输入框中的格式',
      defaultValue: 'HH:mm:ss',
      setters: 'InputSetter'
    },
    {
      name: 'defaultValue',
      title: '可选，选择器打开时默认显示的时间',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
    },
    {
      name: 'valueFormat',
      title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'id',
      title: '等价于原生 input id 属性',
      defaultValue: '',
      setters: ['InputSetter']
    },
    {
      name: 'name',
      title: '等价于原生 input name 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    { name: 'ariaLabel', title: '等价于原生 input aria-label 属性', defaultValue: '', setters: 'InputSetter' },
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
      name: 'disabledHours',
      title: '禁止选择部分小时选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabledMinutes',
      title: '禁止选择部分分钟选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabledSeconds',
      title: '禁止选择部分秒选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'teleported',
      title: '是否将 popover 的下拉列表镜像至 body 元素',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'tabindex',
      label: 'tabindex',
      title: '输入框的 tabindex',
      setters: ['StringSetter', 'NumberSetter'],
      defaultValue: 0
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
    }
  ],
  events: [
    'change',
    'blur',
    'focus',
    'clear',
    'visible-change',
    'update:modelValue'
  ]
};

export default TimePicker;
