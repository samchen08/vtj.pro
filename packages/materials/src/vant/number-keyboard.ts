import type { MaterialDescription } from '@vtj/core';

const NumberKeyboard: MaterialDescription = {
  name: 'VantNumberKeyboard',
  alias: 'NumberKeyboard',
  label: '数字键盘',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/number-keyboard',
  props: [
    {
      name: 'modelValue',
      title: '当前输入值',
      setters: 'StringSetter'
    },
    {
      name: 'show',
      title: '是否显示键盘',
      setters: 'BooleanSetter'
    },
    {
      name: 'title',
      title: '键盘标题',
      setters: 'StringSetter'
    },
    {
      name: 'theme',
      title: '样式风格，可选值为 custom',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['default', 'custom']
    },
    {
      name: 'maxlength',
      title: '输入值最大长度',
      defaultValue: 'Infinity',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'transition',
      title: '是否开启过场动画',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'z-index',
      title: '键盘 z-index 层级',
      defaultValue: '100',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'extra-key',
      title: '底部额外按键的内容',
      defaultValue: '',
      setters: ['StringSetter', 'ArraySetter']
    },
    {
      name: 'close-button-text',
      title: '关闭按钮文字，空则不展示',
      setters: 'StringSetter'
    },
    {
      name: 'delete-button-text',
      title: '删除按钮文字，空则展示删除图标',
      setters: 'StringSetter'
    },
    {
      name: 'close-button-loading',
      title: '是否将关闭按钮设置为加载中状态，仅在 theme="custom" 时有效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-delete-key',
      title: '是否展示删除图标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'blur-on-close',
      title: '是否在点击关闭按钮时触发 blur 事件',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'hide-on-click-outside',
      title: '是否在点击外部时收起键盘',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'safe-area-inset-bottom',
      title: '是否开启底部安全区适配',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'random-key-order',
      title: '是否将通过随机顺序展示按键',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'input', params: ['key'] },
    { name: 'delete', params: ['key'] },
    { name: 'close', params: ['key'] },
    { name: 'blur', params: ['key'] },
    { name: 'show', params: ['key'] },
    { name: 'hide', params: ['key'] }
  ],
  slots: ['delete', 'extra-key', 'title-left'],
  snippet: {
    props: { show: true }
  }
};

export default NumberKeyboard;
