import type { MaterialDescription } from '@vtj/core';

const FloatingPanel: MaterialDescription = {
  name: 'VanFloatingPanel',
  alias: 'FloatingPanel',
  label: '浮动面板',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/floating-panel',
  props: [
    {
      name: 'height',
      title: '当前面板的显示高度',
      defaultValue: 0,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'anchors',
      title: '设置自定义锚点, 单位 px',
      defaultValue: [100, window.innerWidth * 0.6],
      setters: 'ArraySetter'
    },
    {
      name: 'duration',
      title: '动画时长，单位秒，设置为 0 可以禁用动画',
      defaultValue: 0.3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'content-draggable',
      title: '允许拖拽内容容器',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'lock-scroll',
      title: '当不拖拽时，是否锁定背景滚动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'safe-area-inset-bottom',
      title: '是否开启底部安全区适配',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: [{ name: 'heightChange', params: ['height'] }],
  slots: ['default', 'header'],
  snippet: {
    children: [
      {
        name: 'VanCellGroup',
        children: [
          {
            name: 'VanCell',
            props: {
              size: 'large',
              title: {
                type: 'JSExpression',
                value: 'this.context.index'
              }
            },
            directives: [
              {
                name: 'vFor',
                value: {
                  type: 'JSExpression',
                  value: '20'
                }
              },
              {
                name: 'vBind',
                value: {
                  type: 'JSExpression',
                  value: 'this.context.index'
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

export default FloatingPanel;
