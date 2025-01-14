import type { MaterialDescription } from '@vtj/core';

const Circle: MaterialDescription = {
  name: 'VanCircle',
  alias: 'Circle',
  label: '环形进度条',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/circle',
  props: [
    {
      name: 'currentRate',
      title: '当前进度',
      setters: 'NumberSetter'
    },
    {
      name: 'rate',
      title: '目标进度',
      defaultValue: 100,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'size',
      title: '圆环直径，默认单位为 px',
      defaultValue: '100px',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'color',
      title: '进度条颜色，传入对象格式可以定义渐变色',
      defaultValue: '#1989fa',
      setters: ['StringSetter', 'ObjectSetter', 'StringSetter']
    },
    {
      name: 'layer-color',
      title: '轨道颜色',
      defaultValue: 'white',
      setters: ['StringSetter', 'StringSetter']
    },
    {
      name: 'fill',
      title: '填充颜色',
      defaultValue: 'none',
      setters: ['StringSetter', 'StringSetter']
    },
    {
      name: 'speed',
      title: '动画速度（单位为 rate/s）',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'text',
      title: '文字',
      setters: 'StringSetter'
    },
    {
      name: 'stroke-width',
      title: '进度条宽度',
      defaultValue: 40,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'stroke-linecap',
      title: '进度条端点的形状，可选值为 square butt',
      defaultValue: 'round',
      setters: 'SelectSetter',
      options: ['round', 'square', 'butt']
    },
    {
      name: 'clockwise',
      title: '是否顺时针增加',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'start-position',
      title: '进度起始位置',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['left', 'right', 'top', 'bottom']
    }
  ],
  events: ['update:currentRate'],
  slots: ['default'],
  snippet: {
    props: {
      currentRate: 30,
      rate: 100,
      text: '30%'
    }
  }
};

export default Circle;
