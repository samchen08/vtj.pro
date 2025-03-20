import type { MaterialDescription } from '@vtj/core';

const Picker: MaterialDescription = {
  name: 'VanPicker',
  alias: 'Picker',
  label: '选择器',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/picker',
  props: [
    {
      name: 'modelValue',
      title: '当前选中项对应的值',
      setters: 'ArraySetter'
    },
    {
      name: 'columns',
      title: '对象数组，配置每一列显示的数据',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'columns-field-names',
      title: '自定义 columns 结构中的字段',
      defaultValue: { text: 'text', value: 'value', children: 'children' },
      setters: 'ObjectSetter'
    },
    {
      name: 'title',
      title: '顶部栏标题',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-text',
      title: '确认按钮文字，设置为空字符串可以隐藏按钮',
      defaultValue: '确认',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-text',
      title: '取消按钮文字，设置为空字符串可以隐藏按钮',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'toolbar-position',
      title: '顶部栏位置，可选值为 bottom',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['top', 'bottom']
    },
    {
      name: 'loading',
      title: '是否显示加载状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法切换选项',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-toolbar',
      title: '是否显示顶部栏',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'allow-html',
      title: '是否允许选项内容中渲染 HTML',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'option-height',
      title: '选项高度，支持 px vw vh rem 单位，默认 px',
      defaultValue: 44,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'visible-option-num',
      title: '可见的选项个数',
      defaultValue: 6,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'swipe-duration',
      title: '快速滑动时惯性滚动的时长，单位 ms',
      defaultValue: 1000,
      setters: ['NumberSetter', 'StringSetter']
    }
  ],
  events: [
    {
      name: 'confirm',
      params: ['data']
    },
    {
      name: 'cancel',
      params: ['data']
    },
    {
      name: 'change',
      params: ['data']
    },
    {
      name: 'clickOption',
      params: ['data']
    },
    {
      name: 'scrollInto',
      params: ['data']
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: [
    'toolbar',
    'title',
    'confirm',
    'cancel',
    'option',
    'columns-top',
    'columns-bottom'
  ],
  snippet: {
    props: {
      title: '标题',
      columns: [
        { text: '杭州', value: 'Hangzhou' },
        { text: '宁波', value: 'Ningbo' },
        { text: '温州', value: 'Wenzhou' },
        { text: '绍兴', value: 'Shaoxing' },
        { text: '湖州', value: 'Huzhou' }
      ]
    }
  }
};

export default Picker;
