import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription[] = [
  {
    name: 'CheckboxGroup',
    label: '多选框组',
    categoryId: 'form',
    events: ['change'],
    snippet: {
      children: [
        { name: 'Checkbox', props: { checked: true }, children: '选中' },
        { name: 'Checkbox', props: { checked: false }, children: '未选中' }
      ]
    }
  },
  {
    name: 'Checkbox',
    label: '多选项',
    categoryId: 'form',
    props: [
      {
        name: 'value',
        title:
          '<checkbox> 标识，选中时触发 <checkbox-group> 的 change 事件，并携带 <checkbox> 的 value。',
        setters: 'StringSetter'
      },
      {
        name: 'disabled',
        title: '是否禁用',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'checked',
        title: '当前是否选中，可用来设置默认选中',
        defaultValue: false,
        setters: 'BooleanSetter'
      },
      {
        name: 'color',
        title: 'checkbox的颜色，同css的color',
        setters: 'ColorSetter'
      },
      {
        name: 'backgroundColor',
        title: 'checkbox默认的背景颜色',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'borderColor',
        title: 'checkbox默认的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBackgroundColor',
        title: 'checkbox选中时的背景颜色，优先级大于color属性',
        defaultValue: '#ffffff',
        setters: 'ColorSetter'
      },
      {
        name: 'activeBorderColor',
        title: 'checkbox选中时的边框颜色',
        defaultValue: '#d1d1d1',
        setters: 'ColorSetter'
      },
      {
        name: 'iconColor',
        title: 'checkbox的图标颜色',
        defaultValue: '#007aff',
        setters: 'ColorSetter'
      }
    ],
    snippet: {
      children: '选项'
    }
  }
];

export default desc;
