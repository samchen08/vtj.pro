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
      setters: 'ExpressionSetter'
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
      name: 'effect',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'format',
      defaultValue: 'HH:mm',
      setters: 'InputSetter'
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
    }
  ],
  events: ['change', 'blur', 'focus', 'update:modelValue']
};

export default TimeSelect;
