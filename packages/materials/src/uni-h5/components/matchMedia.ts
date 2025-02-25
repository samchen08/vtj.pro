import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'MatchMedia',
  label: '适配大屏小屏',
  categoryId: 'container',
  props: [
    {
      name: 'min-width',
      title: '页面最小宽度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'max-width',
      title: '页面最大宽度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'width',
      title: '页面宽度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'min-height',
      title: '页面最小高度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'max-height',
      title: '页面最大高度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'height',
      title: '页面高度（ px 为单位）',
      setters: 'NumberSetter'
    },
    {
      name: 'orientation',
      title: '屏幕方向',
      setters: 'SelectSetter',
      options: ['landscape', 'portrait']
    }
  ],
  snippet: {
    props: {
      'min-width': '375',
      'max-width': '800'
    },
    children: [
      {
        name: 'View',
        children: '当页面最小宽度 375px， 页面宽度最大 800px 时显示'
      }
    ]
  }
};

export default desc;
