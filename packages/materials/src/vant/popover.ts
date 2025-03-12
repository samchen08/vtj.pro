import type { MaterialDescription } from '@vtj/core';

const Popover: MaterialDescription = {
  name: 'VanPopover',
  alias: 'Popover',
  label: '气泡弹出框',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/popover',
  props: [
    {
      name: 'show',
      title: '是否展示气泡弹出层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'actions',
      title: '选项列表',
      defaultValue: [],
      setters: 'ArraySetter'
    },
    {
      name: 'actions-direction',
      title: '选项列表的排列方向，可选值为 horizontal',
      defaultValue: 'vertical',
      setters: 'SelectSetter',
      options: ['vertical', 'horizontal']
    },
    {
      name: 'placement',
      title: '弹出位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end'
      ]
    },
    {
      name: 'theme',
      title: '主题风格',
      defaultValue: 'light',
      setters: 'SelectSetter',
      options: ['light', 'dark']
    },
    {
      name: 'trigger',
      title: '触发方式',
      defaultValue: 'click',
      setters: 'SelectSetter',
      options: ['click', 'manual']
    },
    {
      name: 'duration',
      title: '动画时长，单位秒，设置为 0 可以禁用动画',
      defaultValue: 0.3,
      setters: ['NumberSetter', 'StringSetter']
    },
    {
      name: 'offset',
      title: '出现位置的偏移量',
      defaultValue: [0, 8],
      setters: 'ArraySetter'
    },
    {
      name: 'overlay',
      title: '是否显示遮罩层',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'overlay-class',
      title: '自定义遮罩层类名',
      setters: ['StringSetter', 'ArraySetter', 'ObjectSetter']
    },
    {
      name: 'overlay-style',
      title: '自定义遮罩层样式',
      setters: 'ObjectSetter'
    },
    {
      name: 'show-arrow',
      title: '是否展示小箭头',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-action',
      title: '	是否在点击选项后关闭',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-outside',
      title: '是否在点击外部元素后关闭菜单',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'close-on-click-overlay',
      title: '是否在点击遮罩层后关闭菜单',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleport',
      title: '	指定挂载的节点，等同于 Teleport 组件的 to 属性',
      defaultValue: 'body',
      setters: ['StringSetter', 'ExpressionSetter']
    },
    {
      name: 'icon-prefix',
      title: '图标类名前缀，等同于 Icon 组件的 class-prefix 属性',
      defaultValue: 'vant-icon',
      setters: 'StringSetter'
    }
  ],
  events: [
    { name: 'update:show' },
    { name: 'select', params: ['action', 'index'] },
    { name: 'open' },
    { name: 'close' },
    { name: 'opened' },
    { name: 'closed' },
    { name: 'clickOverlay', params: ['event'] }
  ],
  slots: ['default', 'reference', 'action'],
  snippet: {
    props: {
      show: true,
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }]
    },
    events: {
      select: {
        name: 'select',
        handler: {
          type: 'JSFunction',
          value:
            '(action) => {\r\n    this.$libs.vant.showToast(action.text)\r\n}'
        },
        modifiers: {}
      }
    },
    children: [
      {
        name: 'VanButton',
        slot: 'reference',
        props: { type: 'primary' },
        children: '浅色风格'
      }
    ]
  }
};

export default Popover;
