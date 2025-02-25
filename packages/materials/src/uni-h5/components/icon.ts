import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'Icon',
  label: '图标',
  categoryId: 'basic',
  props: [
    {
      name: 'type',
      title: 'icon的类型',
      setters: 'SelectSetter',
      options: [
        'success',
        'success_no_circle',
        'info',
        'warn',
        'waiting',
        'cancel',
        'download',
        'search',
        'clear'
      ]
    },
    {
      name: 'size',
      title: 'icon的大小， 单位px',
      defaultValue: 23,
      setters: 'NumberSetter'
    },
    {
      name: 'color',
      title: 'icon的颜色，同css的color',
      setters: 'ColorSetter'
    }
  ],
  snippet: {
    props: {
      type: 'success',
      size: 26
    }
  }
};

export default desc;
