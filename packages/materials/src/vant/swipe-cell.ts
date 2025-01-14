import type { MaterialDescription } from '@vtj/core';

const SwipeCell: MaterialDescription = {
  name: 'VanSwipeCell',
  alias: 'SwipeCell',
  label: '滑动单元格',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/swipe-cell',
  props: [
    {
      name: 'name',
      title: '标识符，通常为一个唯一的字符串或数字，可以在事件参数中获取到',
      defaultValue: '""',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'left-width',
      title: '指定左侧滑动区域宽度，单位为 px',
      defaultValue: 'auto',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'right-width',
      title: '指定右侧滑动区域宽度，单位为 px',
      defaultValue: 'auto',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'before-close',
      title: '关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise',
      setters: 'FunctionSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用滑动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'stop-propagation',
      title: '是否阻止滑动事件冒泡',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: [
    { name: 'click', params: ['position'] },
    { name: 'open', params: ['name', 'position'] },
    { name: 'close', params: ['name', 'position'] }
  ],
  slots: ['default', 'left', 'right'],
  snippet: {
    children: [
      {
        name: 'VanButton',
        slot: 'left',
        props: { square: true, type: 'primary', text: '选择' }
      },
      {
        name: 'VanCell',
        props: {
          border: false,
          title: '单元格',
          value: '内容'
        }
      },
      {
        name: 'template',
        slot: 'right',
        children: [
          {
            name: 'VanButton',
            props: { square: true, type: 'danger', text: '删除' }
          },
          {
            name: 'VanButton',
            props: { square: true, type: 'primary', text: '收藏' }
          }
        ]
      }
    ]
  }
};

export default SwipeCell;
