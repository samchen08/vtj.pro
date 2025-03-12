import type { MaterialDescription } from '@vtj/core';

const FloatingBubble: MaterialDescription = {
  name: 'VanFloatingBubble',
  alias: 'FloatingBubble',
  label: '浮动气泡',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/floating-bubble',
  props: [
    {
      name: 'offset',
      title: '控制气泡位置',
      setters: 'ObjectSetter'
    },
    {
      name: 'axis',
      title: '拖拽的方向',
      defaultValue: 'y',
      setters: 'SelectSetter',
      options: ['x', 'y', 'xy', 'lock']
    },
    {
      name: 'magnetic',
      title: '自动磁吸的方向',
      setters: 'SelectSetter',
      options: ['x', 'y']
    },
    {
      name: 'icon',
      title: '气泡图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: ['VanIconSetter', 'StringSetter']
    },
    {
      name: 'gap',
      title: '气泡与窗口的最小间距，单位为 px',
      defaultValue: 24,
      setters: 'NumberSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      defaultValue: 'body',
      setters: ['StringSetter', 'ExpressionSetter']
    }
  ],
  events: [
    { name: 'update:offset' },
    { name: 'click', params: ['event'] },
    { name: 'offsetChange', params: ['data'] }
  ],
  slots: ['default'],
  snippet: {
    props: {
      icon: 'chat'
    }
  }
};

export default FloatingBubble;
