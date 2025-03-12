import type { MaterialDescription } from '@vtj/core';

const ShareSheet: MaterialDescription = {
  name: 'VanShareSheet',
  alias: 'ShareSheet',
  label: '分享面板',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/share-sheet',
  props: [
    {
      name: 'show',
      title: '是否显示分享面板',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'options',
      title: '分享选项',
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
      title: '取消按钮文字，传入空字符串可以隐藏按钮',
      defaultValue: '取消',
      setters: 'StringSetter'
    },
    {
      name: 'description',
      title: '标题下方的辅助描述文字',
      setters: 'StringSetter'
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
      defaultValue: '2000+',
      setters: ['StringSetter', 'NumberSetter']
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
      title: '是否在显示弹层时才渲染内容',
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
    { name: 'select', params: ['option', 'index'] },
    { name: 'cancel' },
    { name: 'open' },
    { name: 'close' },
    { name: 'opened' },
    { name: 'closed' },
    { name: 'clickOverlay' }
  ],
  slots: ['title', 'description', 'cancel'],
  snippet: {
    props: {
      show: true,
      title: '立即分享给好友',
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  }
};

export default ShareSheet;
