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
      title: '标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'subTitle',
      title: '副标题',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      title: '图标类型',
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
