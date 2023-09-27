import { ComponentDescription } from '@vtj/engine';
const component: ComponentDescription = {
  name: 'XAction',
  title: '动作',
  categoryId: 'base',
  package: '@vtj/ui',
  props: [
    {
      name: 'name',
      label: '名称',
      setters: 'InputSetter'
    },
    {
      name: 'label',
      label: '文本',
      setters: 'InputSetter'
    },
    {
      name: 'value',
      label: '动作值',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    {
      name: 'mode',
      label: '模式',
      setters: 'SelectSetter',
      options: ['button', 'text', 'icon'],
      defaultValue: 'button'
    },
    {
      name: 'disabled',
      label: '禁用',
      setters: 'BooleanSetter',
      defaultValue: false
    },
    {
      name: 'size',
      label: '尺寸',
      setters: 'SelectSetter',
      options: ['default', 'small', 'large'],
      defaultValue: 'default'
    },
    {
      name: 'type',
      label: '类型',
      setters: 'SelectSetter',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      defaultValue: 'primary'
    },
    {
      name: 'background',
      label: '背景',
      setters: 'SelectSetter',
      options: ['always', 'hover'],
      defaultValue: 'always',
      title: 'icon 背景设置，当 mode为 icon 时有效'
    },
    {
      name: 'circle',
      label: '圆形图标',
      setters: 'BooleanSetter',
      title: 'icon 背景样式圆形，当 mode为 icon 时有效'
    },
    {
      name: 'menus',
      label: '下拉菜单',
      setters: 'JSONSetter'
    },
    {
      name: 'tooltip',
      label: 'tooltip',
      setters: ['InputSetter', 'JSONSetter']
    },
    {
      name: 'badge',
      label: '徽章',
      setters: ['InputSetter', 'NumberSetter', 'JSONSetter']
    },
    {
      name: 'dropdown',
      label: 'Dropdown',
      setters: 'JSONSetter'
    },
    {
      name: 'button',
      label: '按钮组件',
      setters: 'JSONSetter',
      title: 'ElButton 组件配置，mode为button时有效'
    }
  ],
  events: [
    {
      name: 'click',
      params: ['props']
    },
    {
      name: 'command',
      params: ['item']
    }
  ],
  snippet: {
    props: {
      label: '操作'
    }
  }
};

export default component;
