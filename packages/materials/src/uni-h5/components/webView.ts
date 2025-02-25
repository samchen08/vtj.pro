import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'WebView',
  label: '浏览器组件',
  categoryId: 'media',
  props: [
    {
      name: 'src',
      title: 'webview 指向网页的链接',
      setters: 'StringSetter'
    },
    {
      name: 'allow',
      title: '用于为 iframe 指定其特征策略',
      setters: 'StringSetter'
    },
    {
      name: 'sandbox',
      title: '该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件',
      setters: 'StringSetter'
    },
    {
      name: 'fullscreen',
      title: '是否铺满整个页面',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'webview-styles',
      title: 'webview 的样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'update-title',
      title: '是否自动更新当前页面标题',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['message', 'onPostMessage', 'load', 'error'],
  snippet: {
    props: {
      'webview-styles': {
        progress: {
          color: '#FF3333'
        }
      },
      src: 'https://uniapp.dcloud.io/static/web-view.html'
    }
  }
};

export default desc;
