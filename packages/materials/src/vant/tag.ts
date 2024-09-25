import type { MaterialDescription } from '@vtj/core';

const Tag: MaterialDescription = {
  name: 'VantTag',
  alias: 'Tag',
  label: '标签',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/tag',
  props: [
    {
      name: 'type',
      title: '类型',
      defaultValue: 'default',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'danger', 'warning', 'default']
    },
    {
      name: 'size',
      title: '大小',
      setters: 'SelectSetter',
      options: ['large', 'medium']
    },
    {
      name: 'color',
      title: '标签颜色',
      setters: 'StringSetter'
    },
    {
      name: 'show',
      title: '是否展示标签',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'plain',
      title: '是否为空心样式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'round',
      title: '是否为圆角样式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'mark',
      title: '是否为标记样式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'text-color',
      title: '文本颜色，优先级高于 color 属性',
      defaultValue: 'white',
      setters: 'StringSetter'
    },
    {
      name: 'closeable',
      title: '是否为可关闭标签',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  slots: ['default'],
  events: [
    { name: 'click', params: ['event'] },
    { name: 'close', params: ['event'] }
  ],
  snippet: {
    props: {
      type: 'primary'
    },
    children: '标签'
  }
};

export default Tag;
