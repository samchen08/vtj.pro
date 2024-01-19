import type { MaterialDescription } from '@vtj/core';
const Result: MaterialDescription = {
  name: 'ElResult',
  label: '结果',
  doc: 'https://element-plus.org/zh-CN/component/result.html',

  categoryId: 'data',
  package: 'element-plus',
  props: [
    {
      name: 'title',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'subTitle',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      defaultValue: 'info',
      options: ['success', 'warning', 'info', 'error'],
      setters: 'SelectSetter'
    }
  ],
  slots: ['icon', 'title', 'sub-title', 'extra'],
  snippet: {
    props: {
      icon: 'success',
      title: 'Success Tip',
      subTitle: 'Please follow the instructions'
    }
  }
};

export default Result;
