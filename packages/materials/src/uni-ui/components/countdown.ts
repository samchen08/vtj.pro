import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniCountdown',
  label: '倒计时',
  categoryId: 'ext',
  props: [
    {
      name: 'backgroundColor',
      title: '背景色',
      defaultValue: '#FFFFFF',
      setters: 'ColorSetter'
    },
    {
      name: 'color',
      title: '文字颜色',
      defaultValue: '#000000',
      setters: 'ColorSetter'
    },
    {
      name: 'splitorColor',
      title: '分割符号颜色',
      defaultValue: '#000000',
      setters: 'ColorSetter'
    },
    {
      name: 'day',
      title: '天数',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'hour',
      title: '小时',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'minute',
      title: '分钟',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'second',
      title: '秒',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'showDay',
      title: '是否显示天数',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showHour',
      title: '是否显示小时',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showMinute',
      title: '是否显示分钟',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'showColon',
      title: '是否以冒号为分隔符',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'start',
      title: '是否初始化组件后就开始倒计时',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['timeup'],
  snippet: {
    props: {
      day: 1,
      hour: 1,
      minute: 2,
      second: 40
    }
  }
};

export default desc;
