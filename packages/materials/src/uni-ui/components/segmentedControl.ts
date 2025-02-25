import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniSegmentedControl',
  label: '分段器',
  categoryId: 'ext',
  props: [
    {
      name: 'current',
      title: '当前选中的tab索引值，从0计数',
      defaultValue: 0,
      setters: 'NumberSetter'
    },
    {
      name: 'styleType',
      title: '分段器样式类型',
      defaultValue: 'button',
      setters: 'SelectSetter',
      options: ['button', 'text']
    },
    {
      name: 'activeColor',
      title: '选中的标签背景色与边框颜色',
      defaultValue: '#007aff',
      setters: 'ColorSetter'
    },
    {
      name: 'inActiveColor',
      title: '未激活时的颜色',
      defaultValue: 'transparent',
      setters: 'StringSetter'
    },
    {
      name: 'values',
      title: '选项数组',
      defaultValue: '',
      setters: 'ArraySetter'
    }
  ],
  events: ['clickItem'],
  snippet: {
    props: {
      values: ['选项卡1', '选项卡2', '选项卡3']
    }
  }
};

export default desc;
