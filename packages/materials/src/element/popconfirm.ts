import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElPopconfirm',
  label: '气泡确认框',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/popconfirm.html',
  package: 'element-plus',
  props: [
    {
      name: 'title',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'confirmButtonText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'cancelButtonText',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'confirmButtonType',
      defaultValue: 'primary',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
    },
    {
      name: 'confirmButtonType',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
    },
    {
      name: 'icon',
      defaultValue: '',
      setters: ['InputSetter']
    },
    {
      name: 'iconColor',
      defaultValue: '#f90',
      setters: 'ColorSetter'
    },
    {
      name: 'hideIcon',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'persistent',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      defaultValue: '150',
      setters: ['NumberSetter', 'InputSetter']
    }
  ],
  events: [
    {
      name: 'confirm'
    },
    {
      name: 'cancel'
    }
  ],
  slots: [
    {
      name: 'reference'
    }
  ],
  snippet: {
    name: 'ElPopconfirm',
    children: [
      {
        name: 'ElButton',
        children: '气泡确认框',
        slot: 'reference'
      }
    ],
    props: {
      title: '标题内容'
    }
  }
};

export default components;
