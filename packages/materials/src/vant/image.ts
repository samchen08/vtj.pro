import type { MaterialDescription } from '@vtj/core';

const Image: MaterialDescription = {
  name: 'VanImage',
  alias: 'Image',
  label: '图片',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/image',
  props: [
    {
      name: 'src',
      title: '图片链接',
      setters: 'StringSetter'
    },
    {
      name: 'fit',
      title: '图片填充模式，等同于原生的 object-fit 属性',
      defaultValue: 'fill',
      setters: 'StringSetter'
    },
    {
      name: 'position',
      title: '图片位置，等同于原生的 object-position 属性',
      defaultValue: 'center',
      setters: ['SelectSetter', 'StringSetter'],
      options: ['top', 'right', 'bottom', 'left', 'center']
    },
    {
      name: 'alt',
      title: '替代文本',
      setters: 'StringSetter'
    },
    {
      name: 'width',
      title: '宽度，默认单位为 px',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'height',
      title: '高度，默认单位为 px',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'radius',
      title: '圆角大小，默认单位为 px',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'round',
      title: '是否显示为圆形',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'block',
      title: '是否将根节点设置为块级元素，默认情况下为 inline-block 元素',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-error',
      title: '是否展示图片加载失败提示',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-loading',
      title: '是否展示图片加载中提示',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'error-icon',
      title: '失败时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'photo-fail',
      setters: 'StringSetter'
    },
    {
      name: 'loading-icon',
      title: '加载时提示的图标名称或图片链接，等同于 Icon 组件的 name 属性',
      defaultValue: 'photo',
      setters: 'StringSetter'
    },
    {
      name: 'icon-size',
      title: '加载图标和失败图标的大小',
      defaultValue: 32,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'crossorigin',
      title: '等同于原生的 crossorigin 属性',
      setters: 'StringSetter'
    },
    {
      name: 'referrerpolicy',
      title: '等同于原生的 referrerpolicy 属性',
      setters: 'StringSetter'
    }
  ],
  events: ['click', 'load', 'error'],
  slots: ['default', 'loading', 'error'],
  snippet: {
    props: {
      width: '10rem',
      height: '10rem',
      fit: 'contain',
      src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    }
  }
};

export default Image;
