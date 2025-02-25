import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'MovableView',
  label: '可移动的视图容器',
  categoryId: 'container',
  parentIncludes: ['MovableArea'],
  props: [
    {
      name: 'direction',
      title: 'movable-view的移动方向',
      defaultValue: 'none',
      setters: 'SelectSetter',
      options: ['all', 'vertical', 'horizontal', 'none']
    },
    {
      name: 'inertia',
      title: 'movable-view是否带有惯性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'out-of-bounds',
      title: '超过可移动区域后，movable-view是否还可以移动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'x',
      title: '定义x轴方向的偏移',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'y',
      title: '定义y轴方向的偏移',
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'damping',
      title: '阻尼系数',
      defaultValue: 20,
      setters: 'NumberSetter'
    },
    {
      name: 'friction',
      title: '摩擦系数',
      defaultValue: 2,
      setters: 'NumberSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scale',
      title: '是否支持双指缩放',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'scale-min',
      title: '定义缩放倍数最小值',
      defaultValue: 0.1 / 0.5,
      setters: 'NumberSetter'
    },
    {
      name: 'scale-max',
      title: '定义缩放倍数最大值',
      defaultValue: 10,
      setters: 'NumberSetter'
    },
    {
      name: 'scale-value',
      title: '定义缩放倍数，取值范围为 0.1/0.5 - 10',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'animation',
      title: '是否使用动画',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'scale'],
  snippet: {
    props: {
      x: 0,
      y: 0,
      direction: 'all'
    }
  }
};

export default desc;
