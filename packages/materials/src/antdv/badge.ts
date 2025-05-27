import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ABadge',
    alias: 'Badge',
    label: '徽标数',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/badge-cn',
    props: [
      {
        name: 'color',
        label: 'color',
        title: '自定义小圆点的颜色',
        setters: 'StringSetter'
      },
      {
        name: 'count',
        label: 'count',
        title:
          '展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏',
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'dot',
        label: 'dot',
        title: '不展示数字，只有一个小红点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'numberStyle',
        label: 'numberStyle',
        title: '设置状态点的样式',
        setters: 'ObjectSetter',
        defaultValue: ''
      },
      {
        name: 'offset',
        label: 'offset',
        title: '设置状态点的位置偏移，格式为 [x, y]',
        setters: 'ArraySetters'
      },
      {
        name: 'overflowCount',
        label: 'overflowCount',
        title: '展示封顶的数字值',
        setters: 'NumberSetter',
        defaultValue: 99
      },
      {
        name: 'showZero',
        label: 'showZero',
        title: '当数值为 0 时，是否展示 Badge',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'status',
        label: 'status',
        title: '设置 Badge 为状态点',
        setters: 'SelectSetter',
        options: ['success', 'processing', 'default', 'error', 'warning'],
        defaultValue: ''
      },
      {
        name: 'text',
        label: 'text',
        title: '在设置了 status 的前提下有效，设置状态点的文本',
        setters: 'StringSetter',
        defaultValue: ''
      },
      {
        name: 'title',
        label: 'title',
        title: '设置鼠标放在状态点上时显示的文字',
        setters: 'StringSetter',
        defaultValue: 'count'
      }
    ],
    slots: ['default', 'count'],
    snippet: {
      props: { count: 5 },
      children: [{ name: 'AAvatar', props: { shape: 'square', size: 'large' } }]
    }
  },
  {
    name: 'ABadgeRibbon',
    alias: 'Ribbon',
    parent: 'Badge',
    label: '徽标缎带',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/badge-cn',
    props: [
      {
        name: 'color',
        label: 'color',
        title: '自定义缎带的颜色',
        setters: 'StringSetter'
      },
      {
        name: 'placement',
        label: 'placement',
        title: '缎带的位置，start 和 end 随文字方向（RTL 或 LTR）变动',
        setters: 'SelectSetter',
        options: ['start', 'end'],
        defaultValue: 'end'
      },
      {
        name: 'text',
        label: 'text',
        title: '缎带中填入的内容',
        setters: 'StringSetter'
      }
    ],
    slots: ['default', 'text'],
    snippet: {
      props: { text: 'Hippies' },
      children: [
        {
          name: 'ACard',
          props: { title: 'Pushes open the window', size: 'small' },
          children: 'and raises the spyglass.'
        }
      ]
    }
  }
];
export default components;
