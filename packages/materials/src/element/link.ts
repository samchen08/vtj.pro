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
      title: '控制下划线是否出现',
      defaultValue: true,
      options: ['always', 'hover', 'never'],
      setters: ['BooleanSetter', 'SelectSetter'],
    },
    {
      name: 'disabled',
      title: '是否禁用状态',
      defaultValue: false,
      setters: 'BooleanSetter'
    },
    {
      name: 'href',
      title: '原生 href 属性',
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
      title: '图标组件',
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
