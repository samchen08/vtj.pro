import type { MaterialDescription } from '@vtj/core';

const List: MaterialDescription = {
  name: 'VantList',
  alias: 'List',
  label: '列表',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/list',
  props: [
    {
      name: 'loading',
      title: '是否处于加载状态，加载过程中不触发 load 事件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'error',
      title: '是否加载失败，加载失败后点击错误提示可以重新触发 load 事件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'finished',
      title: '是否已加载完成，加载完成后不再触发 load 事件',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      title: '滚动条与底部距离小于 offset 时触发 load 事件',
      defaultValue: 300,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'loading-text',
      title: '加载过程中的提示文案',
      defaultValue: '加载中...',
      setters: 'StringSetter'
    },
    {
      name: 'finished-text',
      title: '加载完成后的提示文案',
      setters: 'StringSetter'
    },
    {
      name: 'error-text',
      title: '加载失败后的提示文案',
      setters: 'StringSetter'
    },
    {
      name: 'immediate-check',
      title: '是否在初始化时立即执行滚动位置检查',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用滚动加载',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'direction',
      title: '滚动触发加载的方向，可选值为 up',
      defaultValue: 'down',
      setters: 'SelectSetter',
      options: ['up', 'down']
    },
    {
      name: 'scroller',
      title: '指定需要监听滚动事件的节点，默认为最近的父级滚动节点',
      setters: 'ExpressionSetter'
    }
  ],
  events: ['update:loading', 'update:error', 'load'],
  snippet: {
    props: {
      loading: {
        type: 'JSExpression',
        value: 'this.state.loading'
      },
      finished: {
        type: 'JSExpression',
        value: 'this.state.finished'
      },
      'finished-text': '没有更多了'
    },
    children: [
      {
        name: 'VantCell',
        props: {
          key: {
            type: 'JSExpression',
            value: 'this.context.item'
          },
          title: {
            type: 'JSExpression',
            value: 'this.context.item'
          }
        },
        directives: [
          {
            name: 'vFor',
            value: {
              type: 'JSExpression',
              value: '20'
            }
          }
        ]
      }
    ],
    events: {
      load: {
        name: 'load',
        handler: {
          type: 'JSFunction',
          value:
            '() => {\r\n    setTimeout(() => {\r\n        if (this.state.refreshing) {\r\n            this.state.list = [];\r\n            this.state.refreshing = false;\r\n        }\r\n\r\n        for (let i = 0; i < 10; i++) {\r\n            this.state.list.push(this.state.list.length + 1);\r\n        }\r\n        this.loading = false;\r\n\r\n        if (this.state.list.length >= 40) {\r\n            this.finished = true;\r\n        }\r\n    }, 1000);\r\n};'
        },
        modifiers: {}
      }
    }
  }
};

export default List;
