import type { MaterialDescription } from '@vtj/core';
const InputNumber: MaterialDescription = {
  name: 'ElInputNumber',
  label: '数字输入框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input-number.html',
  childIncludes: false,
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'min',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      defaultValue: '',
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
      options: ['large', 'small'],
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
      name: 'label',
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
  slots: ['decrease-icon', 'increase-icon'],
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
