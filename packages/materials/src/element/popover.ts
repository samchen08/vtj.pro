import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElPopover',
  label: '气泡卡片',

  categoryId: 'other',
  doc: 'https://element-plus.org/zh-CN/component/popover.html',
  package: 'element-plus',
  props: [
    {
      name: 'trigger',
      title: '触发方式，在受控模式下无效',
      defaultValue: 'primary',
      setters: 'SelectSetter',
      options: ['click', 'focus', 'hover', 'contextmenu']
    },
    {
      name: 'triggerKeys',
      title: '当通过鼠标点击使触发元素获得焦点时，可以定义一组键盘按键代码，通过键盘控制气泡框的显示，在受控模式下无效',
      defaultValue: ['Enter','Space'],
      setters: 'ArraySetter',
    },
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
      name: 'content',
      title: '显示的内容',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'width',
      title: '宽度',
      defaultValue: 150,
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'placement',
      title: '出现位置',
      defaultValue: 'bottom',
      setters: 'SelectSetter',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end'
      ]
    },
    {
      name: 'disabled',
      title: 'Popover 是否可用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'visible',
      title: 'Popover 是否显示',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      title: '浮层偏移量',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'transition',
      title: '定义渐变动画',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'showArrow',
      title: '是否显示 Tooltip 箭头',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperOptions',
      title: 'popper.js 的参数',
      defaultValue: undefined,
      setters: 'JSONSetter'
    },
    {
      name: 'popperClass',
      title: '为 popper 添加类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popperStyle',
      title: '为 popper 自定义样式',
      setters: ['InputSetter', 'ObjectSetter']
    },
    {
      name: 'showAfter',
      title: '延迟显示时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'hideAfter',
      title: '消失延迟时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'autoClose',
      title: '隐藏提示框的超时时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'tabindex',
      title: 'Popover 组件的 tabindex',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'teleported',
      title: '是否将 popover 的下拉列表插入至 body 元素',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'appendTo',
      title: '指示 Tooltip 的内容将附加在哪一个网页元素上',
      setters: 'StringSetter'
    },
    {
      name: 'persistent',
      title: '当 popover 组件长时间不触发且 persistent 属性设置为 false 时, popover 将会被删除',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'virtualTriggering',
      title: '是否启用虚拟触发器',
      setters: 'BooleanSetter'
    },
    {
      name: 'virtualRef',
      title: '代表 tooltip 所要附加的参照元素',
      setters: 'ExpressionSetter'
    }
  ],
  events: [
    {
      name: 'show'
    },
    {
      name: 'before-enter'
    },
    {
      name: 'after-enter'
    },
    {
      name: 'hide'
    },
    {
      name: 'before-leave'
    },
    {
      name: 'after-leave'
    },
    {
      name: 'update:visible'
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'reference'
    }
  ],
  snippet: {
    name: 'ElPopover',
    props: {
      placement: 'bottom',
      title: 'Title',
      width: '200',
      trigger: 'hover',
      content: '这是content123！'
    },
    children: [
      {
        name: 'ElButton',
        children: '气泡卡片',
        slot: 'reference'
      }
    ]
  }
};

export default components;
