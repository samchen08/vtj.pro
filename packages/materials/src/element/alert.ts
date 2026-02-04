import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElAlert',
  childIncludes: true,
  label: '提示',

  doc: 'https://element-plus.org/zh-CN/component/alert.html',
  categoryId: 'other',
  package: 'element-plus',
  props: [
    {
      name: 'title',
      label: '标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'type',
      label: '类型',
      defaultValue: 'info',
      setters: 'SelectSetter',
      options: ['success', 'warning', 'info', 'error']
    },
    {
      name: 'description',
      label: '描述',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'closable',
      label: '允许关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'center',
      label: '文字居中',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeText',
      label: '关闭按钮文本',
      title: '自定义关闭按钮文本',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'showIcon',
      label: '显示图标',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'effect',
      label: '主题',
      defaultValue: 'light',
      setters: 'SelectSetter',
      options: ['light', 'dark']
    }
  ],
  events: [
    {
      name: 'close'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'title'
    }
  ],
  snippet: {
    props: {
      title: 'success alert',
      type: 'success'
    }
  }
};

export default components;
