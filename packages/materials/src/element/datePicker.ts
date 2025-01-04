import type { MaterialDescription } from '@vtj/core';
const DatePicker: MaterialDescription = {
  name: 'ElDatePicker',
  label: '日期选择器',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/date-picker.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '绑定值，如果它是数组，长度应该是 2',
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
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'editable',
      title: '文本框可输入',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearable',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'startPlaceholder',
      defaultValue: '',
      title: '范围选择时开始日期的占位内容',
      setters: 'InputSetter'
    },
    {
      name: 'endPlaceholder',
      defaultValue: '',
      title: '范围选择时结束日期的占位内容',
      setters: 'InputSetter'
    },
    {
      name: 'type',
      defaultValue: 'date',
      title: '显示类型',
      options: [
        'year',
        'month',
        'date',
        'dates',
        'datetime',
        'week',
        'datetimerange',
        'daterange',
        'monthrange'
      ],
      setters: 'SelectSetter'
    },
    {
      name: 'format',
      title: '显示在输入框中的格式',
      defaultValue: 'YYYY-MM-DD',
      setters: 'InputSetter'
    },
    {
      name: 'popperClass',
      title: 'DatePicker 下拉框的类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popper-options',
      title: '自定义 popper 选项',
      defaultValue: '',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'rangeSeparator',
      defaultValue: '-',
      title: '选择范围时的分隔符',
      setters: 'InputSetter'
    },
    {
      name: 'defaultValue',
      title: '可选，选择器打开时默认显示的时间',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'defaultTime',
      title: '范围选择时选中日期所使用的当日内具体时刻',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'valueFormat',
      title: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'id',
      defaultValue: '',
      setters: ['InputSetter']
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
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
      name: 'validateEvent',
      defaultValue: true,
      title: '输入时是否触发表单的校验',
      setters: 'BooleanSetter'
    },
    {
      name: 'disabledDate',
      title:
        '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'shortcuts',
      defaultValue: '',
      title: '设置快捷选项，需要传入数组对象',
      setters: 'JSONSetter'
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
      title: '是否将 date-picker 的下拉列表插入至 body 元素',
      setters: 'BooleanSetter'
    },
    {
      name: 'empty-values',
      title: '组件的空值配置',
      setters: 'ArraySetter'
    },
    {
      name: 'value-on-clear',
      title: '清空选项的值',
      setters: [
        'StringSetter',
        'NumberSetter',
        'BooleanSetter',
        'FunctionSetter'
      ]
    },
    {
      name: 'fallback-placements',
      title: 'Tooltip 可用的 positions',
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
    }
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
      name: 'panel-change'
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
  ]
};

export default DatePicker;
