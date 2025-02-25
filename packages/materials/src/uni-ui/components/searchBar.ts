import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniSearchBar',
  label: '搜索栏',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '搜索栏绑定值',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'placeholder',
      title: '搜索栏Placeholder',
      defaultValue: '搜索',
      setters: 'StringSetter'
    },
    {
      name: 'radius',
      title: '搜索栏圆角，单位px',
      defaultValue: 10,
      setters: 'NumberSetter'
    },
    {
      name: 'clearButton',
      title: '是否显示清除按钮',
      defaultValue: 'auto',
      setters: 'SelectSetter',
      options: ['always', 'auto', 'none']
    },
    {
      name: 'cancelButton',
      title: '是否显示取消按钮',
      defaultValue: 'auto',
      setters: 'SelectSetter',
      options: ['always', 'auto', 'none']
    },
    {
      name: 'cancelText',
      title: '取消按钮的文字',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'bgColor',
      title: '输入框背景颜色',
      defaultValue: '#F8F8F8',
      setters: 'ColorSetter'
    },
    {
      name: 'textColor',
      title: '输入时文字颜色',
      defaultValue: '#F8F8F8',
      setters: 'ColorSetter'
    },
    {
      name: 'maxlength',
      title: '输入最大长度',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'focus',
      title: '自动获取焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'confirm',
    'input',
    'cancel',
    'clear',
    'focus',
    'blur',
    'update:modelValue'
  ],
  slots: ['searchIcon', 'clearIcon'],
  snippet: {}
};

export default desc;
