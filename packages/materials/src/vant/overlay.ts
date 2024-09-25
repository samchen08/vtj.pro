import type { MaterialDescription } from '@vtj/core';

const Overlay: MaterialDescription = {
  name: 'VantOverlay',
  alias: 'Overlay',
  label: '遮罩层',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/overlay',
  props: [
    {
      name: 'show',
      title: '是否展示遮罩层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'z-index',
      title: '	z-index 层级',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'duration',
      title: '动画时长，单位秒，设置为 0 可以禁用动画',
      defaultValue: 0.3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'class-name',
      title: '自定义类名',
      setters: 'StringSetter'
    },
    {
      name: 'custom-style',
      title: '自定义样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'lock-scroll',
      title: '是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lazy-render',
      title: '是否在显示时才渲染节点',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [{ name: 'click', params: ['event'] }],
  slots: ['default'],
  snippet: {
    props: {
      show: true
    }
  }
};

export default Overlay;
