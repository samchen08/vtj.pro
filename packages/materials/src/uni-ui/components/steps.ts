import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniSteps',
  label: '步骤条',
  categoryId: 'ext',
  props: [
    {
      name: 'active',
      title: '当前步骤',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'direction',
      title: '排列方向',
      defaultValue: 'row',
      setters: 'SelectSetter',
      options: ['row', 'column']
    },
    {
      name: 'active-color',
      title: '选中状态的颜色',
      defaultValue: '#1aad19',
      setters: 'ColorSetter'
    },
    {
      name: 'options',
      title: '数据源',
      setters: 'ArraySetter'
    }
  ],
  events: [],
  snippet: {
    props: {
      active: 1,
      options: [
        {
          title: '事件一'
        },
        {
          title: '事件二'
        },
        {
          title: '事件三'
        },
        {
          title: '事件四'
        }
      ]
    }
  }
};

export default desc;
