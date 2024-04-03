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
      name: 'target',
      label: 'target',
      title: '同原生 target 属性',
      setters: 'SelectSetter',
      options: ['_blank', '_parent', '_self', '_top'],
      defaultValue: '_self'
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
