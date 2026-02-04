import type { MaterialDescription } from '@vtj/core';

const dateTime: MaterialDescription = {
  name: 'ElDateTimePicker',
  label: '日期时间选择器',
  alias: 'ElDatePicker',
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/datetime-picker.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '绑定值',
      defaultValue: '',
      setters: ['NumberSetter', 'StringSetter', 'ExpressionSetter']
    },
    {
      name: 'readonly',
      title: '只读',
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
      setters: 'StringSetter'
    },
    {
      name: 'startPlaceholder',
      defaultValue: '',
      title: '范围选择时开始日期的占位内容',
      setters: 'StringSetter'
    },
    {
      name: 'endPlaceholder',
      defaultValue: '',
      title: '范围选择时结束日期的占位内容',
      setters: 'InputSetter'
    },
    {
      name: 'arrowControl',
      title: '是否使用箭头进行时间选择',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'type',
      defaultValue: 'date',
      title: '显示类型',
      options: [
        'year',
        'month',
        'date',
        // 'dates',
        'datetime',
        'week',
        'datetimerange',
        'daterange',
        // 'monthrange'
      ],
      setters: 'SelectSetter'
    },
    {
      name: 'format',
      title: '显示在输入框中的格式',
      defaultValue: 'YYYY-MM-DD HH:mm:ss',
      setters: 'StringSetter'
    },
    {
      name: 'popperClass',
      title: 'DateTimePicker 下拉框的类名',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'popperStyle',
      title: '弹出内容的自定义样式',
      defaultValue: '',
      setters: ['StringSetter', 'ObjectSetter']
    },
    {
      name: 'popper-options',
      title: '自定义 popper 选项',
      defaultValue: '',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'fallback-placements',
      title: 'Tooltip 可用的 positions',
      defaultValue: ['bottom', 'top', 'right', 'left'],
      setters: 'ArraySetter'
    },
    {
      name: 'placement',
      title: '下拉框出现的位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ]
    },
    {
      name: 'rangeSeparator',
      defaultValue: '-',
      title: '选择范围时的分隔符',
      setters: 'StringSetter'
    },
    {
      name: 'defaultValue',
      title: '可选，选择器打开时默认显示的时间',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'defaultTime',
      title: '选择日期后的默认时间值。 如未指定则默认时间值为 00:00:00',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'valueFormat',
      title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'dateFormat',
      defaultValue: 'YYYY-MM-DD',
      setters: 'StringSetter',
      title: '输入框内部面板中显示的日期格式'
    },
    {
      name: 'timeFormat',
      defaultValue: '\tHH:mm:ss',
      setters: 'StringSetter',
      title: '输入框内部面板中显示的时间格式'
    },
    {
      name: 'id',
      title: '等价于原生 input id 属性',
      defaultValue: '',
      setters: ['StringSetter', 'ArraySetter', 'ExpressionSetter']
    },
    {
      name: 'name',
      title: '等价于原生 input name 属性',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'unlinkPanels',
      title: '在范围选择器里取消两个日期面板之间的联动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'prefixIcon',
      defaultValue: 'Date',
      title: '自定义前缀图标',
      setters: 'InputSetter'
    },
    {
      name: 'clearIcon',
      defaultValue: 'CircleClose',
      title: '自定义清除图标',
      setters: 'InputSetter'
    },
    {
      name: 'shortcuts',
      defaultValue: '',
      title: '设置快捷选项，需要传入数组对象',
      setters: 'JSONSetter'
    },
    {
      name: 'disabledDate',
      title: '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled-hours',
      title: '禁止选择部分小时选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled-minutes',
      title: '禁止选择部分分钟选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled-seconds',
      title: '禁止选择部分秒选项',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'cellClassName',
      defaultValue: '',
      title: '设置自定义类名',
      setters: 'FunctionSetter'
    },
    {
      name: 'teleported',
      defaultValue: true,
      title: '是否将 datetime-picker 的下拉列表插入至 body 元素',
      setters: 'BooleanSetter'
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
      name: 'showNow',
      title: '是否显示 now 按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-footer',
      title: '是否显示 footer',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-confirm',
      title: '是否显示确定按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-week-number',
      title: '显示周数(除周外)',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'blur'
    },
    {
      name: 'focus'
    },
    {
      name: 'clear'
    },
    {
      name: 'calendar-change'
    },
    {
      name: 'visible-change'
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'range-separator'
    },
    {
      name: 'prev-month'
    },
    {
      name: 'next-month'
    },
    {
      name: 'prev-year'
    },
    {
      name: 'next-year'
    }
  ],
  snippet: {
    props: {
      type: 'datetime',
      placeholder: 'Select date and time'
    }
  }
};

export default dateTime;
