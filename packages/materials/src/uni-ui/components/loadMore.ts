import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniLoadMore',
  label: '加载更多',
  categoryId: 'ext',
  props: [
    {
      name: 'iconSize',
      title: '指定图标大小',
      defaultValue: 24,
      setters: 'NumberSetter'
    },
    {
      name: 'status',
      title: 'loading 的状态',
      defaultValue: 'more',
      setters: 'SelectSetter',
      options: ['more', 'loading', 'noMore']
    },
    {
      name: 'showIcon',
      title: '是否显示 loading 图标',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showText',
      title: '是否显示文本',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'iconType',
      title: '指定图标样式',
      defaultValue: 'auto',
      setters: 'SelectSetter',
      options: ['snow', 'circle', 'auto']
    },
    {
      name: 'color',
      title: '图标和文字颜色',
      defaultValue: '#777777',
      setters: 'ColorSetter'
    },
    {
      name: 'contentText',
      title: '各状态文字说明',
      defaultValue: {
        contentdown: '上拉显示更多',
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了'
      },
      setters: 'ObjectSetter'
    }
  ],
  events: ['clickLoadMore'],
  snippet: {}
};

export default desc;
