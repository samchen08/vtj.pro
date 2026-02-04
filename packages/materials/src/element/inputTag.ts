import type { MaterialDescription } from '@vtj/core';
import { effect, size } from '../shared';

const InputTag: MaterialDescription = {
  name: 'ElInputTag',
  label: '标签输入框',
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input-tag.html',
  props: [
    {
      name: 'modelValue',
      title: '绑定值',
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
    effect('effect'),
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
      name: 'delimiter',
      title: '在匹配分隔符时添加标签',
      setters: 'InputSetter'
    },
    size('size'),
    {
      name: 'collapseTags',
      title: '多选时是否将选中值按文字的形式展示',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'collapseTagsTooltip',
      title: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此功能，collapse-tags的值必须为true',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'saveOnBlur',
      title: '当输入失去焦点时是否保存输入值',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearable',
      title: '是否显示清除按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearIcon',
      title: '自定义清除图标',
      setters: 'InputSetter'
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
      title: '等价于原生 readonly 属性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'autofocus',
      title: '等价于原生  autofocus  属性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'id',
      title: '等价于原生 input id 属性',
      setters: 'StringSetter'
    },
    {
      name: 'tabindex',
      title: '等价于原生  tabindex  属性',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'maxCollapseTags',
      title: '需要显示的 Tag 的最大数量 要使用此功能，collapse-tags的值必须为true',
      setters: 'NumberSetter'
    },
    {
      name: 'maxlength',
      title: '等价于原生  maxlength  属性',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'minlength',
      title: '等价于原生  minlength  属性',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'placeholder',
      title: '输入框占位文本',
      setters: 'StringSetter'
    },
    {
      name: 'autocomplete',
      title: '等价于原生  autocomplete  属性',
      defaultValue: 'off',
      setters: 'StringSetter'
    },
    {
      name: 'ariaLabel',
      title: '等价于原生  aria-label  属性',
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
      name: 'drag-tag'
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
  slots: [{ name: 'tag' }, { name: 'prefix' }, { name: 'suffix' }],
  snippet: {
    props: {
      modelValue: ['1', '2']
    }
  }
};

export default InputTag;
