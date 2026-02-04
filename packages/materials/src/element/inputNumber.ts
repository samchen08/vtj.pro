import type { MaterialDescription } from '@vtj/core';
const InputNumber: MaterialDescription = {
  name: 'ElInputNumber',
  label: '数字输入框',

  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/input-number.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '绑定值',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'min',
      title: '设置计数器允许的最小值',
      defaultValue: -Infinity,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      title: '设置计数器允许的最大值',
      defaultValue: Infinity,
      setters: 'NumberSetter'
    },
    {
      name: 'step',
      title: '计数器步长',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'stepStrictly',
      title: '是否只能输入 step 的倍数',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'precision',
      title: '数值精度',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'size',
      title: '计数器尺寸',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'readonly',
      title: '原生 readonly 属性，是否只读',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'controls',
      title: '是否使用控制按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'controlsPosition',
      defaultValue: '',
      title: '控制按钮位置',
      label: '按钮位置',
      options: ['', 'right'],
      setters: 'SelectSetter'
    },
    {
      name: 'name',
      title: '等价于原生 input name 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'ariaLabel',
      title: '等价于原生 input aria-label 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'placeholder',
      title: '等价于原生 input placeholder 属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'valueOnClear',
      title: '当输入框被清空时显示的值',
      defaultValue: '',
      options: ['min', 'max'],
      setters: ['SelectSetter', 'NumberSetter']
    },
    {
      name: 'validateEvent',
      title: '是否触发表单验证',
      defaultValue: true,
      setters: 'BooleanSetter'
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
    {
      name: 'align',
      title: '内部输入文本对齐',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right'],
    },
    {
      name: 'disabledScientific',
      title: '禁用科学计数法的输入（例如输入 \'e\'）',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
  ],
  slots: [
    { name: 'decrease-icon' },
    { name: 'increase-icon' },
    { name: 'prefix' },
    { name: 'suffix' }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'blur'
    },
    {
      name: 'focus'
    },
    {
      name: 'update:modelValue'
    }
  ]
};

export default InputNumber;
