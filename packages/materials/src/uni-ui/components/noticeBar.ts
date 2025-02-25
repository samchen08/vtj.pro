import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniNoticeBar',
  label: '通告栏	',
  categoryId: 'ext',
  props: [
    {
      name: 'speed',
      title: '文字滚动的速度，默认100px/秒',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'text',
      title: '显示文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'background-color',
      title: '背景颜色',
      defaultValue: '#fffbe8',
      setters: 'ColorSetter'
    },
    {
      name: 'color',
      title: '文字颜色',
      defaultValue: '#de8c17',
      setters: 'ColorSetter'
    },
    {
      name: 'moreColor',
      title: '查看更多文字的颜色',
      defaultValue: '#999999',
      setters: 'ColorSetter'
    },
    {
      name: 'moreText',
      title: '设置“查看更多”的文本',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'single',
      title: '是否单行',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scrollable',
      title: '是否滚动，为true时，NoticeBar为单行',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showIcon',
      title: '是否显示左侧喇叭图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showClose',
      title: '是否显示右侧关闭按钮',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showGetMore',
      title: '是否显示右侧查看更多图标，为true时，NoticeBar为单行',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['click', 'close', 'getmore'],
  snippet: {
    props: {
      text: 'uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。'
    }
  }
};

export default desc;
