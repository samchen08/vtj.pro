import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ACard',
    alias: 'Card',
    label: '卡片',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/card-cn',
    props: [
      {
        name: 'activeTabKey',
        label: 'activeTabKey',
        title: '当前激活页签的 key',
        setters: 'StringSetter'
      },
      {
        name: 'bodyStyle',
        label: 'bodyStyle',
        title: '内容区域自定义样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'bordered',
        label: 'bordered',
        title: '是否有边框',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'defaultActiveTabKey',
        label: 'defaultActiveTabKey',
        title: '初始化选中页签的 key，如果没有设置 activeTabKey',
        setters: 'StringSetter',
        defaultValue: '第一个页签'
      },
      {
        name: 'extra',
        label: 'extra',
        title: '卡片右上角的操作区域',
        setters: 'StringSetter'
      },
      {
        name: 'headStyle',
        label: 'headStyle',
        title: '自定义标题区域样式',
        setters: 'ObjectSetter'
      },
      {
        name: 'hoverable',
        label: 'hoverable',
        title: '鼠标移过时可浮起',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'loading',
        label: 'loading',
        title: '当卡片内容还在加载中时，可以用 loading 展示一个占位',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'size',
        label: 'size',
        title: 'card 的尺寸',
        setters: 'SelectSetter',
        options: ['default', 'small'],
        defaultValue: 'default	'
      },
      {
        name: 'tabList',
        label: 'tabList',
        title: '页签标题列表, 可以通过 customTab(v3.0) 插槽自定义 tab',
        setters: 'ArraySetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '卡片标题',
        setters: 'StringSetter'
      },
      {
        name: 'type',
        label: 'type',
        title: '卡片类型，可设置为 inner 或 不设置',
        setters: 'StringSetter'
      }
    ],
    events: ['tabChange'],
    slots: [
      'default',
      'actions',
      'cover',
      'customTab',
      'extra',
      'tabBarExtraContent',
      'title'
    ],
    snippet: {
      props: {
        title: 'Default size card',
        style: { width: '300px' }
      },
      slot: 'extra',
      children: [
        {
          name: 'a',
          slot: { name: 'extra' },
          children: 'more'
        },
        { name: 'component', props: { is: 'p' }, children: 'card content' },
        { name: 'component', props: { is: 'p' }, children: 'card content' },
        { name: 'component', props: { is: 'p' }, children: 'card content' }
      ]
    }
  },
  {
    name: 'ACardGrid',
    alias: 'Grid',
    parent: 'Card',
    label: '网格型内嵌卡片',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/card-cn',
    snippet: {
      props: {
        style: { width: '25%', textAline: 'center' }
      },
      children: 'content',
      directives: [
        {
          name: 'vFor',
          value: {
            type: 'JSExpression',
            value: '8'
          }
        }
      ]
    }
  },
  {
    name: 'ACardMeta',
    alias: 'Meta',
    parent: 'Card',
    label: 'meta卡片',
    categoryId: 'data',
    doc: 'https://www.antdv.com/components/card-cn',
    props: [
      {
        name: 'description',
        label: 'description',
        title: '描述内容',
        setters: 'StringSetter'
      },
      {
        name: 'title',
        label: 'title',
        title: '标题内容',
        setters: 'StringSetter'
      }
    ],
    slots: ['avatar', 'description', 'title'],
    snippet: {
      props: { title: 'Europe Street beat' },
      slot: 'description',
      children: [
        {
          name: 'span',
          slot: { name: 'description' },
          children: 'www.instagram.com'
        }
      ]
    }
  }
];
export default components;
