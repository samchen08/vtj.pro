import type { MaterialDescription } from '@vtj/core';
import { type } from '../shared';

const link: MaterialDescription = {
  name: 'ElLink',
  label: '链接',
  categoryId: 'base',
  doc: 'https://element-plus.org/zh-CN/component/link.html',
  props: [
    type('type'),
    {
      name: 'underline',
      defaultValue: true,
      setters: 'BooleanSetter'
    },
    {
      name: 'disabled',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'href',
      defaultValue: '',
      setters: 'InputSetter'
    },
    {
      name: 'icon',
      defaultValue: '',
      setters: 'IconSetter'
    }
  ],
  events: [],
  slots: [
    {
      name: 'default'
    },
    {
      name: 'icon'
    }
  ],
  snippet: {
    children: '链接文本'
  }
};

export default link;
