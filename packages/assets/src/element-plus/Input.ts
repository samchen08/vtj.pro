import { ComponentDescription } from '@vtj/engine';
const Input: ComponentDescription = {
  name: 'ElInput',
  title: '输入框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input.html',
  package: 'element-plus',
  props: [
    {
      name: 'type',
      defaultValue: 'text',
      options: ['text', 'textarea'],
      setters: ['SelectSetter', 'InputSetter']
    },
    {
      name: 'modelValue',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'maxlength',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'minlength',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'showWordLimit',
      defaultValue: false,
      title:
        '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
      label: '字数统计',
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'clearable',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'formatter',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'parser',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'showPassword',
      defaultValue: false,
      title: '是否显示切换密码图标',
      label: '密码图标',
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: '',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'prefix-icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'suffix-icon',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rows',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'autosize',
      defaultValue: false,
      setters: ['BooleanSetter', 'JSONStter']
    },
    {
      name: 'autocomplete',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'readonly',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'max',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'min',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'step',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'resize',
      defaultValue: '',
      options: ['none', 'both', 'horizontal', 'vertical'],
      setters: 'InputSetter'
    },
    {
      name: 'autofocus',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'form',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'label',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'tabindex',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      title: '输入时是否触发表单的校验',
      label: '表单校验',
      setters: 'BooleanSetter'
    },
    {
      name: 'inputStyle',
      defaultValue: {},
      setters: ['JSONSetter']
    }
  ],
  events: [
    {
      name: 'blur'
    },
    {
      name: 'focus'
    },
    {
      name: 'change'
    },
    {
      name: 'input'
    },
    {
      name: 'clear'
    },
    {
      name: 'update:modelValue'
    }
  ],
  slots: ['prefix', 'suffix', 'prepend', 'append']
};

export default Input;
