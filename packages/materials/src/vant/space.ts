import type { MaterialDescription } from '@vtj/core';

const Space: MaterialDescription = {
  name: 'VanSpace',
  alias: 'Space',
  label: '间距',
  categoryId: 'base',
  doc: 'https://vant-ui.github.io/vant/#/zh-CN/space',
  props: [
    {
      name: 'direction',
      title: '间距方向',
      defaultValue: 'horizontal',
      setters: 'SelectSetter',
      options: ['vertical', 'horizontal']
    },
    {
      name: 'size',
      title:
        '间距大小，如 20px 2em，默认单位为 px，支持数组形式来分别设置横向和纵向间距',
      defaultValue: '8px',
      setters: ['NumberSetter', 'StringSetter', 'ArraySetter']
    },
    {
      name: 'align',
      title: '设置子元素的对齐方式',
      setters: 'SelectSetter',
      options: ['start', 'end', 'center', 'baseline']
    },
    {
      name: 'wrap',
      title: '是否自动换行，仅适用于水平方向排列',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'fill',
      title: '是否让 Space 变为一个块级元素，填充整个父元素',
      defaultValue: false,
      setters: 'BooleanSetter'
    }
  ],
  slots: ['default'],
  snippet: {
    props: {},
    children: [
      { name: 'VanButton', props: { type: 'primary' }, children: '按钮' },
      { name: 'VanButton', props: { type: 'primary' }, children: '按钮' },
      {
        name: 'VanButton',
        props: {
          type: 'primary',
          style: {
            padding: '30px'
          }
        },
        children: '按钮'
      }
    ]
  }
};

export default Space;
