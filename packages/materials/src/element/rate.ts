import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';
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
      title: '选中项绑定值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      title: '最大分值',
      defaultValue: 5,
      setters: 'NumberSetter'
    },
    size('size'),
    {
      name: 'disabled',
      title: '是否为只读',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'allowHalf',
      title: '是否允许半选',
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
      title: 'icon 的颜色',
      defaultValue: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'voidColor',
      title: '未选中 icon 的颜色',
      defaultValue: '#C6D1DE',
      setters: 'ColorSetter'
    },
    {
      name: 'disabledVoidColor',
      title: '只读时未选中 icon 的颜色',
      defaultValue: '#EFF2F7',
      label: 'disabledColor',
      setters: 'ColorSetter'
    },
    {
      name: 'icons',
      title: '图标组件',
      defaultValue: ['StarFilled', 'StarFilled', 'StarFilled'],
      setters: ['ArraySetter', 'JSONSetter']
    },
    {
      name: 'voidIcon',
      title: '未被选中的图标组件',
      defaultValue: 'Star',
      setters: 'InputSetter'
    },
    {
      name: 'disabledVoidIcon',
      title: '禁用状态的未选择图标',
      defaultValue: 'StarFilled',
      label: 'disabledIcon',
      setters: 'InputSetter'
    },
    {
      name: 'showText',
      title: '是否显示辅助文字',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showScore',
      title: '是否显示当前分数， show-score 和 show-text 不能同时为真',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'textColor',
      title: '辅助文字的颜色',
      defaultValue: '#1F2D3D',
      setters: 'ColorSetter'
    },
    {
      name: 'texts',
      title: '辅助文字数组',
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
      title: '分数显示模板',
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
