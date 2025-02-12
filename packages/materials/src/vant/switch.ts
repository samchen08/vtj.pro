import type { MaterialDescription } from '@vtj/core';

const Switch: MaterialDescription = {
  name: 'VanSwitch',
  alias: 'Switch',
  label: '开关',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/switch',
  props: [
    {
      name: 'modelValue',
      title: '开关选中状态',
      defaultValue: false,
      setters: 'ExpressionSetter'
    },
    {
      name: 'loading',
      title: '是否为加载状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否为禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      title: '开关按钮的尺寸，默认单位为 px',
      defaultValue: 26,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'active-color',
      title: '打开时的背景色',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'inactive-color',
      title: '关闭时的背景色',
      defaultValue: 'rgba(120, 120, 128, 0.16)',
      setters: 'StringSetter'
    },
    {
      name: 'active-value',
      title: '打开时对应的值',
      defaultValue: true,
      setters: 'ExpressionSetter'
    },
    {
      name: 'inactive-value',
      title: '关闭时对应的值',
      defaultValue: false,
      setters: 'ExpressionSetter'
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'change', params: ['value'] },
    { name: 'click', params: ['event'] }
  ],
  slots: ['node', 'background'],
  snippet: {}
};

export default Switch;
