import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Canvas',
  label: '画布',
  categoryId: 'media',
  props: [
    {
      name: 'type',
      title: '指定 canvas 类型，支持 2d (2.9.0) 和 webgl',
      defaultValue: '',
      setters: 'SelectSetter',
      options: ['2d', 'webgl']
    },
    {
      name: 'canvas-id',
      title: 'canvas 组件的唯一标识符',
      setters: 'StringSetter'
    },
    {
      name: 'disable-scroll',
      title: '当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hidpi',
      title: '是否启用高清处理',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'longtap',
    'error'
  ],
  snippet: {
    props: {
      style: { width: '300px', height: '200px' },
      'canvas-id': 'firstCanvas',
      id: 'firstCanvas'
    }
  }
};

export default desc;
