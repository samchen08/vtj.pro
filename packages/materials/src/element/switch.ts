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
      name: 'activeActionIcon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveActionIcon',
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
      setters: ['BooleanSetter', 'FunctionSetter']
    },
    { name: 'id', defaultValue: '', setters: 'StringSetter' },
    {
      name: 'tabindex',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    { name: 'ariaLabel', defaultValue: '', setters: 'StringSetter' },
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
    { name: 'label', defaultValue: '', setters: 'StringSetter' }
  ],
  events: ['change', 'update:modelValue'],
  slots: ['active-action', 'inactive-action']
};

export default Switch;
