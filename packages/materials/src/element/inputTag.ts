import type { MaterialDescription } from '@vtj/core';

const InputTag: MaterialDescription = {
  name: 'ElInputTag',
  label: '标签输入框',
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input-tag.html',
  props: [
    {
      name: 'modelValue',
      setters: 'ArraySetter'
    },
    {
      name: 'max',
      title: '可添加标签的最大数量',
      setters: 'NumberSetter'
    },
    {
      name: 'tagType',
      title: '标签类型',
      defaultValue: 'info',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'info', 'warning', 'danger']
    },
    {
      name: 'tagEffect',
      title: '标签效果',
      defaultValue: 'light',
      setters: 'SelectSetter',
      options: ['light', 'dark', 'plain']
    },
    {
      name: 'trigger',
      title: '触发输入标签的按键',
      defaultValue: 'Enter',
      setters: 'SelectSetter',
      options: ['Enter', 'Space']
    },
    {
      name: 'draggable',
      title: '是否可以拖动标签',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      setters: 'SelectSetter',
      defaultValue: 'default',
      options: ['large', 'default', 'small']
    },
    {
      name: 'clearable',
      title: '是否显示清除按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'validateEvent',
      title: '是否触发表单验证',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'autofocus',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'id',
      setters: 'StringSetter'
    },
    {
      name: 'tabindex',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'maxlength',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'minlength',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'placeholder',
      setters: 'StringSetter'
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      setters: 'StringSetter'
    },
    {
      name: 'ariaLabel',
      setters: 'StringSetter'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'input'
    },
    {
      name: 'add-tag'
    },
    {
      name: 'remove-tag'
    },
    {
      name: 'focus'
    },
    {
      name: 'blur'
    },
    {
      name: 'clear'
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: [
    {
      name: 'tag',
      params: ['value', 'index']
    },
    { name: 'prefix' },
    { name: 'suffix' }
  ],
  snippet: {
    props: {
      modelValue: ['1', '2']
    }
  }
};

export default InputTag;
