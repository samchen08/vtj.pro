import type { MaterialDescription } from '@vtj/core';

const Card: MaterialDescription = {
  name: 'VanCard',
  alias: 'Card',
  label: '卡片',
  categoryId: 'business',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/card',
  props: [
    {
      name: 'thumb',
      title: '左侧图片 URL',
      setters: 'StringSetter'
    },
    {
      name: 'title',
      title: '标题',
      setters: 'StringSetter'
    },
    {
      name: 'desc',
      title: '描述',
      setters: 'StringSetter'
    },
    {
      name: 'tag',
      title: '图片角标',
      setters: 'StringSetter'
    },
    {
      name: 'num',
      title: '商品数量',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'price',
      title: '商品价格',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'origin-price',
      title: '商品划线原价',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'centered',
      title: '内容是否垂直居中',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'currency',
      title: '货币符号',
      defaultValue: '￥',
      setters: 'StringSetter'
    },
    {
      name: 'thumb-link',
      title: '点击左侧图片后跳转的链接地址',
      setters: 'StringSetter'
    },
    {
      name: 'lazy-load',
      title: '是否开启图片懒加载，须配合 Lazyload 组件使用',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'click', params: ['event'] },
    { name: 'clickThumb', params: ['event'] }
  ],
  slots: [
    'title',
    'desc',
    'num',
    'price',
    'origin-price',
    'price-top',
    'bottom',
    'thumb',
    'tag',
    'tags',
    'footer'
  ],
  snippet: {
    props: {
      num: 2,
      price: '2.00',
      desc: '描述信息',
      title: '商品标题',
      thumb: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
    }
  }
};

export default Card;
