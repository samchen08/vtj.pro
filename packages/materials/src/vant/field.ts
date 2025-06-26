import type { MaterialDescription } from '@vtj/core';

const Field: MaterialDescription = {
  name: 'VanField',
  alias: 'Field',
  label: '输入框',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/field',
  props: [
    {
      name: 'modelValue',
      title: '当前输入的值',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'label',
      title: '输入框左侧文本',
      setters: 'StringSetter'
    },
    {
      name: 'name',
      title: '名称，作为提交表单时的标识符',
      setters: 'StringSetter'
    },
    {
      name: 'id',
      title: '输入框 id，同时会设置 label 的 for 属性',
      defaultValue: 'van-field-n-input',
      setters: 'StringSetter'
    },
    {
      name: 'type',
      title:
        '输入框类型, 支持原生 input 标签的所有 type 属性，额外支持了 digit 类型',
      defaultValue: 'text',
      setters: 'StringSetter'
    },
    {
      name: 'size',
      title: '大小，可选值为 large normal',
      setters: 'SelectSetter',
      options: ['large', 'normal']
    },
    {
      name: 'maxlength',
      title: '输入的最大字符数',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'placeholder',
      title: '输入框占位提示文字',
      setters: 'StringSetter'
    },
    {
      name: 'border',
      title: '是否显示内边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用输入框',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法输入内容',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'colon',
      title: '是否在 label 后面添加冒号',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'required',
      title: '是否显示表单必填星号',
      defaultValue: null,
      setters: ['BooleanSetter', 'StringSetter']
    },
    {
      name: 'center',
      title: '是否使内容垂直居中',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'clearable',
      title: '是否启用清除图标，点击清除图标后会清空输入框',
      defaultValue: false,
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
      name: 'clickable',
      title: '是否开启点击反馈',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'is-link',
      title: '是否展示右侧箭头并开启点击反馈',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'autofocus',
      title: '是否自动聚焦，iOS 系统不支持该属性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-word-limit',
      title: '是否显示字数统计，需要设置 maxlength 属性',
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
      name: 'error-message-align',
      title: '错误提示文案对齐方式，可选值为 center right',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'formatter',
      title: '输入内容格式化函数',
      setters: 'FunctionSetter'
    },
    {
      name: 'format-trigger',
      title: '格式化函数触发的时机，可选值为 onBlur',
      defaultValue: 'onChange',
      setters: 'SelectSetter',
      options: ['onChange', 'onBlur']
    },
    {
      name: 'arrow-direction',
      title: '箭头方向，可选值为 left up down',
      defaultValue: 'right',
      setters: 'SelectSetter',
      options: ['left', 'right', 'up', 'down']
    },
    {
      name: 'label-class',
      title: '左侧文本额外类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'label-width',
      title: '左侧文本宽度，默认单位为 px',
      defaultValue: '6.2em',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'label-align',
      title: '左侧文本对齐方式，可选值为 center right top',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right', 'top']
    },
    {
      name: 'input-align',
      title: '输入框对齐方式，可选值为 center right',
      defaultValue: 'left',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'autosize',
      title:
        '	是否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为px',
      defaultValue: false,
      setters: ['BooleanSetter', 'ObjectSetter']
    },
    {
      name: 'rows',
      title: '输入框行数，仅 type 为 textarea 时有效',
      defaultValue: '2',
      setters: 'StringSetter'
    },
    {
      name: 'left-icon',
      title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'right-icon',
      title: '右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'rules',
      title: '表单校验规则，详见 Form 组件',
      setters: 'ArraySetter'
    },
    {
      name: 'autocomplete',
      title: 'HTML 原生属性，用于控制自动完成功能，详见 MDN - autocomplete',
      setters: 'StringSetter'
    },
    {
      name: 'autocapitalize',
      title:
        'HTML 原生属性，用于控制文本输入时是否自动大写，此 API 仅在部分浏览器支持，详见 MDN - autocapitalize',
      setters: 'StringSetter'
    },
    {
      name: 'enterkeyhint',
      title:
        'HTML 原生属性，用于控制回车键样式，此 API 仅在部分浏览器支持，详见 MDN - enterkeyhint',
      setters: 'StringSetter'
    },
    {
      name: 'spellcheck ',
      title:
        'HTML 原生属性，用于检查元素的拼写错误，此 API 仅在部分浏览器支持，详见 MDN - spellcheck',
      setters: 'BooleanSetter'
    },
    {
      name: 'autocorrect ',
      title: '仅 Safari 适用，用于自动更正输入的文本，详见 MDN - autocorrect',
      setters: 'StringSetter'
    }
  ],
  events: [
    'update:modelValue',
    'focus',
    'blur',
    'clear',
    'click',
    'clickInput',
    'clickLeftIcon',
    'clickRightIcon',
    'startValidate',
    'endValidate'
  ],
  slots: [
    'default',
    'label',
    'input',
    'left-icon',
    'right-icon',
    'button',
    'error-message',
    'extra'
  ],
  snippet: {
    props: {
      label: '文本',
      placeholder: '请输入用户名'
    }
  }
};

export default Field;
