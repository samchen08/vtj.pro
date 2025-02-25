import type { MaterialDescription } from '@vtj/core';

const desc: MaterialDescription = {
  name: 'UniFav',
  label: '收藏按钮',
  categoryId: 'ext',
  props: [
    {
      name: 'star',
      title: '按钮是否带星星',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'bgColor',
      title: '未收藏时的背景色',
      defaultValue: '#eeeeee',
      setters: 'ColorSetter'
    },
    {
      name: 'bgColorChecked',
      title: '已收藏时的背景色',
      defaultValue: '#007aff',
      setters: 'ColorSetter'
    },
    {
      name: 'fgColor',
      title: '未收藏时的文字颜色',
      defaultValue: '#666666',
      setters: 'ColorSetter'
    },
    {
      name: 'fgColorChecked',
      title: '已收藏时的文字颜色',
      defaultValue: '#FFFFFF',
      setters: 'ColorSetter'
    },
    {
      name: 'circle',
      title: '是否为圆角',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'checked',
      title: '是否为已收藏',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'contentText',
      title: '收藏按钮文字',
      defaultValue: { contentDefault: '收藏', contentFav: '已收藏' },
      setters: 'ObjectSetter'
    }
  ],
  events: ['click'],
  snippet: {
    props: {
      checked: false
    }
  }
};

export default desc;
