import type { MaterialDescription } from '@vtj/core';

const Toast: MaterialDescription = {
  name: 'VanToast',
  alias: 'Toast',
  label: '轻提示',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/toast',
  props: [
    {
      name: 'show',
      title: '是否显示',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'type',
      title: '提示类型',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: ['loading', 'success', 'fail', 'html', 'text']
    },
    {
      name: 'position',
      title: '位置',
      defaultValue: 'middle',
      setters: 'SelectSetter',
      options: ['top', 'middle', 'bottom']
    },
    {
      name: 'message',
      title: '文本内容，支持通过\n换行',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'word-break',
      title: '文本内容的换行方式',
      defaultValue: 'break-all',
      setters: '',
      options: ['normal', 'break-all', 'break-word']
    },
    {
      name: 'icon',
      title:
        '自定义图标，支持传入图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'icon-size',
      title: '图标大小，如 20px 2em，默认单位为 px',
      defaultValue: '36px',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'overlay',
      title: '是否显示背景遮罩层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'forbid-click',
      title: '是否禁止背景点击',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click',
      title: '是否在点击后关闭',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'loading-type',
      title: '加载图标类型, 可选值为 spinner',
      defaultValue: 'circular',
      setters: 'SelectSetter',
      options: ['circular', 'spinner']
    },
    {
      name: 'duration',
      title: '展示时长(ms)，值为 0 时，toast 不会消失',
      defaultValue: 2000,
      setters: 'NumberSetter'
    },
    {
      name: 'class-name',
      title: '自定义类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },

    {
      name: 'overlay-class',
      title: '自定义遮罩层类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'overlay-style',
      title: '自定义遮罩层样式',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'transition',
      title: '动画类名，等价于 transition 的name属性',
      defaultValue: 'van-fade',
      setters: 'StringSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      defaultValue: 'body',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'z-index',
      title: '将组件的 z-index 层级设置为一个固定值',
      defaultValue: '2000',
      setters: ['StringSetter', 'NumberSetter']
    }
  ],
  events: ['close', 'opened', 'update:show'],
  slots: ['message'],
  snippet: {
    props: {
      show: true
    },
    children: [
      {
        name: 'VanImage',
        slot: 'message',
        props: {
          src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          style: {
            height: '100px',
            width: '100px'
          }
        }
      }
    ]
  }
};

export default Toast;
