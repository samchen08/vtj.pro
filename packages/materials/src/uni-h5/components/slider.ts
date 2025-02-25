import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Slider',
  label: '滑动选择器',
  categoryId: 'form',
  props: [
    {
      name: 'min',
      title: '最小值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      title: '最大值',
      defaultValue: '100',
      setters: 'NumberSetter'
    },
    {
      name: 'step',
      title: '步长，取值必须大于 0，并且可被(max - min)整除',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'value',
      title: '当前取值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'activeColor',
      title: '滑块左侧已选择部分的线条颜色',
      setters: 'ColorSetter'
    },
    {
      name: 'backgroundColor',
      title: '滑块右侧背景条的颜色',
      defaultValue: '#e9e9e9',
      setters: 'ColorSetter'
    },
    {
      name: 'block-size',
      title: '滑块的大小，取值范围为 12 - 28',
      defaultValue: 28,
      setters: 'NumberSetter'
    },
    {
      name: 'block-color',
      title: '滑块的颜色',
      defaultValue: '#ffffff',
      setters: 'ColorSetter'
    },
    {
      name: 'show-value',
      title: '是否显示当前 value',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'changing'],
  snippet: {
    props: {
      value: 60
    }
  }
};
export default desc;
