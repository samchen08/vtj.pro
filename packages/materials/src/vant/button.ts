import type { MaterialDescription } from '@vtj/core';

const Button: MaterialDescription = {
  name: 'VanButton',
  alias: 'Button',
  label: '按钮',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/button',
  props: [
    {
      name: 'type',
      title: '类型，可选值为 primary success warning danger',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'default']
    },
    {
      name: 'size',
      title: '尺寸，可选值为 large small mini',
      defaultValue: 'normal',
      setters: 'SelectSetter',
      options: ['large', 'small', 'mini', 'normal']
    },
    {
      name: 'text',
      title: '按钮文字',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '按钮颜色，支持传入 linear-gradient 渐变色',
      setters: 'StringSetter'
    },
    {
      name: 'icon',
      title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      setters: 'StringSetter'
    },
    {
      name: 'icon-position',
      title: '图标展示位置，可选值为 right',
      setters: 'SelectSetter',
      defaultValue: 'left',
      options: ['right', 'left']
    },
    {
      name: 'tag',
      title: '按钮根节点的 HTML 标签',
      defaultValue: 'button',
      setters: 'StringSetter'
    },
    {
      name: 'native-type',
      title: '原生 button 标签的 type 属性',
      defaultValue: 'button',
      setters: 'StringSetter'
    },
    {
      name: 'block',
      title: '是否为块级元素',
      setters: 'BooleanSetter'
    },
    {
      name: 'plain',
      title: '是否为朴素按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'square',
      title: '是否为方形按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'round',
      title: '是否为圆形按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'hairline',
      title: '是否使用 0.5px 边框',
      setters: 'BooleanSetter'
    },
    {
      name: 'loading',
      title: '是否显示为加载状态',
      setters: 'BooleanSetter'
    },
    {
      name: 'loading-text',
      title: '加载状态提示文字',
      setters: 'StringSetter'
    },
    {
      name: 'loading-type',
      title: '加载图标类型',
      setters: 'SelectSetter',
      defaultValue: 'circular',
      options: ['spinner', 'circular']
    },
    {
      name: 'loading-size',
      title: '加载图标大小，默认单位为 px',
      defaultValue: '20px',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'url',
      title: '点击后跳转的链接地址',
      setters: 'StringSetter'
    },
    {
      name: 'to',
      title: '点击后跳转的目标路由对象，等同于 Vue Router 的 to 属性',
      setters: 'StringSetter'
    },
    {
      name: 'replace',
      title: '是否在跳转时替换当前页面历史',
      setters: 'BooleanSetter'
    }
  ],
  events: ['click', 'touchstart'],
  slots: ['default', 'icon', 'loading'],
  snippet: {
    children: '按钮'
  }
};

export default Button;
