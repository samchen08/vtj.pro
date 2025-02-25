import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniIcons',
  label: '图标',
  categoryId: 'ext',
  props: [
    {
      name: 'size',
      title: '图标大小',
      defaultValue: 24,
      setters: 'NumberSetter'
    },
    {
      name: 'type',
      title: '图标图案，参考示例',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'color',
      title: '图标颜色',
      defaultValue: '',
      setters: 'ColorSetter'
    },
    {
      name: 'customPrefix',
      title: '自定义图标',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'fontFamily',
      title: '自定义图标',
      defaultValue: '',
      setters: 'StringSetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      type: 'home'
    }
  }
};

export default desc;
