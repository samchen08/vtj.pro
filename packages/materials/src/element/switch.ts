import type { MaterialDescription } from '@vtj/core';
const Switch: MaterialDescription = {
  name: 'ElSwitch',
  label: '开关',

  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/switch.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: false,
      setters: ['BooleanSetter', 'NumberSetter', 'InputSetter']
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
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
      name: 'width',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'inlinePrompt',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'activeIcon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveIcon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'activeText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'activeValue',
      defaultValue: true,
      setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
    },
    {
      name: 'inactiveValue',
      defaultValue: false,
      setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
    },
    {
      name: 'activeColor',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'inactiveColor',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'borderColor',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeChange',
      defaultValue: '',
      setters: 'FunctionSetter'
    }
  ],
  events: ['change', 'update:modelValue']
};

export default Switch;
