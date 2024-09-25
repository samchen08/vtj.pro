import type { MaterialDescription } from '@vtj/core';

const PullRefresh: MaterialDescription = {
  name: 'VantPullRefresh',
  alias: 'PullRefresh',
  label: '下拉刷新',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/pull-refresh',
  props: [
    {
      name: 'modelValue',
      title: '是否处于加载中状态',
      setters: 'BooleanSetter'
    },
    {
      name: 'pulling-text',
      title: '下拉过程提示文案',
      defaultValue: '下拉即可刷新...',
      setters: 'StringSetter'
    },
    {
      name: 'loosing-text',
      title: '释放过程提示文案',
      defaultValue: '释放即可刷新...',
      setters: 'StringSetter'
    },
    {
      name: 'loading-text',
      title: '加载过程提示文案',
      defaultValue: '加载中...',
      setters: 'StringSetter'
    },
    {
      name: 'success-text',
      title: '刷新成功提示文案',
      setters: 'StringSetter'
    },
    {
      name: 'success-duration',
      title: '刷新成功提示展示时长(ms)',
      defaultValue: 500,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'animation-duration',
      title: '动画时长',
      defaultValue: 300,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'head-height',
      title: '顶部内容高度',
      defaultValue: 50,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'pull-distance',
      title: '触发下拉刷新的距离',
      defaultValue: 50,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'disabled',
      title: '	是否禁用下拉刷新',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'update:modelValue' },
    { name: 'refresh' },
    { name: 'change', params: ['data'] }
  ],
  slots: ['default', 'normal', 'pulling', 'loosing', 'loading', 'success'],
  snippet: {
    props: {
      modelValue: true
    },
    children: [{ name: 'p', children: '下拉刷新' }]
  }
};

export default PullRefresh;
