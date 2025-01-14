import type { MaterialDescription } from '@vtj/core';

const Divider: MaterialDescription = {
  name: 'VanDivider',
  alias: 'Divider',
  label: '分割线',
  categoryId: 'view',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/divider',
  props: [
    {
      name: 'dashed',
      title: '是否使用虚线',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'hairline',
      title: '是否使用 0.5px 线',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'content-position',
      title: '内容位置',
      defaultValue: 'center',
      setters: 'SelectSetter',
      options: ['left', 'center', 'right']
    },
    {
      name: 'vertical',
      title: '是否使用垂直',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  slots: ['default'],
  snippet: {
    children: '文本'
  }
};

export default Divider;
