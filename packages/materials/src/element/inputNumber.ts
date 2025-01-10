import type { MaterialDescription } from '@vtj/core';
const InputNumber: MaterialDescription = {
  name: 'ElInputNumber',
  label: '数字输入框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input-number.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'min',
      defaultValue: -Infinity,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      defaultValue: Infinity,
      setters: 'NumberSetter'
    },
    {
      name: 'step',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'stepStrictly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'precision',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
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
      name: 'controls',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'controlsPosition',
      defaultValue: '',
      title: '控制按钮位置',
      label: '按钮位置',
      options: ['', 'right'],
      setters: 'SelectSetter'
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'ariaLabel',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'placeholder',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'valueOnClear',
      defaultValue: '',
      options: ['min', 'max'],
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  slots: [
    { name: 'decreaseIcon' },
    { name: 'increaseIcon' },
    { name: 'prefix' },
    { name: 'suffix' }
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
      name: 'update:modelValue'
    }
  ]
};

export default InputNumber;
