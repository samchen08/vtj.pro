import type { MaterialDescription } from '@vtj/core';

const ActionSheet: MaterialDescription = {
  name: 'VanActionSheet',
  alias: 'ActionSheet',
  label: '动作面板',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/action-sheet',
  props: [
    {
      name: 'show',
      title: '是否显示动作面板',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'actions',
      title: '面板选项列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'title',
      title: '顶部标题',
      setters: 'StringSetter'
    },
    {
      name: 'cancel-text',
      title: '取消按钮文字',
      setters: 'StringSetter'
    },
    {
      name: 'description',
      title: '选项上方的描述信息',
      setters: 'StringSetter'
    },
    {
      name: 'closeable',
      title: '是否显示关闭图标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-icon',
      title: '关闭图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'cross',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'duration',
      title: '动画时长，单位秒，设置为 0 可以禁用动画',
      defaultValue: 0.3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'z-index',
      title: '将面板的 z-index 层级设置为一个固定值',
      defaultValue: 2000,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'round',
      title: '是否显示圆角',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'overlay',
      title: '是否显示遮罩层',
      defaultValue: true,
      setters: 'BooleanSetter'
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
      name: 'lock-scroll',
      title: '是否锁定背景滚动',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-render',
      title: 'lazy-render',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-popstate',
      title: '是否在页面回退时自动关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-action',
      title: '是否在点击选项后关闭',
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
      name: 'safe-area-inset-bottom',
      title: '是否开启底部安全区适配',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'before-close',
      title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
      setters: 'FunctionSetter'
    }
  ],
  events: [
    { name: 'update:show' },
    { name: 'select', params: ['action', 'index'] },
    { name: 'cancel' },
    { name: 'open' },
    { name: 'close' },
    { name: 'opened' },
    { name: 'closed' },
    { name: 'clickOverlay', params: ['event'] }
  ],
  slots: ['default', 'description', 'cancel', 'action'],
  snippet: {
    props: {
      show: true,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
    }
  }
};

export default ActionSheet;
