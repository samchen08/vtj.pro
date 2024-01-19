import type { MaterialDescription } from '@vtj/core';
const components: MaterialDescription = {
  name: 'ElTooltip',
  childIncludes: true,
  label: '文字提示',

  doc: 'https://element-plus.org/zh-CN/component/tooltip.html',
  categoryId: 'other',
  // icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
  package: 'element-plus',
  props: [
    {
      name: 'appendTo',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'effect',
      defaultValue: 'dark',
      setters: 'InputSetter'
    },
    {
      name: 'content',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rawContent',
      defaultValue: false,
      setters: 'BooleanSetter'
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
      name: 'visible',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
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
      defaultValue: 'el-fade-in-linear',
      setters: 'InputSetter'
    },
    {
      name: 'visibleArrow',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'popperOptions',
      defaultValue: { boundariesElement: 'body', gpuAcceleration: false },
      setters: 'JSONSetter'
    },
    {
      name: 'showAfter',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'show-arrow',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hide-after',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'auto-close',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'manual',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'popper-class',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'enterable',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'tabindex',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'teleported',
      defaultValue: '',
      setters: 'BooleanSetter'
    },
    {
      name: 'trigger',
      defaultValue: 'hover',
      options: ['hover', 'click', 'focus', 'contextmenu'],
      setters: 'SelectSetter'
    },
    {
      name: 'virtual-triggering',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'virtual-ref',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'trigger-keys',
      defaultValue: ['Enter', 'Space'],
      setters: 'ExpressionSetter'
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
    name: 'ElTooltip',
    children: '文字提示',
    props: {
      title: '自定义弹出框的内容'
    }
  }
};

export default components;
