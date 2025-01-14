import type { MaterialDescription } from '@vtj/core';

const Checkbox: MaterialDescription[] = [
  {
    name: 'VanCheckbox',
    alias: 'Checkbox',
    label: '复选框',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/checkbox',
    props: [
      {
        name: 'modelValue',
        title: '是否为选中状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'name',
        title: '标识符，通常为一个唯一的字符串或数字',
        setters: 'ExpressionSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      },
      {
        name: 'disabled',
        title: '是否禁用复选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'label-disabled',
        title: '是否禁用复选框文本点击',
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
      },
      {
        name: 'bind-group',
        title: '是否与复选框组绑定',
        defaultValue: true,
        setters: 'BooleanSetter'
      },
      {
        name: 'indeterminate',
        title: '是否为不确定状态',
        defaultValue: false,
        setters: 'BooleanSetter'
      }
    ],
    events: ['change', 'click'],
    slots: ['default', 'icon'],
    snippet: {
      children: '复选框'
    }
  },
  {
    name: 'VanCheckboxGroup',
    alias: 'CheckboxGroup',
    label: '复选框组',
    categoryId: 'form',
    doc: 'https://vant-ui.github.io/vant/#/zh-CN/checkbox',
    props: [
      {
        name: 'modelValue',
        title: '所有选中项的标识符',
        setters: 'ArraySetter'
      },
      {
        name: 'disabled',
        title: '是否禁用所有复选框',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'max',
        title: '最大可选数，0 为无限制',
        defaultValue: 0,
        setters: ['NumberSetter', 'StringSetter']
      },
      {
        name: 'direction',
        title: '排列方向，可选值为 horizontal',
        defaultValue: 'vertical',
        setters: 'SelectSetter',
        options: ['vertical', 'horizontal']
      },
      {
        name: 'icon-size',
        title: '所有复选框的图标大小，默认单位为 px',
        defaultValue: '20px',
        setters: ['StringSetter', 'NumberSetter']
      },
      {
        name: 'checked-color',
        title: '所有复选框的选中状态颜色',
        defaultValue: '#1989fa',
        setters: 'StringSetter'
      },
      {
        name: 'shape',
        title: '形状，可选值为 square',
        defaultValue: 'round',
        setters: 'SelectSetter',
        options: ['round', 'square']
      }
    ],
    events: ['change'],
    slots: ['default', 'toggleAll'],
    snippet: {
      props: {
        modelValue: ['a', 'b']
      },
      children: [
        {
          name: 'VanCheckbox',
          props: {
            name: 'a'
          },
          children: '复选框 a'
        },
        {
          name: 'VanCheckbox',
          props: {
            name: 'b'
          },
          children: '复选框 b'
        }
      ]
    }
  }
];

export default Checkbox;
