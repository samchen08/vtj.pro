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
      setters: 'InputSetter'
    },
    {
      name: 'endPlaceholder',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'isRange',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'arrowControl',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rangeSeparator',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'format',
      defaultValue: 'HH:mm:ss',
      setters: 'InputSetter'
    },
    {
      name: 'defaultValue',
      defaultValue: '',
      setters: ['InputSetter', 'ExpressionSetter']
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
    { name: 'label', defaultValue: '', setters: 'InputSetter' },
    {
      name: 'prefixIcon',
      defaultValue: 'Clock',
      setters: 'InputSetter'
    },
    {
      name: 'clearIcon',
      defaultValue: 'CircleClose',
      setters: 'InputSetter'
    },
    {
      name: 'disabledHours',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabledMinutes',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabledSeconds',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'teleported',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'tabindex',
      label: 'tabindex',
      title: '输入框的 tabindex',
      setters: ['StringSetter', 'NumberSetter'],
      defaultValue: 0
    }
  ],
  events: ['change', 'blur', 'focus', 'visible-change', 'update:modelValue']
};

export default TimePicker;
