import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Switch',
  label: '开关选择器',
  categoryId: 'form',
  props: [
    {
      name: 'checked',
      title: '是否选中',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      title: '是否禁用',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'type',
      title: '样式',
      defaultValue: 'switch',
      setters: 'SelectSetter',
      options: ['switch', 'checkbox']
    },
    {
      name: 'color',
      title: 'switch 的颜色',
      setters: 'ColorSetter'
    }
  ],
  events: ['change']
};

export default desc;
