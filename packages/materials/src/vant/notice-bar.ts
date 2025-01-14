import type { MaterialDescription } from '@vtj/core';

const NoticeBar: MaterialDescription = {
  name: 'VanNoticeBar',
  alias: 'NoticeBar',
  label: '通知栏',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/notice-bar',
  props: [
    {
      name: 'mode',
      title: '通知栏模式，可选值为 closeable link',
      defaultValue: '""',
      setters: 'SelectSetter',
      options: ['closeable', 'link', '']
    },
    {
      name: 'text',
      title: '通知文本内容',
      defaultValue: '""',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '通知文本颜色',
      defaultValue: '#ed6a0c',
      setters: 'StringSetter'
    },
    {
      name: 'background',
      title: '滚动条背景',
      defaultValue: '#fffbe8',
      setters: 'StringSetter'
    },
    {
      name: 'left-icon',
      title: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setters: 'StringSetter'
    },
    {
      name: 'delay',
      title: '动画延迟时间 (s)',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'speed',
      title: '滚动速率 (px/s)',
      defaultValue: 60,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'scrollable',
      title: '是否开启滚动播放，内容长度溢出时默认开启',
      setters: 'SelectSetter'
    },
    {
      name: 'wrapable',
      title: '是否开启文本换行，只在禁用滚动时生效',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'click', params: ['event'] },
    { name: 'close', params: ['event'] },
    { name: 'replay' }
  ],
  slots: ['default', 'left-icon', 'right-icon'],
  snippet: {
    props: {
      'left-icon': 'volume-o',
      text: '无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。'
    }
  }
};

export default NoticeBar;
