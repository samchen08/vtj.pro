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
      title: '选中项绑定值',
      defaultValue: '',
      setters: ['ArraySetter', 'ExpressionSetter']
    },
    {
      name: 'data',
      title: 'Transfer 的数据源',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'filterable',
      title: '是否可搜索',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'filterPlaceholder',
      title: '搜索框占位符',
      defaultValue: 'Enter keyword',
      setters: 'InputSetter'
    },
    {
      name: 'filterMethod',
      title: '自定义搜索方法',
      setters: 'FunctionSetter'
    },
    {
      name: 'targetOrder',
      title: '右侧列表元素的排序策略： 若为 original，则保持与数据源相同的顺序； 若为 push，则新加入的元素排在最后； 若为 unshift，则新加入的元素排在最前',
      defaultValue: 'original',
      options: ['original', 'push', 'unshift'],
      setters: 'SelectSetter'
    },
    {
      name: 'titles',
      title: '自定义列表标题',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'buttonTexts',
      title: '自定义按钮文案',
      defaultValue: [],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'renderContent',
      title: '自定义数据项渲染函数',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'format',
      title: '列表顶部勾选状态文案',
      defaultValue: '',
      setters: ['ObjectSetter', 'JSONSetter']
    },
    {
      name: 'props',
      title: '数据源的字段别名',
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
      title: '是否触发表单验证',
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
