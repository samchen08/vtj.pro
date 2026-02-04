import type { MaterialDescription } from '@vtj/core';
import { effect, size, type } from '../shared';
const Tag: MaterialDescription[] = [
  {
    name: 'ElTag',
    label: '标签',

    doc: 'https://element-plus.org/zh-CN/component/tag.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        ...type('type'),
        defaultValue: 'primary',
      },
      {
        name: 'closable',
        title: '是否可关闭',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-transitions',
        defaultValue: false,
        label: '禁用渐变动画',
        title: '是否禁用渐变动画',
        setters: 'BooleanSetter'
      },
      {
        name: 'hit',
        title: '是否有边框描边',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        title: '背景色',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      size('size'),
      {
        ...effect('effect'),
        options: ['dark', 'light', 'plain'],
      },
      {
        name: 'round',
        title: 'Tag 是否为圆形',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'close'],
    slots: ['default'],
    snippet: {
      children: '标签一'
    }
  },
  {
    name: 'ElCheckTag',
    label: '可选中的标签',

    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'checked',
        title: '是否选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        ...type('type'),
        defaultValue: 'primary'
      }
    ],
    events: ['change', 'update:checked'],
    slots: ['default'],
    snippet: {
      children: '标签一'
    }
  }
];

export default Tag;
