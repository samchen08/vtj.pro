import type { MaterialDescription } from '@vtj/core';

const Anchor: MaterialDescription = {
  name: 'ElAnchor',
  label: '锚点',

  doc: 'https://element-plus.org/zh-CN/component/anchor.html',
  categoryId: 'other',
  package: 'element-plus',
  props: [
    {
      name: 'container',
      label: 'container',
      title: '滚动的容器',
      setters: 'StringSetter' //??
    },
    {
      name: 'offset',
      label: 'offset',
      title: '设置锚点滚动的偏移量',
      setters: 'NumberSetter',
      defaultValue: 0
    },
    {
      name: 'bound',
      label: 'bound',
      title: '触发锚点的元素的位置偏移量',
      setters: 'NumberSetter',
      defaultValue: 15
    },
    {
      name: 'duration',
      label: 'duration',
      title: '设置容器滚动持续时间，单位为毫秒',
      setters: 'NumberSetter',
      defaultValue: 300
    },
    {
      name: 'marker',
      label: 'marker',
      title: '是否显示标记',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'type',
      label: 'type',
      title: '设置锚点类型',
      setters: 'SelectSetter',
      options: ['default', 'underline'],
      defaultValue: 'default'
    },
    {
      name: 'direction',
      label: 'direction',
      title: '设置锚点方向',
      setters: 'SelectSetter',
      options: ['vertical', 'horizontal'],
      defaultValue: 'horizontal'
    }
  ],
  events: ['change', 'click'],
  slots: ['default'],
  snippet: {
    props: {
      offset: '70'
    },
    children: [
      {
        name: 'ElAnchorLink',
        props: {
          href: ''
        },
        children: '基本用法'
      }
    ]
  }
};

const AnchorLink: MaterialDescription = {
  name: 'ElAnchorLink',
  label: '锚点链接',

  doc: 'https://element-plus.org/zh-CN/component/anchor.html',
  categoryId: 'other',
  package: 'element-plus',
  props: [
    {
      name: 'title',
      label: 'title',
      title: '链接的文本内容',
      setters: 'StringSetter'
    },
    {
      name: 'href',
      label: 'href',
      title: '链接的地址',
      setters: 'StringSetter'
    }
  ],
  slots: ['default', 'sub-link'],
  snippet: {
    props: {
      href: ''
    },
    children: '基本用法'
  }
};

export default [Anchor, AnchorLink];
