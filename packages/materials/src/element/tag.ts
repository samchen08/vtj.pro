import type { MaterialDescription } from '@vtj/core';
const Tag: MaterialDescription[] = [
  {
    name: 'ElTag',
    label: '标签',

    doc: 'https://element-plus.org/zh-CN/component/tag.html',
    categoryId: 'data',
    package: 'element-plus',
    props: [
      {
        name: 'type',
        title: 'Tag 的类型',
        defaultValue: 'primary',
        options: ['primary', 'success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
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
      {
        name: 'size',
        title: 'Tag 的尺寸',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'effect',
        title: 'Tag 的主题',
        defaultValue: 'light',
        options: ['dark', 'light', 'plain'],
        setters: 'SelectSetter'
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
        name: 'type',
        label: 'type',
        title: 'CheckTag 类型',
        setters: 'SelectSetter',
        options: ['primary', 'success', 'info', 'warning', 'danger'],
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
