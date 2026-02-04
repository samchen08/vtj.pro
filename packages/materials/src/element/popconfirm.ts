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
      title: '标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      title: 'Tooltip 主题',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'confirmButtonText',
      title: '确认按钮文字',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'cancelButtonText',
      title: '取消按钮文字',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'confirmButtonType',
      title: '确认按钮类型',
      defaultValue: 'primary',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
    },
    {
      name: 'confirmButtonType',
      title: '取消按钮类型',
      defaultValue: 'text',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'text']
    },
    {
      name: 'icon',
      title: '自定义图标',
      defaultValue: 'QuestionFilled',
      setters: ['InputSetter']
    },
    {
      name: 'iconColor',
      title: 'Icon 颜色',
      defaultValue: '#f90',
      setters: 'ColorSetter'
    },
    {
      name: 'hideIcon',
      title: '是否隐藏 Icon',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hideAfter',
      title: '关闭时的延迟',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'teleported',
      title: '是否将 popover 的下拉列表插入至 body 元素',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'persistent',
      title: '当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      title: '弹层宽度，最小宽度 150px',
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
    },
    {
      name: 'actions'
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
