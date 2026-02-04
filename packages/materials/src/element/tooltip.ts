import type { MaterialDescription } from '@vtj/core';
import { effect } from '../shared';
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
      title: '指示 Tooltip 的内容将附加在哪一个网页元素上',
      defaultValue: '',
      setters: 'InputSetter'
    },
    effect('effect'),
    {
      name: 'content',
      title: '显示的内容',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rawContent',
      title: 'content 中的内容是否作为 HTML 字符串处理',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'placement',
      title: 'Tooltip 组件出现的位置',
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
      name: 'fallback-placements',
      title: 'Tooltip 可用的 positions',
      setters: 'ArraySetter'
    },
    {
      name: 'visible',
      title: 'Tooltip 组件可见性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: 'Tooltip 组件是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'offset',
      title: '出现位置的偏移量',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'transition',
      title: '动画名称',
      defaultValue: 'el-fade-in-linear',
      setters: 'InputSetter'
    },
    {
      name: 'popperOptions',
      title: 'popper.js 参数',
      defaultValue: { boundariesElement: 'body', gpuAcceleration: false },
      setters: 'JSONSetter'
    },
    {
      name: 'arrowOffset',
      title: '控制Tooltip的箭头相对于弹出窗口的偏移(添加)',
      defaultValue: 5,
      setters: 'NumberSetter'
    },
    {
      name: 'showAfter',
      title: '延迟显示时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'show-arrow',
      title: 'tooltip 的内容是否有箭头',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hide-after',
      title: '消失延迟时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 200,
      setters: 'NumberSetter'
    },
    {
      name: 'auto-close',
      title: '隐藏提示框的超时时间（以毫秒为单位），在受控模式下无效',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'popper-class',
      title: '为 Tooltip 的 popper 添加类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'popper-style',
      title: '为 Tooltip 的 popper 添加自定义样式',
      defaultValue: '',
      setters: ['StringSetter', 'ObjectSetter']
    },
    {
      name: 'enterable',
      title: '鼠标是否可进入到 tooltip 中',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'teleported',
      label: 'teleported',
      title: '是否使用 teleport。设置成 true则会被追加到 append-to 的位置',
      setters: 'BooleanSetter',
      defaultValue: true
    },
    {
      name: 'trigger',
      label: 'trigger',
      title: '提示框的触发方式（用于显示），在受控模式下无效',
      setters: 'SelectSetter',
      options: ['hover', 'click', 'focus', 'contextmenu'],
      defaultValue: 'hover'
    },
    {
      name: 'virtual-triggering',
      title: '用来标识虚拟触发是否被启用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'virtual-ref',
      title: '标识虚拟触发时的触发元素',
      defaultValue: '',
      setters: 'ExpressionSetter'
    },
    {
      name: 'trigger-keys',
      title: '当通过鼠标点击使触发元素获得焦点时，可以定义一组键盘按键代码，通过键盘控制提示框的显示，在受控模式下无效',
      defaultValue: ['Enter', 'Space'],
      setters: 'ExpressionSetter'
    },
    {
      name: 'persistent',
      title: '当tooltip未激活且 persistent 为 false 时，tooltip将被销毁',
      setters: 'BooleanSetter'
    },
    {
      name: 'ariaLabel',
      label: 'ariaLabel',
      title: '和 aria-label 属性保持一致',
      setters: 'StringSetter'
    },
    {
      name: 'focus-on-target',
      title: '当通过悬停触发提示时，是否聚焦触发元素，以提升可访问性',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
  ],
  events: [
    {
      name: 'before-show'
    },
    {
      name: 'show'
    },
    {
      name: 'before-hide'
    },
    {
      name: 'hide'
    },
    {
      name: 'update:visible '
    }
  ],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'content'
    }
  ],
  snippet: {
    name: 'ElTooltip',
    children: '文字提示',
    props: {
      content: '自定义弹出框的内容'
    }
  }
};

export default components;
