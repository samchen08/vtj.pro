import type { MaterialDescription } from '@vtj/core';
const ColorPicker: MaterialDescription = {
  name: 'ElColorPicker',
  label: '取色器',

  categoryId: 'form',
  childIncludes: false,
  doc: 'https://element-plus.org/zh-CN/component/color-picker.html',
  package: 'element-plus',
  props: [
    {
      name: 'modelValue',
      title: '选中项绑定值',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'size',
      defaultValue: '',
      options: ['large', 'default', 'small'],
      setters: 'SelectSetter'
    },
    {
      name: 'showAlpha',
      title: '是否支持透明度选择',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'colorFormat',
      title: '写入 v-model 的颜色的格式',
      defaultValue: '',
      options: ['hsl', 'hsv', 'hex', 'rgb'],
      setters: 'SelectSetter'
    },
    {
      name: 'popperClass',
      title: 'ColorPicker 下拉框的类名',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'predefine',
      title: '预定义颜色',
      defaultValue: '',
      setters: 'JSONSetter'
    },
    {
      name: 'validateEvent',
      title: '输入时是否触发表单的校验',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'tabindex',
      label: 'tabindex',
      title: 'ColorPicker 的 tabindex',
      setters: ['StringSetter', 'NumberSetter'],
      defaultValue: 0
    },
    {
      name: 'aria-label',
      title: 'ColorPicker 的 aria-label',
      setters: 'StringSetter'
    },
    {
      name: 'id',
      title: 'ColorPicker 的 id',
      setters: 'StringSetter'
    },
    {
      name: 'teleported',
      title: '是否将 popover 的下拉列表渲染至 body 下',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'label',
      title: 'ColorPicker 的 aria-label(deprecated)',
      setters: 'StringSetter'
    }
  ],
  events: [
    {
      name: 'change'
    },
    {
      name: 'active-change'
    },
    {
      name: 'update:modelValue'
    },
    {
      name: 'focus'
    },
    {
      name: 'blur'
    }
  ]
};

export default ColorPicker;
