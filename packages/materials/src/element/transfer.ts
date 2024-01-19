import type { MaterialDescription } from '@vtj/core';
const Transfer: MaterialDescription = {
  name: 'ElTransfer',
  label: '穿梭框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/transfer.html',
  childIncludes: false,
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'data',
      defaultValue: [],
      setters: 'JSONSetter'
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
      defaultValue: ['List 1', 'List 2'],
      setters: 'JSONSetter'
    },
    {
      name: 'buttonTexts',
      defaultValue: [],
      setters: 'JSONSetter'
    },
    {
      name: 'renderContent',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'format',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'props',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'leftDefaultChecked',
      defaultValue: [],
      title: '初始状态下左侧列表的已勾选项的 key 数组',
      label: '左侧勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'rightDefaultChecked',
      defaultValue: [],
      title: '初始状态下右侧列表的已勾选项的 key 数组',
      label: '右侧勾选',
      setters: 'JSONSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'left-footer'
    },
    {
      name: 'right-footer'
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
