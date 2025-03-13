import type { MaterialDescription } from '@vtj/core';

const Popup: MaterialDescription = {
  name: 'VanPopup',
  alias: 'Popup',
  label: '弹出层',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/popup',
  props: [
    {
      name: 'show',
      title: '是否显示弹出层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'overlay',
      title: '是否显示遮罩层',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'position',
      title: '弹出位置，可选值为 top bottom right left',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['top', 'bottom', 'right', 'left', 'center']
    },
    {
      name: 'overlay-class',
      title: '自定义遮罩层类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'overlay-style',
      title: '自定义遮罩层样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'duration',
      title: '动画时长，单位秒，设置为 0 可以禁用动画',
      defaultValue: 0.3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'z-index',
      title: '将弹窗的 z-index 层级设置为一个固定值',
      defaultValue: 2000,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'round',
      title: '是否显示圆角',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'lock-scroll',
      title: '是否锁定背景滚动',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-render',
      title: '是否在显示弹层时才渲染节点',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-popstate',
      title: '是否在页面回退时自动关闭',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeable',
      title: '是否显示关闭图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-icon',
      title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'cross',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'close-icon-position',
      title: '关闭图标位置，可选值为 top-left bottom-left bottom-right',
      defaultValue: 'top-right',
      setters: 'SelectSetter',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    },
    {
      name: 'before-close',
      title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'transition',
      title: '动画类名，等价于 transition 的 name 属性',
      setters: 'StringSetter'
    },
    {
      name: 'transition-appear',
      title: '是否在初始渲染时启用过渡动画',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'safe-area-inset-top',
      title: '是否开启顶部安全区适配',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-area-inset-bottom',
      title: '是否开启底部安全区适配',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'update:show',
    'click',
    'clickOverlay',
    'clickCloseIcon',
    'open',
    'close',
    'opened',
    'closed'
  ],
  slots: ['default', 'overlay-content'],
  snippet: {
    props: {
      position: 'right',
      show: true,
      style: {
        width: '30%',
        height: '100%'
      }
    },
    children: '内容'
  }
};

export default Popup;
