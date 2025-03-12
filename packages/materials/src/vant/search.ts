import type { MaterialDescription } from '@vtj/core';

const Search: MaterialDescription = {
  name: 'VanSearch',
  alias: 'Search',
  label: '搜索',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/search',
  props: [
    {
      name: 'modelValue',
      title: '当前输入的值',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'label',
      title: '搜索框左侧文本',
      setters: 'StringSetter'
    },
    {
      name: 'name',
      title: '名称，作为提交表单时的标识符',
      setters: 'StringSetter'
    },
    {
      name: 'shape',
      title: '搜索框形状',
      defaultValue: 'square',
      setters: 'SelectSetter',
      options: ['square', 'round']
    },
    {
      name: 'id',
      title: '搜索框 id，同时会设置 label 的 for 属性',
      defaultValue: 'van-search-n-input',
      setters: 'StringSetter'
    },
    {
      name: 'background',
      title: '搜索框外部背景色',
      defaultValue: '	#f2f2f2',
      setters: 'StringSetter'
    },
    {
      name: 'maxlength',
      title: '输入的最大字符数',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'placeholder',
      title: '占位提示文字',
      setters: 'StringSetter'
    },
    {
      name: 'clearable',
      title: '是否启用清除图标，点击清除图标后会清空输入框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'clear-icon',
      title: '清除图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'clear',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'clear-trigger',
      title:
        '显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示',
      defaultValue: 'focus',
      setters: 'SelectSetter',
      options: ['focus', 'always']
    },
    {
      name: 'autofocus',
      title: '是否自动聚焦，iOS 系统不支持该属性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-action',
      title: '是否在搜索框右侧显示取消按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'action-text',
      title: '取消按钮文字',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用输入框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否将输入框设为只读状态，只读状态下无法输入内容',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'error',
      title: '是否将输入内容标红',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'error-message',
      title: '底部错误提示文案，为空时不展示',
      setters: 'StringSetter'
    },
    {
      name: 'formatter',
      title: '输入内容格式化函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'format-trigger',
      title: '格式化函数触发的时机',
      defaultValue: 'onChange',
      setters: 'SelectSetter',
      options: ['onChange', 'onBlur']
    },
    {
      name: 'input-align',
      title: '输入框内容对齐方式',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'left-icon',
      title: '输入框左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'search',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'right-icon',
      title: '输入框右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'autocomplete',
      title: 'input 标签原生的自动完成属性',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'search', params: ['value'] },
    { name: 'update:modelValue', params: ['value'] },
    { name: 'focus', params: ['event'] },
    { name: 'blur', params: ['event'] },
    { name: 'clickInput', params: ['event'] },
    { name: 'clickLeftIcon', params: ['event'] },
    { name: 'clickRightIcon', params: ['event'] },
    { name: 'clear', params: ['event'] },
    { name: 'cancel' }
  ],
  slots: ['left', 'action', 'label', 'left-icon', 'right-icon'],
  snippet: {
    props: {
      placeholder: '请输入搜索关键词'
    }
  }
};

export default Search;
