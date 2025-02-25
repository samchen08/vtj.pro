import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniCard',
  label: '卡片',
  categoryId: 'ext',
  props: [
    {
      name: 'title',
      title: '标题文字',
      setters: 'StringSetter'
    },
    {
      name: 'sub-title',
      title: '副标题文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'extra',
      title: '标题额外信息',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'thumbnail',
      title:
        '标题左侧缩略图,支持网络图片，本地图片，本图片需要传入一个绝对路径',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'cover',
      title: '封面图,支持网络图片，本地图片，本图片需要传入一个绝对路径',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'is-full',
      title: '卡片内容是否通栏，为true时将去除padding值',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'is-shadow',
      title: '卡片内容是否开启阴影',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'shadow',
      title: '卡片阴影,需符合 css 值',
      defaultValue: '0px 0px 3px 1px rgba(0, 0, 0, 0.08)',
      setters: 'StringSetter'
    },
    {
      name: 'margin',
      title: '卡片外边距',
      defaultValue: '10px',
      setters: 'StringSetter'
    },
    {
      name: 'spacing',
      title: '卡片内边距',
      defaultValue: '10px',
      setters: 'StringSetter'
    },
    {
      name: 'padding',
      title: '卡片内容内边距',
      defaultValue: '10px',
      setters: 'StringSetter'
    },
    {
      name: 'border',
      title: '卡片边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'mode',
      title: '卡片模式(弃用)',
      defaultValue: 'basic',
      setters: 'SelectSetter',
      options: ['basic', 'style', 'title']
    },
    {
      name: 'note',
      title: '底部信息[弃用]',
      defaultValue: '',
      setters: 'StringSetter'
    }
  ],
  events: ['click'],
  slots: ['cover', 'title', 'actions', 'header', 'footer'],
  snippet: {
    props: {
      'is-full': true,
      'is-shadow': false,
      title: '基础卡片',
      extra: '额外信息'
    },
    children: [
      {
        name: 'View',
        children:
          '卡片组件通用来显示完整独立的一段信息，同时让用户理解他的作用。例如一篇文章的预览图、作者信息、时间等，卡片通常是更复杂和更详细信息的入口点。'
      }
    ]
  }
};

export default desc;
