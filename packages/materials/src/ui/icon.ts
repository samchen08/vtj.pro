import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

const icon: MaterialDescription = {
  name: 'XIcon',
  label: '图标',
  categoryId: 'base',
  props: [
    {
      name: 'icon',
      label: '图标',
      setters: 'IconSetter'
    },
    Object.assign(size('size'), { setters: ['SelectSetter', 'NumberSetter'] }),
    {
      name: 'color',
      label: '颜色',
      setters: 'ColorSetter'
    },
    {
      name: 'background',
      label: '背景色',
      setters: 'ColorSetter'
    },
    {
      name: 'src',
      label: '图片Url',
      setters: 'InputSetter'
    },
    {
      name: 'radius',
      label: '圆角值',
      setters: 'NumberSetter'
    },
    {
      name: 'padding',
      label: '内边距',
      setters: 'NumberSetter'
    },
    {
      name: 'hoverEffect',
      label: '悬停效果',
      setters: 'BooleanSetter'
    }
  ],
  snippet: {
    props: {
      icon: 'Star'
    }
  }
};

export default icon;
