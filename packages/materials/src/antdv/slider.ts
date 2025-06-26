import type { MaterialDescription } from '@vtj/core';

const components: MaterialDescription[] = [
  {
    name: 'ASlider',
    alias: 'Slider',
    label: '滑动输入条',
    categoryId: 'input',
    doc: 'https://www.antdv.com/components/slider-cn',
    props: [
      {
        name: 'autofocus',
        label: 'autofocus',
        title: '自动获取焦点',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'disabled',
        label: 'disabled',
        title: '值为 true 时，滑块为禁用状态',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'dots',
        label: 'dots',
        title: '是否只能拖拽到刻度上',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'included',
        label: 'included',
        title:
          'marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列',
        setters: 'BooleanSetter',
        defaultValue: true
      },
      {
        name: 'marks',
        label: 'marks',
        title:
          '刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式',
        setters: 'ObjectSetter' //?? object
        // defaultValue: '' //?? 	{ number: string|VNode } or { number: { style: object, label: string|VNode } } or { number: () => VNode }
      },
      {
        name: 'max',
        label: 'max',
        title: '最大值',
        setters: 'NumberSetter',
        defaultValue: 100
      },
      {
        name: 'min',
        label: 'min',
        title: '最小值',
        setters: 'NumberSetter',
        defaultValue: 0
      },
      {
        name: 'range',
        label: 'range',
        title: '双滑块模式',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'reverse',
        label: 'reverse',
        title: '反向坐标轴',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'step',
        label: 'step',
        title:
          '步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分',
        setters: ['NumberSetter', 'ObjectSetter'], //??	number|null
        defaultValue: 1
      },
      {
        name: 'value',
        label: 'value',
        title:
          '设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number]',
        setters: ['NumberSetter', 'ArraySetter']
      },
      {
        name: 'vertical',
        label: 'vertical',
        title: '值为 true 时，Slider 为垂直方向',
        setters: 'BooleanSetter',
        defaultValue: false
      },
      {
        name: 'tipFormatter',
        label: 'tipFormatter',
        title:
          'Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip',
        setters: 'FunctionSetter' //??  Function|null
        // defaultValue: '' //?? IDENTITY
      },
      {
        name: 'tooltipPlacement',
        label: 'tooltipPlacement',
        title: '设置 Tooltip 展示位置',
        setters: 'StringSetter'
      },
      {
        name: 'tooltipOpen',
        label: 'tooltipOpen',
        title:
          '值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时',
        setters: 'BooleanSetter'
      },
      {
        name: 'getTooltipPopupContainer',
        label: 'getTooltipPopupContainer',
        title: 'Tooltip 渲染父节点，默认渲染到 body 上',
        setters: 'FunctionSetter',
        defaultValue: {
          type: 'Function',
          value: '() => document.body	'
        }
      }
    ],
    events: ['change', 'afterChange', 'update:value'],
    slots: ['default', 'mark']
  }
];
export default components;
