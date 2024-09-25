import type { MaterialDescription } from '@vtj/core';

const IndexBar: MaterialDescription[] = [
  {
    name: 'VantIndexBar',
    alias: 'IndexBar',
    label: '索引栏',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/index-bar',
    props: [
      {
        name: 'index-list',
        title: '索引字符列表',
        setters: 'ArraySetter'
      },
      {
        name: 'z-index',
        title: 'z-index 层级',
        defaultValue: 1,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'sticky',
        title: '是否开启锚点自动吸顶',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'sticky-offset-top',
        title: '锚点自动吸顶时与顶部的距离',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'highlight-color',
        title: '索引字符高亮颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'teleport',
        title: '指定索引栏挂载的节点',
        setters: ['StringSetter', 'ExpressionSetter']
      }
    ],
    events: [
      { name: 'select', params: ['index'] },
      { name: 'change', params: ['index'] }
    ],
    snippet: {
      children: [
        { name: 'VantIndexAnchor', props: { index: 'A' } },
        { name: 'VantCell', props: { title: '文本' } },
        { name: 'VantCell', props: { title: '文本' } },
        { name: 'VantCell', props: { title: '文本' } },
        { name: 'VantIndexAnchor', props: { index: 'B' } },
        { name: 'VantCell', props: { title: '文本' } },
        { name: 'VantCell', props: { title: '文本' } },
        { name: 'VantCell', props: { title: '文本' } }
      ]
    }
  },
  {
    name: 'VantIndexAnchor',
    alias: 'IndexAnchor',
    label: '索引栏锚点',
    categoryId: 'nav',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/index-bar',
    props: [
      {
        name: 'index',
        title: '索引字符',
        setters: ['StringSetter', 'NumberSetter']
      }
    ],
    slots: ['default'],
    snippet: {
      props: {
        index: 'C'
      }
    }
  }
];

export default IndexBar;
