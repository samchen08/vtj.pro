import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniRate',
  label: '评分',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '当前评分',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'color',
      title: '未选中状态的星星颜色',
      defaultValue: '	#ececec',
      setters: 'ColorSetter'
    },
    {
      name: 'activeColor',
      title: '选中状态的星星颜色',
      defaultValue: '#ffca3e',
      setters: 'ColorSetter'
    },
    {
      name: 'disabledColor',
      title: '禁用状态的星星颜色',
      defaultValue: '#c0c0c0',
      setters: 'ColorSetter'
    },
    {
      name: 'size',
      title: '星星的大小',
      defaultValue: '24',
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      title: '最大评分评分数量，目前一分一颗星',
      defaultValue: 5,
      setters: 'NumberSetter'
    },
    {
      name: 'margin',
      title: '星星的间距，单位 px',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'isFill',
      title: '星星的类型，是否为实心类型',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否为禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'readonly',
      title: '是否为只读状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowHalf',
      title: '是否展示半星',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'touchable',
      title: '是否支持滑动手势',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'update:modelValue'],
  snippet: {
    props: {
      modelValue: 3
    }
  }
};

export default desc;
