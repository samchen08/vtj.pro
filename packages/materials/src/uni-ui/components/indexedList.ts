import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniIndexedList',
  label: '索引列表',
  categoryId: 'ext',
  props: [
    {
      name: 'options',
      title: '索引列表需要的数据对象',
      setters: 'ObjectSetter'
    },
    {
      name: 'showSelect',
      title: '展示模式',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      options: [
        {
          letter: 'A',
          data: [
            '阿克苏机场',
            '阿拉山口机场',
            '阿勒泰机场',
            '阿里昆莎机场',
            '安庆天柱山机场',
            '澳门国际机场'
          ]
        },
        {
          letter: 'B',
          data: [
            '保山机场',
            '包头机场',
            '北海福成机场',
            '北京南苑机场',
            '北京首都国际机场'
          ]
        }
      ],
      showSelect: true
    }
  }
};

export default desc;
