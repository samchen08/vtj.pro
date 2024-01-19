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
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'type',
      defaultValue: 'info',
      setters: 'SelectSetter',
      options: ['success', 'warning', 'info', 'error']
    },
    {
      name: 'description',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'closable',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'center',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'closeText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'showIcon',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'effect',
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
