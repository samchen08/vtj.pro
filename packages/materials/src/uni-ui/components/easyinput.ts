import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniEasyinput',
  label: '增强输入框',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '输入内容',
      defaultValue: '',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'type',
      title: '输入框的类型',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: ['text', 'textarea', 'password', 'number', 'idcard', 'digit']
    },
    {
      name: 'clearable',
      title:
        '是否显示右侧清空内容的图标控件(输入框有内容且不禁用时显示)，点击可清空输入框内容',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'autoHeight',
      title: '是否自动增高输入区域，type为textarea时有效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'placeholder',
      title: '输入框的提示文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'placeholderStyle',
      title: 'placeholder的样式',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'focus',
      title: '是否自动获得焦点',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否不可输入',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'maxlength',
      title: '最大输入长度，设置为 -1 的时候不限制最大长度',
      defaultValue: 140,
      setters: 'NumberSetter'
    },
    {
      name: 'confirmType',
      title: '设置键盘右下角按钮的文字，仅在type="text"时生效',
      defaultValue: 'done',
      setters: 'SelectSetter',
      options: ['send', 'search', 'next', 'go', 'done']
    },
    {
      name: 'clearSize',
      title: '清除图标的大小，单位px',
      defaultValue: 24,
      setters: 'NumberSetter'
    },
    {
      name: 'prefixIcon',
      title: '输入框头部图标',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'suffixIcon',
      title: '输入框尾部图标',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'trim',
      title: '是否自动去除空格，传入类型为 Boolean 时，自动去除前后空格',
      setters: ['SelectSetter'],
      defaultValue: false,
      options: [
        { label: 'false', value: false },
        { label: 'true', value: true },
        { label: 'both', value: 'both' },
        { label: 'left', value: 'left' },
        { label: 'right', value: 'right' },
        { label: 'all', value: 'all' },
        { label: 'none', value: 'none' }
      ]
    },
    {
      name: 'inputBorder',
      title: '是否显示input输入框的边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'styles',
      title: '样式自定义',
      defaultValue: '',
      setters: 'ObjectSetter'
    },
    {
      name: 'passwordIcon',
      title: 'type=password 时，是否显示小眼睛图标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'adjust-position',
      title: '弹起键盘时，是否上推页面，平台差异性与内置input组件一致',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'primaryColor',
      title: '设置清除按钮focus时的颜色',
      defaultValue: '#2979ff',
      setters: 'ColorSetter'
    },
    {
      name: 'cursorSpacing',
      title: '指定光标与键盘的距离，单位 px ',
      defaultValue: 0,
      setters: 'NumberSetter'
    }
  ],
  events: [
    'input',
    'clear',
    'focus',
    'blur',
    'confirm',
    'iconClick',
    'change',
    'keyboardheightchange',
    'update:modelValue'
  ],
  snippet: {
    props: {
      placeholder: '请输入内容'
    }
  }
};

export default desc;
