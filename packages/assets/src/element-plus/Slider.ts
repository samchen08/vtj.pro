import { ComponentDescription } from '@vtj/engine';
const Slider: ComponentDescription = {
  name: 'ElSlider',
  title: '滑块',

  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/slider.html',
  categoryId: 'form',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'min',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'max',
      defaultValue: 100,
      setters: 'NumberSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'step',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'showInput',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'showInputControls',
      defaultValue: true,
      label: '输入框按钮',
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: 'default',
      title: '滑块的大小',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'inputSize',
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
      label: '显示提示',
      setters: 'BooleanSetter'
    },
    {
      name: 'formatTooltip',
      defaultValue: '',
      title: '格式化提示信息',
      label: '格式化信息',
      setters: 'JSONSetter'
    },
    {
      name: 'range',
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
      name: 'label',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'rangeStartLabel',
      defaultValue: '',
      title: '当 range 为true时，屏幕阅读器标签开始的标记',
      label: '开始的标记',
      setters: 'InputSetter'
    },
    {
      name: 'rangeEndLabel',
      defaultValue: '',
      title: '当 range 为true时，屏幕阅读器标签结尾的标记',
      label: '结尾的标记',
      setters: 'InputSetter'
    },
    {
      name: 'formatValueText',
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
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'placement',
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
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'validateEvent',
      defaultValue: true,
      setters: 'BooleanSetter'
    }
  ],
  events: ['change', 'input', 'update:modelValue']
};

export default Slider;
