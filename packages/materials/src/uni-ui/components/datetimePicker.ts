import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniDatetimePicker',
  label: '日期选择器',
  categoryId: 'ext',
  props: [
    {
      name: 'type',
      title: '选择器类型',
      defaultValue: 'datetime',
      setters: 'SelectSetter',
      options: ['date', 'daterange', 'datetime', 'datetimerange']
    },
    {
      name: 'value',
      title: '输入框当前值',
      defaultValue: '',
      setters: [
        'StringSetter',
        'BooleanSetter',
        'ArraySetter',
        'ExpressionSetter'
      ]
    },
    {
      name: 'start',
      title: '最小值，可以使用日期的字符串(String)、时间戳(Number)',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'end',
      title: '最大值，可以使用日期的字符串(String)、时间戳(Number)',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'return-type',
      title: '返回值格式',
      defaultValue: 'string',
      setters: 'SelectSetter',
      options: ['timestamp', 'string', 'date']
    },
    {
      name: 'border',
      title: '是否有边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'rangeSeparator',
      title: '选择范围时的分隔符',
      defaultValue: '-',
      setters: 'StringSetter'
    },
    {
      name: 'placeholder',
      title: '非范围选择时的占位内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'start-placeholder',
      title: '范围选择时开始日期的占位内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'end-placeholder',
      title: '范围选择时结束日期的占位内容',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否不可选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clear-icon',
      title: '是否显示清除按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'hide-second',
      title: '是否显示秒，只显示时分',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'maskClick', 'show'],
  slots: ['default'],
  snippet: {
    props: {
      type: 'date'
    }
  }
};

export default desc;
