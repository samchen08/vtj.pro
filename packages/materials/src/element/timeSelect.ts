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
      defaultValue: '',
      setters: ['StringSetter', 'ExpressionSetter']
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
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
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
      name: 'start',
      defaultValue: '09:00',
      setters: 'InputSetter'
    },
    {
      name: 'end',
      defaultValue: '18:00',
      setters: 'InputSetter'
    },
    {
      name: 'step',
      defaultValue: '00:30',
      setters: 'InputSetter'
    },
    {
      name: 'minTime',
      defaultValue: '00:00',
      setters: 'InputSetter'
    },
    {
      name: 'maxTime',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'format',
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
    }
  ],
  events: ['change', 'blur', 'focus', 'clear', 'update:modelValue']
};

export default TimeSelect;
