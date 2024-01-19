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
        defaultValue: '',
        options: ['success', 'info', 'warning', 'danger'],
        setters: 'SelectSetter'
      },
      {
        name: 'closable',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'disable-transitions',
        defaultValue: false,
        label: '渐变动画',
        setters: 'BooleanSetter'
      },
      {
        name: 'hit',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        defaultValue: '',
        setters: 'ColorSetter'
      },
      {
        name: 'size',
        defaultValue: 'default',
        options: ['large', 'default', 'small'],
        setters: 'SelectSetter'
      },
      {
        name: 'effect',
        defaultValue: 'light',
        options: ['dark', 'light', 'plain'],
        setters: 'SelectSetter'
      },
      {
        name: 'round',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['click', 'close'],
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
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change'],
    snippet: {
      children: '标签一'
    }
  }
];

export default Tag;
