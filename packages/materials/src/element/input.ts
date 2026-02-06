import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

const Input: MaterialDescription = {
  name: 'ElInput',
  label: '输入框',
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input.html',
  props: [
    {
      name: 'type',
      title: '输入类型',
      defaultValue: 'text',
      options: ['text', 'textarea', 'number', 'password', 'email', 'search', 'tel', 'url'],
      setters: ['SelectSetter', 'InputSetter']
    },
    {
      name: 'modelValue',
      title: '绑定值',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'modelModifiers',
      title: 'v-model 修饰符',
      setters: 'ObjectSetter'
    },
    {
      name: 'maxlength',
      title: '同原生 maxlength 属性',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'minlength',
      title: '原生属性，最小输入长度',
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
      name: 'wordLimitPosition',
      title: '字数统计的位置，仅当 show-word-limit 为 true 时生效',
      defaultValue: 'inside',
      setters: 'SelectSetter',
      options: ['inside', 'outside']
    },
    {
      name: 'placeholder',
      title: '输入框占位文本',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'clearable',
      title: '是否显示清除按钮，只有当 type 不是 textarea时生效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearIcon',
      title: '自定义清除图标',
      setters: 'StringSetter'
    },
    {
      name: 'formatter',
      title: '指定输入值的格式。(只有当 type 是"text"时才能工作)',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'parser',
      title: '指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)',
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
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    size('size'),
    {
      name: 'prefix-icon',
      title: '自定义前缀图标',
      setters: 'InputSetter'
    },
    {
      name: 'suffix-icon',
      title: '自定义后缀图标',
      setters: 'InputSetter'
    },
    {
      name: 'rows',
      title: '输入框行数，仅 type 为 \'textarea\' 时有效',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'autosize',
      title: 'textarea 高度是否自适应，仅 type 为 \'textarea\' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }',
      defaultValue: false,
      setters: ['BooleanSetter', 'JSONStter']
    },
    {
      name: 'autocomplete',
      title: '原生 autocomplete 属性',
      defaultValue: 'off',
      setters: 'InputSetter'
    },
    {
      name: 'name',
      title: '等价于原生 input name 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'readonly',
      title: '原生 readonly 属性，是否只读',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'max',
      title: '原生 max 属性，设置最大值',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'min',
      title: '原生属性，设置最小值',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'step',
      title: '原生属性，设置输入字段的合法数字间隔',
      defaultValue: '',
      setters: ['InputSetter', 'NumberSetter']
    },
    {
      name: 'resize',
      title: '控制是否能被用户缩放',
      defaultValue: '',
      options: ['none', 'both', 'horizontal', 'vertical'],
      setters: 'SelectSetter'
    },
    {
      name: 'autofocus',
      title: '原生属性，自动获取焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'form',
      title: '原生属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'aria-label',
      title: '等价于原生 input aria-label 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'tabindex',
      title: '输入框的 tabindex',
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
    },
    {
      name: 'label',
      title: '等价于原生 input aria-label 属性',
      setters: 'InputSetter'
    },
    {
      name: 'inputmode',
      title: '等价于原生 input inputmode 属性',
      setters: 'InputSetter'
    },
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
