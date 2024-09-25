import type { MaterialDescription } from '@vtj/core';

const Progress: MaterialDescription = {
  name: 'VantProgress',
  alias: 'Progress',
  label: '进度条',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/progress',
  props: [
    {
      name: 'percentage',
      title: '进度百分比',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'stroke-width',
      title: '进度条粗细，默认单位为px',
      defaultValue: 4,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'color',
      title: '进度条颜色',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'track-color',
      title: '轨道颜色',
      defaultValue: '#e5e5e5',
      setters: 'StringSetter'
    },
    {
      name: 'pivot-text',
      title: '进度文字内容',
      setters: 'StringSetter'
    },
    {
      name: 'pivot-color',
      title: '进度文字背景色',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'text-color',
      title: '进度文字颜色',
      defaultValue: 'white',
      setters: 'StringSetter'
    },
    {
      name: 'inactive',
      title: '是否置灰',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'show-pivot',
      title: '是否显示进度文字',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  snippet: {
    props: {
      percentage: 50
    }
  }
};

export default Progress;
