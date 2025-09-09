import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniNumberBox',
  label: '数字输入框',
  categoryId: 'ext',
  props: [
    {
      name: 'modelValue',
      title: '输入框当前值',
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
      name: 'step',
      title: '每次点击改变的间隔大小',
      defaultValue: 1,
      setters: 'NumberSetter'
    },
    {
      name: 'disabled',
      title: '是否为禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      title: '宽度（单位：px）',
      defaultValue: 40,
      setters: 'NumberSetter'
    },
    {
      name: 'background',
      title: '背景颜色',
      defaultValue: '#f5f5f5',
      setters: 'ColorSetter'
    },
    {
      name: 'color',
      title: '文字颜色',
      defaultValue: '#333333',
      setters: 'ColorSetter'
    }
  ],
  events: ['change', 'focus', 'blur', 'update:modelValue'],
  snippet: {}
};

export default desc;
