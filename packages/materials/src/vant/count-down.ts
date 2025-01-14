import type { MaterialDescription } from '@vtj/core';

const CountDown: MaterialDescription = {
  name: 'VanCountDown',
  alias: 'CountDown',
  label: '倒计时',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/count-down',
  props: [
    {
      name: 'time',
      title: '倒计时时长，单位毫秒',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'format',
      title: '时间格式',
      defaultValue: 'HH:ss:mm',
      setters: 'StringSetter'
    },
    {
      name: 'auto-start',
      title: '是否自动开始倒计时',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'millisecond',
      title: '是否开启毫秒级渲染',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [{ name: 'finish' }, { name: 'change', params: ['currentTime'] }],
  slots: ['default'],
  snippet: {
    props: {
      time: 30 * 60 * 60 * 1000
    }
  }
};

export default CountDown;
