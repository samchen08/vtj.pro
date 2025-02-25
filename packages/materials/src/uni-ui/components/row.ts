import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'UniRow',
    label: '布局行',
    categoryId: 'ext',
    props: [
      {
        name: 'gutter',
        title: '栅格间隔',
        defaultValue: 0,
        setters: 'NumberSetter'
      },
      {
        name: 'width',
        title:
          'nvue 中无百分比 width，使用 span 等属性时，需配置此项rpx值。此项不会影响其他平台展示效果',
        defaultValue: '750rpx',
        setters: ['NumberSetter', 'StringSetter']
      }
    ],
    snippet: {
      props: {
        gutter: 20
      },
      children: [
        {
          name: 'UniCol',
          props: {
            span: 8,
            style: { backgroundColor: '#d3dce6' }
          },
          children: [
            {
              name: 'View',
              children: '布局列'
            }
          ]
        },
        {
          name: 'UniCol',
          props: {
            span: 8,
            style: { backgroundColor: '#d3dce6' }
          },
          children: [
            {
              name: 'View',
              children: '布局列'
            }
          ]
        }
      ]
    }
  },
  {
    name: 'UniCol',
    label: '布局列',
    categoryId: 'ext',
    props: [
      {
        name: 'span',
        title: '栅格占据的列数',
        defaultValue: 24,
        setters: 'NumberSetter'
      },
      {
        name: 'offset',
        title: '栅格左侧间隔格数',
        setters: 'NumberSetter'
      },
      {
        name: 'push',
        title: '栅格向右偏移格数',
        setters: 'NumberSetter'
      },
      {
        name: 'pull',
        title: '栅格向左偏移格数',
        setters: 'NumberSetter'
      },
      {
        name: 'xs',
        title: '屏幕宽度<768px时，要显示的栅格规则',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'sm',
        title: '屏幕宽度≥768px时，要显示的栅格规则',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'md',
        title: '屏幕宽度≥992px时，要显示的栅格规则',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'lg',
        title: '屏幕宽度≥1200px时，要显示的栅格规则',
        setters: ['NumberSetter', 'ObjectSetter']
      },
      {
        name: 'xl',
        title: '屏幕宽度≥1920px时，要显示的栅格规则',
        setters: ['NumberSetter', 'ObjectSetter']
      }
    ],
    snippet: {
      props: {
        span: 4
      },
      children: [
        {
          name: 'View',
          props: {
            style: { backgroundColor: '#d3dce6' }
          },
          children: '布局列'
        }
      ]
    }
  }
];

export default desc;
