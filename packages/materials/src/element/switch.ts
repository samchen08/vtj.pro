import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';
const Switch: MaterialDescription = {
  name: 'ElSwitch',
  label: '开关',

  doc: 'https://element-plus.org/zh-CN/component/switch.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '绑定值',
      defaultValue: false,
      setters: ['BooleanSetter', 'NumberSetter', 'InputSetter']
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否显示加载中',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    size('size'),
    {
      name: 'width',
      title: 'switch 的宽度',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'inlinePrompt',
      title: '无论图标或文本是否显示在点内，只会呈现文本的第一个字符',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'activeIcon',
      title: 'switch 状态为 on 时所显示图标，设置此项会忽略 active-text',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveIcon',
      title: 'switch 状态为 off 时所显示图标，设置此项会忽略 inactive-text',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'activeActionIcon',
      title: 'on状态下显示的图标',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveActionIcon',
      title: 'off状态下显示的图标',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'activeText',
      title: 'switch 打开时的文字描述',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'inactiveText',
      title: 'switch 的状态为 off 时的文字描述',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'activeValue',
      title: 'switch 状态为 on 时的值',
      defaultValue: true,
      setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
    },
    {
      name: 'inactiveValue',
      title: 'switch的状态为 off 时的值',
      defaultValue: false,
      setters: ['BooleanSetter', 'InputSetter', 'NumberSetter']
    },
    {
      name: 'name',
      title: 'switch 对应的 name 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'validateEvent',
      title: '是否触发表单验证',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'beforeChange',
      title: 'switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换',
      setters: ['BooleanSetter', 'FunctionSetter']
    },
    { name: 'id', title: 'input 的 id', defaultValue: '', setters: 'StringSetter' },
    {
      name: 'tabindex',
      title: 'input 的 tabindex',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    { name: 'ariaLabel', title: '等价于原生 input aria-label 属性', defaultValue: '', setters: 'StringSetter' },
    {
      name: 'activeColor',
      title: '当在 on 状态时的背景颜色',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'inactiveColor',
      title: 'off 状态时的背景颜色',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'borderColor',
      title: '开关的边框颜色 ',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    { name: 'label', title: '等价于原生 input aria-label 属性', defaultValue: '', setters: 'StringSetter' }
  ],
  events: ['change', 'update:modelValue'],
  slots: ['active-action', 'inactive-action', 'active', 'inactive'],
};

export default Switch;
