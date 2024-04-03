import type { MaterialDescription } from '@vtj/core';

const dateTime: MaterialDescription = {
  name: 'ElDatePicker',
  label: '日期时间选择器',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/datetime-picker.html',
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
      name: 'size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
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
      name: 'arrowControl',
      label: 'arrowControl',
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
      defaultValue: 'YYYY-MM-DD HH:mm:ss',
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
      name: 'shortcuts',
      defaultValue: '',
      title: '设置快捷选项，需要传入数组对象',
      setters: 'JSONSetter'
    },
    {
      name: 'disabledDate',
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
  ],
  snippet: {
    props: {
      type: 'datetime',
      placeholder: 'Select date and time'
    }
  }
};

export default dateTime;
