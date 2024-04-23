import type { MaterialDescription } from '@vtj/core';
import { size } from '../shared';

const desc: MaterialDescription = {
  name: 'XPanel',
  label: '面板',
  categoryId: 'layout',
  props: [
    {
      name: 'fit',
      label: 'fit',
      title: '宽高自适应',
      setters: 'BooleanSetter'
    },
    {
      name: 'width',
      label: 'width',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'height',
      label: 'height',
      setters: ['StringSetter', 'NumberSetter']
    },
    {
      name: 'border',
      label: 'border',
      title: '显示边框',
      setters: 'BooleanSetter'
    },
    {
      name: 'radius',
      label: 'radius',
      title: '圆角',
      setters: 'BooleanSetter'
    },
    {
      name: 'card',
      label: '卡片模式',
      setters: 'BooleanSetter'
    },
    Object.assign(size('size'), { setters: ['SelectSetter'] }),
    {
      name: 'shadow',
      label: '阴影设置',
      setters: 'SelectSetter',
      options: ['none', 'always', 'hover']
    },
    {
      name: 'header',
      label: '头部设置',
      setters: ['StringSetter', 'ObjectSetter']
    },
    {
      name: 'body',
      label: 'body',
      setters: 'ObjectSetter'
    },
    {
      name: 'footer',
      label: 'footer',
      setters: 'ObjectSetter'
    }
  ],
  snippet: {
    props: {
      header: '标题文本',
      fit: true
    }
  }
};

export default desc;
