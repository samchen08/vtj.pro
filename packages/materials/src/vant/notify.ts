import type { MaterialDescription } from '@vtj/core';

const Notify: MaterialDescription = {
  name: 'VanNotify',
  alias: 'Notify',
  label: '消息提示',
  categoryId: 'feedback',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/notify',
  props: [
    {
      name: 'show',
      title: '是否显示通知',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'type',
      title: '类型',
      defaultValue: 'danger',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger']
    },
    {
      name: 'message',
      title: '展示文案，支持通过\n换行',
      setters: 'StringSetter'
    },
    {
      name: 'z-index',
      title: '将组件的 z-index 层级设置为一个固定值',
      defaultValue: '2000+',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'position',
      title: '弹出位置',
      defaultValue: 'top',
      setters: 'SelectSetter',
      options: ['top', 'bottom']
    },
    {
      name: 'color',
      title: '字体颜色',
      defaultValue: '#ffffff',
      setters: 'StringSetter'
    },
    {
      name: 'background',
      title: '背景颜色',
      setters: 'StringSetter'
    },
    {
      name: 'class-name',
      title: '自定义类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'lock-scroll',
      title: '是否锁定背景滚动',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '指定挂载的节点，等同于 Teleport 组件的 to 属性',
      setters: ['StringSetter', 'ExpressionSetter']
    }
  ],
  events: [
    { name: 'click', params: ['event'] },
    { name: 'close' },
    { name: 'opened' }
  ],
  slots: ['default'],
  snippet: {
    props: {
      show: true,
      type: 'success'
    },
    children: [
      {
        name: 'VanIcon',
        props: {
          name: 'bell',
          style: { marginRight: '4px' }
        }
      },
      {
        name: 'span',
        children: '通知内容'
      }
    ]
  }
};

export default Notify;
