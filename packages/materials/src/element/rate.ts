import type { MaterialDescription } from '@vtj/core';
const Rate: MaterialDescription = {
  name: 'ElRate',
  label: '评分',

  childIncludes: false,
  categoryId: 'form',
  doc: 'https://element-plus.org/zh-CN/component/rate.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      defaultValue: 5,
      setters: 'NumberSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowHalf',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'lowThreshold',
      defaultValue: 2,
      title: '低分和中等分数的界限值， 值本身被划分在低分中',
      setters: 'NumberSetter'
    },
    {
      name: 'highThreshold',
      defaultValue: 4,
      title: '高分和中等分数的界限值， 值本身被划分在高分中',
      setters: 'NumberSetter'
    },
    {
      name: 'colors',
      defaultValue: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'voidColor',
      defaultValue: '#C6D1DE',
      setters: 'ColorSetter'
    },
    {
      name: 'disabledVoidColor',
      defaultValue: '#EFF2F7',
      label: 'disabledColor',
      setters: 'ColorSetter'
    },
    {
      name: 'icons',
      defaultValue: ['StarFilled', 'StarFilled', 'StarFilled'],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'voidIcon',
      defaultValue: 'Star',
      setters: 'InputSetter'
    },
    {
      name: 'disabledVoidIcon',
      defaultValue: 'StarFilled',
      label: 'disabledIcon',
      setters: 'InputSetter'
    },
    {
      name: 'showText',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showScore',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'textColor',
      defaultValue: '#1F2D3D',
      setters: 'ColorSetter'
    },
    {
      name: 'texts',
      defaultValue: [
        'Extremely bad',
        'Disappointed',
        'Fair',
        'Satisfied',
        'Surprise'
      ],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'scoreTemplate',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'clearable',
      label: 'clearable',
      title: '是否可以重置值为 0',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'id',
      label: 'id',
      title: '原生 id 属性',
      setters: 'StringSetter'
    },
    {
      name: 'ariaLabel',
      title: '和 Rate 的 aria-label 属性保持一致',
      setters: 'StringSetter'
    },
    {
      name: 'label',
      label: 'label',
      title: '和 Rate 的 aria-label 属性保持一致',
      setters: 'StringSetter'
    }
  ],
  events: ['change', 'update:modelValue']
};

export default Rate;
