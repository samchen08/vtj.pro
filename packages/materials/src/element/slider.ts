import type { MaterialDescription } from '@vtj/core';
const Slider: MaterialDescription = {
  name: 'ElSlider',
  label: '滑块',

  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/slider.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '选中项绑定值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'min',
      title: '最小值',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      title: '最大值',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'step',
      title: '步长',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'showInput',
      title: '是否显示输入框，仅在非范围选择时有效',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showInputControls',
      title: '在显示输入框的情况下，是否显示输入框的控制按钮',
      defaultValue: true,
      // label: '输入框按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      title: 'slider 包装器的大小，垂直模式下该属性不可用',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'inputSize',
      title: '输入框的大小，如果设置了 size 属性，默认值自动取 size',
      defaultValue: 'default',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'showStops',
      defaultValue: false,
      title: '是否显示间断点',
      setters: 'BooleanSetter'
    },
    {
      name: 'showTooltip',
      defaultValue: true,
      title: '是否显示提示信息',
      setters: 'BooleanSetter'
    },
    {
      name: 'formatTooltip',
      defaultValue: '',
      title: '格式化提示信息',
      setters: 'FunctionSetter'
    },
    {
      name: 'range',
      title: '是否开启选择范围',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'vertical',
      defaultValue: false,
      title: '垂直模式',
      setters: 'BooleanSetter'
    },
    {
      name: 'height',
      defaultValue: '',
      title: '滑块高度，垂直模式必填',
      setters: 'InputSetter'
    },
    {
      name: 'aria-label',
      title: '原生 aria-label属性',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rangeStartLabel',
      defaultValue: '',
      title: '当 range 为true时，屏幕阅读器标签开始的标记',
      setters: 'InputSetter'
    },
    {
      name: 'rangeEndLabel',
      defaultValue: '',
      title: '当 range 为true时，屏幕阅读器标签结尾的标记',
      setters: 'InputSetter'
    },
    {
      name: 'formatValueText',
      title: '显示屏幕阅读器的 aria-valuenow 属性的格式',
      defaultValue: '',
      setters: 'FunctionSetter'
    },
    {
      name: 'debounce',
      defaultValue: 300,
      title: '输入时的去抖延迟，毫秒，仅在 show-input 等于 true 时有效',
      setters: 'NumberSetter'
    },
    {
      name: 'tooltipClass',
      title: 'tooltip 的自定义类名',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'placement',
      title: 'Tooltip 出现的位置',
      defaultValue: 'top',
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
      ],
      setters: 'SelectSetter'
    },
    {
      name: 'marks',
      title:
        '标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'validateEvent',
      title: '输入时是否触发表单的校验',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'input', 'update:modelValue']
};

export default Slider;
