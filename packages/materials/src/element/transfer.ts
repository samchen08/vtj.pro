import type { MaterialDescription } from '@vtj/core';
const Transfer: MaterialDescription = {
  name: 'ElTransfer',
  label: '穿梭框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/transfer.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: ['ArraySetter', 'ExpressionSetter']
    },
    {
      name: 'data',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'filterable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'filterPlaceholder',
      defaultValue: 'Enter keyword',
      setters: 'InputSetter'
    },
    {
      name: 'filterMethod',
      setters: 'FunctionSetter'
    },
    {
      name: 'targetOrder',
      defaultValue: 'original',
      options: ['original', 'push', 'unshift'],
      setters: 'SelectSetter'
    },
    {
      name: 'titles',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'buttonTexts',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'renderContent',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'format',
      defaultValue: '',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'props',
      defaultValue: '',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'leftDefaultChecked',
      defaultValue: [],
      title: '初始状态下左侧列表的已勾选项的 key 数组',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'rightDefaultChecked',
      defaultValue: [],
      title: '初始状态下右侧列表的已勾选项的 key 数组',
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  slots: [
    {
      name: 'default',
      params: ['options']
    },
    {
      name: 'left-footer'
    },
    {
      name: 'right-footer'
    },
    {
      name: 'left-empty'
    },
    {
      name: 'right-empty'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'left-check-change'
    },
    {
      name: 'right-check-change'
    },
    {
      name: 'update:modelValue'
    }
  ]
};

export default Transfer;
