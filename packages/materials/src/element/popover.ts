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
      defaultValue: 'primary',
      setters: 'click',
      options: ['click', 'focus', 'hover', 'contextmenu']
    },
    {
      name: 'title',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      defaultValue: 'light',
      options: ['dark', 'light'],
      setters: 'SelectSetter'
    },
    {
      name: 'content',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'width',
      defaultValue: 150,
      setters: ['NumberSetter', 'InputSetter']
    },
    {
      name: 'placement',
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
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'visible',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'transition',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'showArrow',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperOptions',
      defaultValue: undefined,
      setters: 'JSONSetter'
    },
    {
      name: 'popperClass',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popperStyle',
      setters: ['InputSetter', 'ObjectSetter']
    },
    {
      name: 'showAfter',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'hideAfter',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'autoClose',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'tabindex',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'teleported',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'persistent',
      defaultValue: true,
      setters: 'BooleanSetter'
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
