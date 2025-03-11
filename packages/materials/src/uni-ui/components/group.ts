import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniGroup',
  label: '分组',
  categoryId: 'ext',
  props: [
    {
      name: 'title',
      title: '主标题',
      defaultValue: '',
      setters: 'StringSetter'
    },
    {
      name: 'top',
      title: '分组间隔',
      defaultValue: '',
      setters: 'NumberSetter'
    },
    {
      name: 'mode',
      title: '模式 ，card 为卡片模式',
      defaultValue: '',
      setters: 'SelectSetter',
      options: ['card']
    }
  ],
  snippet: {
    props: {
      title: '基本模式'
    },
    children: [
      {
        name: 'View',
        children: ' 分组内容 '
      }
    ]
  }
};

export default desc;
