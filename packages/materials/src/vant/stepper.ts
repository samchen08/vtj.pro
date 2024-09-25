import type { MaterialDescription } from '@vtj/core';

const Stepper: MaterialDescription = {
  name: 'VantStepper',
  alias: 'Stepper',
  label: '步进器',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/stepper',
  props: [
    {
      name: 'modelValue',
      title: '当前输入的值',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min',
      title: '最小值',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'max',
      title: '最大值',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'auto-fixed',
      title:
        '是否自动校正超出限制范围的数值，设置为 false 后输入超过限制范围的数值将不会自动校正',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'default-value',
      title: '初始值，当 v-model 为空时生效',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'step',
      title: '步长，每次点击时改变的值',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'name',
      title:
        '标识符，通常为一个唯一的字符串或数字，可以在 change 事件回调参数中获取',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'input-width',
      title: '输入框宽度，默认单位为 px',
      defaultValue: 32,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'button-size',
      title: '按钮大小以及输入框高度，默认单位为 px',
      defaultValue: 28,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'decimal-length',
      title: '固定显示的小数位数',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'theme',
      title: '样式风格',
      setters: 'SelectSetter',
      options: ['round']
    },
    {
      name: 'placeholder',
      title: '输入框占位提示文字',
      setters: 'StringSetter'
    },
    {
      name: 'integer',
      title: '是否只允许输入整数',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用步进器',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disable-plus',
      title: '是否禁用增加按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disable-minus',
      title: '是否禁用减少按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disable-input',
      title: '是否禁用输入框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'before-change',
      title: '输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise',
      defaultValue: false,
      setters: 'FunctionSetter'
    },
    {
      name: 'show-plus',
      title: '是否显示增加按钮',
      defaultValue: true,
      setters: 'FunctionSetter'
    },
    {
      name: 'show-minus',
      title: '是否显示减少按钮',
      defaultValue: true,
      setters: 'FunctionSetter'
    },
    {
      name: 'show-input',
      title: '是否显示输入框',
      defaultValue: true,
      setters: 'FunctionSetter'
    },
    {
      name: 'long-press',
      title: '是否开启长按手势，开启后可以长按增加和减少按钮',
      defaultValue: true,
      setters: 'FunctionSetter'
    },
    {
      name: 'allow-empty',
      title: '是否允许输入的值为空，设置为 true 后允许传入空字符串',
      defaultValue: false,
      setters: 'FunctionSetter'
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'change', params: ['value', 'details'] },
    { name: 'overlimit' },
    { name: 'plus' },
    { name: 'minus' },
    { name: 'focus', params: ['event'] },
    { name: 'blur', params: ['event'] }
  ],
  snippet: {
    props: {
      modelValue: 1
    }
  }
};

export default Stepper;
