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
      defaultValue: '',
      setters: 'ExpressionSetter'
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
      label: '开始日期',
      setters: 'InputSetter'
    },
    {
      name: 'endPlaceholder',
      defaultValue: '',
      title: '范围选择时结束日期的占位内容',
      label: '结束日期',
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
      defaultValue: 'YYYY-MM-DD',
      setters: 'InputSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rangeSeparator',
      defaultValue: '-',
      title: '选择范围时的分隔符',
      label: '分隔符',
      setters: 'InputSetter'
    },
    {
      name: 'defaultValue',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'defaultTime',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'valueFormat',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'dateFormat',
      defaultValue: '',
      setters: 'InputSetter',
      title: '时间选择器下拉列表中显示的日期格式'
    },
    {
      name: 'timeFormat',
      defaultValue: '',
      setters: 'InputSetter',
      title: '时间选择器下拉列表中显示的时间格式'
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
      title: '设置自定义类名',
      setters: 'BooleanSetter'
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
    }
  ]
};

export default DatePicker;
