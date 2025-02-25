import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniNavBar',
  label: '导航栏',
  categoryId: 'ext',
  props: [
    {
      name: 'title',
      title: '标题文字',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'leftText',
      title: '左侧按钮文本',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'rightText',
      title: '右侧按钮文本',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'leftIcon',
      title: '左侧按钮图标',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'rightIcon',
      title: '右侧按钮图标',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '图标和文字颜色',
      defaultValue: '#000000',
      setters: 'ColorSetter'
    },
    {
      name: 'backgroundColor',
      title: '导航栏背景颜色',
      defaultValue: '#ffffff',
      setters: 'ColorSetter'
    },
    {
      name: 'fixed',
      title: '是否固定顶部',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'statusBar',
      title: '是否包含状态栏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'shadow',
      title: '导航栏下是否有阴影',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'border',
      title: '导航栏下是否有边框',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'height',
      title: '导航栏高度',
      defaultValue: 44,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'dark',
      title: '导航栏开启暗黑模式',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'leftWidth',
      title: '导航栏左侧插槽宽度',
      defaultValue: 120,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'rightWidth',
      title: '导航栏右侧插槽宽度',
      defaultValue: 120,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'stat',
      title: '是否开启统计标题功能',
      defaultValue: '60px',
      setters: ['BooleanSetter', 'StringSetter']
    }
  ],
  events: ['clickLeft', 'clickRight'],
  slots: ['default', 'left', 'right'],
  snippet: {
    props: {
      dark: true,
      fixed: true,
      shadow: true,
      backgroundColor: '#007AFF',
      statusBar: true,
      leftIcon: 'left',
      leftText: '返回',
      title: '自定义导航栏'
    }
  }
};

export default desc;
