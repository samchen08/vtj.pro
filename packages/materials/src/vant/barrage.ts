import type { MaterialDescription } from '@vtj/core';

const Barrage: MaterialDescription = {
  name: 'VanBarrage',
  alias: 'Barrage',
  label: '弹幕',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/barrage',
  props: [
    {
      name: 'modelValue',
      title: '弹幕数据',
      setters: 'ArraySetter'
    },
    {
      name: 'auto-play',
      title: '是否自动播放弹幕',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'rows',
      title: '弹幕文字行数',
      defaultValue: 4,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'top',
      title: '弹幕文字区域顶部间距，单位 px',
      defaultValue: 10,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'duration',
      title: '弹幕文字滑过容器的时间，单位 ms',
      defaultValue: 4000,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'delay',
      title: '弹幕动画延时，单位 ms',
      defaultValue: 300,
      setters: 'NumberSetter'
    }
  ],
  events: [{ name: 'update:modelValue' }],
  slots: ['default'],
  snippet: {
    props: {
      modelValue: [
        { id: 100, text: '轻量' },
        { id: 101, text: '可定制的' },
        { id: 102, text: '移动端' },
        { id: 103, text: 'Vue' },
        { id: 104, text: '组件库' },
        { id: 105, text: 'VantUI' },
        { id: 106, text: '666' }
      ]
    },
    children: [
      { name: 'div', props: { style: { width: '100%', height: '150px' } } }
    ]
  }
};

export default Barrage;
