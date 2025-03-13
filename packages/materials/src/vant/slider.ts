import type { MaterialDescription } from '@vtj/core';

const Slider: MaterialDescription = {
  name: 'VanSlider',
  alias: 'Slider',
  label: '滑块',
  categoryId: 'form',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/slider',
  props: [
    {
      name: 'modelValue',
      title: '当前进度百分比，在双滑块模式下为数组格式',
      defaultValue: 0,
      setters: ['NumberSetter', 'ArraySetter']
    },
    {
      name: 'max',
      title: '最大值',
      defaultValue: 100,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'min',
      title: '最小值',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'step',
      title: '步长',
      defaultValue: 1,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'bar-height',
      title: '进度条高度，默认单位为 px',
      defaultValue: 2,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'button-size',
      title: '滑块按钮大小，默认单位为 px',
      defaultValue: 24,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'active-color',
      title: '进度条激活态颜色',
      defaultValue: '#1989fa',
      setters: 'StringSetter'
    },
    {
      name: 'inactive-color',
      title: '进度条非激活态颜色',
      defaultValue: '#e5e5e5',
      setters: 'StringSetter'
    },
    {
      name: 'range',
      title: '是否开启双滑块模式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'reverse',
      title: '是否将进度条反转',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用滑块',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态，只读状态下无法修改滑块的值',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'vertical',
      title: 'vertical',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'update:modelValue', params: ['value'] },
    { name: 'change', params: ['value'] },
    { name: 'dragStart', params: ['event'] },
    { name: 'dragEnd', params: ['event'] }
  ],
  slots: ['button', 'left-button', 'right-button'],
  snippet: {
    props: {
      modelValue: 50
    }
  }
};

export default Slider;
