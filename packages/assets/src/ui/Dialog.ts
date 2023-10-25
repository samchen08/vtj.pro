import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XDialog',
  title: '弹窗',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'modelValue',
      label: '显示',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'title',
      label: '标题',
      setters: 'InputSetter'
    },
    {
      name: 'subtitle',
      label: '副标题',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    {
      name: 'size',
      label: '尺寸',
      setters: 'SelectSetter',
      options: ['default', 'small', 'large'],
      defaultValue: 'default'
    },
    {
      name: 'width',
      label: '宽度',
      setters: ['InputSetter', 'NumberSetter'],
      defaultValue: '70%'
    },
    {
      name: 'height',
      label: '高度',
      setters: ['InputSetter', 'NumberSetter'],
      defaultValue: '70%'
    },
    {
      name: 'modal',
      label: '蒙层',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'draggable',
      label: 'draggable',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'resizable',
      label: 'resizable',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'closable',
      label: '可关闭',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'maximizable',
      label: '可最大化',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'minimizable',
      label: '可最小化',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'primary',
      label: 'primary',
      setters: 'BooleanSetter'
    },
    {
      name: 'src',
      label: '页面URL',
      setters: 'InputSetter'
    },
    {
      name: 'submit',
      label: '提交按钮',
      setters: ['BooleanSetter', 'InputSetter']
    },
    {
      name: 'cancel',
      label: '取消按钮',
      setters: ['BooleanSetter', 'InputSetter']
    },
    {
      name: 'bodyPadding',
      label: 'bodyPadding',
      setters: 'BooleanSetter',
      defaultValue: true
    }
  ],
  events: [
    'update:modelValue',
    'open',
    'close',
    'destroy',
    'maximized',
    'minimized',
    'normal',
    'modeChange',
    'dragStart',
    'dragging',
    'dragEnd',
    'resizeStart',
    'resizeEnd',
    'resizing',
    'submit',
    'cancel'
  ],
  slots: ['default', 'actions', 'footer'],
  snippet: {
    props: {
      title: '弹窗标题'
    }
  }
};

export default component;
