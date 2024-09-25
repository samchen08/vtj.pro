import type { MaterialDescription } from '@vtj/core';

const Dialog: MaterialDescription = {
  name: 'VantDialog',
  alias: 'Dialog',
  label: '弹出框',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/dialog',
  props: [
    {
      name: 'show',
      title: '是否显示弹窗',
      setters: 'BooleanSetter'
    },
    {
      name: 'title',
      title: '标题',
      setters: 'StringSetter'
    },
    {
      name: 'width',
      title: '弹窗宽度，默认单位为 px',
      defaultValue: 320,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'message',
      title: '文本内容，支持通过 \n 换行',
      setters: ['StringSetter', 'FunctionSetter']
    },
    {
      name: 'message-align',
      title: '内容水平对齐方式，可选值为 left right justify',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['left', 'right', 'justify', 'center']
    },
    {
      name: 'theme',
      title: '样式风格，可选值为 round-button',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['round-button', 'default']
    },
    {
      name: 'show-confirm-button',
      title: '是否展示确认按钮',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-cancel-button',
      title: '是否展示取消按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'confirm-button-text',
      title: '确认按钮文案',
      defaultValue: '确认',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-color',
      title: '确认按钮颜色',
      defaultValue: '#ee0a24',
      setters: 'StringSetter'
    },
    {
      name: 'confirm-button-disabled',
      title: '是否禁用确认按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'cancel-button-text',
      title: '取消按钮文案',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-color',
      title: '取消按钮颜色',
      defaultValue: '#000000',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-button-disabled',
      title: '是否禁用取消按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'z-index',
      title: '将弹窗的 z-index 层级设置为一个固定值',
      defaultValue: '2000+',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'overlay',
      title: '是否展示遮罩层',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'overlay-class',
      title: '自定义遮罩层类名',
      setters: 'StringSetter'
    },
    {
      name: 'overlay-style',
      title: '自定义遮罩层样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'close-on-popstate',
      title: '是否在页面回退时自动关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭弹窗',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-render',
      title: '是否在显示弹层时才渲染节点',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lock-scroll',
      title: '是否锁定背景滚动',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'allow-html',
      title: '是否允许 message 内容中渲染 HTML',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'before-close',
      title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'transition',
      title: '动画类名，等价于 transition 的 name 属性',
      setters: 'StringSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    }
  ],
  events: [
    'update:show',
    'confirm',
    'cancel',
    'open',
    'close',
    'opened',
    'closed'
  ],
  slots: ['default', 'title', 'footer'],
  snippet: {
    props: {
      show: true,
      title: '标题'
    },
    children: [
      {
        name: 'VantImage',
        props: {
          src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
        }
      }
    ]
  }
};

export default Dialog;
