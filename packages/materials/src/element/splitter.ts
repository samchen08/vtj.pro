import type { MaterialDescription } from '@vtj/core';
const splitters: MaterialDescription[] = [
  {
    name: 'ElSplitter',
    label: '分隔',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/space.html',
    package: 'element-plus',
    props: [
      {
        name: 'layout',
        defaultValue: 'horizontal',
        title: '分隔面板的布局方向',
        options: ['horizontal', 'vertical'],
        setters: 'SelectSetter'
      },
      {
        name: 'lazy',
        title: '是否使用懒加载',
        defaultValue: false,
        setters: ['BooleanSetter']
      }
    ],
    slots: ['default'],
    events: ['resize-start', 'resize', 'resize-end', 'collapse'],
    snippet: {}
  },
  {
    name: 'ElSplitterPanel',
    label: '分隔面板',
    categoryId: 'base',
    doc: 'https://element-plus.org/zh-CN/component/space.html',
    package: 'element-plus',
    props: [
      {
        name: 'size',
        defaultValue: undefined,
        title: '面板大小(像素或百分比)',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'min',
        defaultValue: undefined,
        title: '面板最小尺寸(像素或百分比)',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'max',
        defaultValue: undefined,
        title: '面板最大尺寸(像素或百分比)',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'resizable',
        title: '是否可以调整面板大小',
        defaultValue: true,
        setters: ['BooleanSetter']
      },
      {
        name: 'collapsible',
        title: '面板是否可折叠',
        defaultValue: false,
        setters: ['BooleanSetter']
      }
    ],
    events: ['update:size'],
    slots: ['default', 'start-collapsible', 'end-collapsible'],
    snippet: {}
  }
];

export default splitters;
