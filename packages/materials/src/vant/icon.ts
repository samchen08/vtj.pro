import type { MaterialDescription } from '@vtj/core';

const Icon: MaterialDescription = {
  name: 'VantIcon',
  alias: 'Icon',
  label: '图标',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/icon',
  props: [
    {
      name: 'name',
      title: '图标名称或图片链接',
      setters: 'StringSetter'
    },
    {
      name: 'dot',
      title: '是否显示图标右上角小红点',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'badge',
      title: '图标右上角徽标的内容',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'badge-props',
      title: '自定义徽标的属性，传入的对象会被透传给 Badge 组件的 props',
      setters: 'ObjectSetter'
    },
    {
      name: 'color',
      title: '图标颜色',
      defaultValue: 'inherit',
      setters: 'StringSetter'
    },
    {
      name: 'size',
      title: '图标大小，如 20px 2em，默认单位为 px',
      defaultValue: 'inherit',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'class-prefix',
      title: '类名前缀，用于使用自定义图标',
      defaultValue: 'van-icon',
      setters: 'StringSetter'
    },
    {
      name: 'tag',
      title: '根节点对应的 HTML 标签名',
      defaultValue: 'i',
      setters: 'StringSetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      name: 'https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png',
      size: 30
    }
  }
};

export default Icon;
