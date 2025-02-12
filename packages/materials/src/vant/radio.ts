import type { MaterialDescription } from '@vtj/core';

const Radio: MaterialDescription[] = [
  {
    name: 'VanRadio',
    alias: 'Radio',
    label: '单选框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/radio',
    props: [
      {
        name: 'name',
        title: '标识符，通常为一个唯一的字符串或数字',
        setters: 'ExpressionSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square dot',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['square', 'dot', 'round']
      },
      {
        name: 'disabled',
        title: '是否为禁用状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-disabled',
        title: '是否禁用文本内容点击',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-position',
        title: '文本位置，可选值为 left',
        defaultValue: 'right',
        setters: 'SelectSetter',
        options: ['left', 'right']
      },
      {
        name: 'icon-size',
        title: '图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      }
    ],
    events: [{ name: 'click', params: ['event'] }],
    slots: [{ name: 'default' }, { name: 'icon' }],
    snippet: {
      props: {
        modelValue: 'checked',
        name: 'checked'
      },
      children: '单选框 1'
    }
  },
  {
    name: 'VanRadioGroup',
    alias: 'RadioGroup',
    label: '单选框组',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/radio',
    props: [
      {
        name: 'modelValue',
        title: '当前选中项的标识符',
        setters: 'ExpressionSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用所有单选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'direction',
        title: '排列方向',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'icon-size  ',
        title: '所有单选框的图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '所有单选框的选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'shape',
        title: '形状',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['square', 'dot']
      }
    ],
    events: [
      { name: 'update:modelValue' },
      { name: 'change', params: ['name'] }
    ],
    snippet: {
      props: {
        modelValue: ['1', '2']
      },
      children: [
        { name: 'VanRadio', props: { name: '1' }, children: '单选框 1' },
        { name: 'VanRadio', props: { name: '2' }, children: '单选框 2' }
      ]
    }
  }
];

export default Radio;
