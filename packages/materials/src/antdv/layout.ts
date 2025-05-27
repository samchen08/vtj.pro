import type { MaterialDescription } from '@vtj/core';
import { headerStyle, contentStyle, siderStyle, footerStyle } from '../shared';

const components: MaterialDescription[] = [
  {
    name: 'ALayout',
    alias: 'Layout',
    label: '布局容器',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/layout-cn#components-layout-demo-fixed',
    props: [
      {
        name: 'class',
        label: 'class',
        title: '容器 class',
        setters: 'StringSetter'
      },
      {
        name: 'hasSider',
        label: 'hasSider',
        title:
          '表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'style',
        label: 'style',
        title: '指定样式',
        setters: 'ObjectSetter'
      }
    ],
    snippet: {
      children: [
        {
          name: 'ALayoutSider',
          children: 'ALayoutSider',
          props: { style: { ...siderStyle } }
        },
        {
          name: 'ALayout',
          children: [
            {
              name: 'ALayoutHeader',
              children: 'header',
              props: { style: { ...headerStyle } }
            },
            {
              name: 'ALayoutContent',
              children: 'content',
              props: { style: { ...contentStyle } }
            },
            {
              name: 'ALayoutFooter',
              children: 'footer',
              props: { style: { ...footerStyle } }
            }
          ]
        }
      ]
    }
  },
  {
    name: 'ALayoutHeader',
    alias: 'Header',
    parent: 'Layout',
    label: '顶栏容器',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/layout-cn#components-layout-demo-fixed',
    snippet: {
      children: 'header',
      props: { style: { ...headerStyle } }
    }
  },
  {
    name: 'ALayoutContent',
    alias: 'Content',
    parent: 'Layout',
    label: '主要内容容器',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/layout-cn#components-layout-demo-fixed',
    snippet: {
      children: 'content',
      props: { style: { ...contentStyle } }
    }
  },
  {
    name: 'ALayoutFooter',
    alias: 'Footer',
    parent: 'Layout',
    label: '底栏容器',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/layout-cn#components-layout-demo-fixed',
    snippet: {
      children: 'footer',
      props: { style: { ...footerStyle } }
    }
  },
  {
    name: 'ALayoutSider',
    alias: 'Sider',
    parent: 'Layout',
    label: '侧边栏容器',
    categoryId: 'layout',
    doc: 'https://www.antdv.com/components/layout-cn#components-layout-demo-fixed',
    props: [
      {
        name: 'breakpoint',
        label: 'breakpoint',
        title: '触发响应式布局的断点',
        setters: 'StringSetter'
      },
      {
        name: 'class',
        label: 'class',
        title: '容器 class',
        setters: 'StringSetter'
      },
      {
        name: 'collapsed',
        label: 'collapsed',
        title: '当前收起状态',
        setters: 'BooleanSetter'
      },
      {
        name: 'collapsedWidth',
        label: 'collapsedWidth',
        title: '收缩宽度，设置为 0 会出现特殊 trigger',
        setters: 'NumberSetter',
        defaultValue: 80
      },
      {
        name: 'collapsible',
        label: 'collapsible',
        title: '是否可收起',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'defaultCollapsed',
        label: 'defaultCollapsed',
        title: '是否默认收起',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'reverseArrow',
        label: 'reverseArrow',
        title: '翻转折叠提示箭头的方向，当 Sider 在右边时可以使用',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'style',
        label: 'style',
        title: '指定样式',
        setters: ['ObjectSetter', 'StringSetter']
      },
      {
        name: 'theme',
        label: 'theme',
        title: '主题颜色',
        setters: 'SelectSetter',
        options: ['light', 'dark'],
        defaultValue: 'dark'
      },
      {
        name: 'trigger',
        label: 'trigger',
        title: '自定义 trigger，设置为 null 时隐藏 trigger',
        setters: 'StringSetter'
      },
      {
        name: 'width',
        label: 'width',
        title: '宽度',
        setters: ['NumberSetter', 'StringSetter'],
        defaultValue: 200
      },
      {
        name: 'zeroWidthTriggerStyle',
        label: 'zeroWidthTriggerStyle',
        title: '指定当 collapsedWidth 为 0 时出现的特殊 trigger 的样式',
        setters: 'ObjectSetter'
      }
    ],
    events: ['breakpoint', 'collapse', 'update:collapsed'],
    slots: ['default', 'trigger'],
    snippet: {
      children: 'sider',
      props: { style: { ...siderStyle } }
    }
  }
];

export default components;
